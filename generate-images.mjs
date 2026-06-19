import fs from "fs";
import path from "path";
import https from "https";

const TOKEN = process.env.REPLICATE_API_TOKEN;
if (!TOKEN) {
  console.error("❌ REPLICATE_API_TOKEN manquant. Exécute : $env:REPLICATE_API_TOKEN='r8_...' puis relance.");
  process.exit(1);
}

const OUT_DIR = path.join(process.cwd(), "public", "images");
fs.mkdirSync(OUT_DIR, { recursive: true });

const IMAGES = [
  {
    file: "hero.webp",
    ratio: "16:9",
    prompt: "Elegant Japanese cheesecake dessert shop interior, wide angle, warm golden hour lighting, minimalist cream and gold decor, glass display case with fluffy cheesecakes, soft bokeh background, no faces, no people, photorealistic, 35mm film grain, natural imperfections, 4K, no text, no watermark, no CGI",
  },
  {
    file: "service-1.webp",
    ratio: "4:3",
    prompt: "Single slice of Japanese soufflé cheesecake on white ceramic plate, golden fluffy texture, powdered sugar dusting, dark chocolate drizzle and pistachios on top, warm studio lighting, close-up food photography, no faces, photorealistic, 35mm film grain, natural imperfections, 4K, no text, no watermark",
  },
  {
    file: "service-2.webp",
    ratio: "4:3",
    prompt: "Whole round Japanese soufflé cheesecake on wooden board, golden domed top, light and airy texture visible, elegant cream-colored dessert, warm soft lighting, bakery setting, aerial perspective slightly angled, no faces, photorealistic, 35mm film grain, natural imperfections, 4K, no text, no watermark",
  },
  {
    file: "service-3.webp",
    ratio: "4:3",
    prompt: "Premium white takeout box with Japanese cheesecake inside, elegant kraft paper packaging, gold ribbon, minimalist branding, marble countertop, warm natural light from window, no faces, photorealistic, 35mm film grain, natural imperfections, 4K, no text, no watermark",
  },
  {
    file: "editorial.webp",
    ratio: "3:2",
    prompt: "Hands seen from above carefully placing a Japanese soufflé cheesecake into elegant packaging, warm bakery atmosphere, cream-colored apron, marble counter, soft golden light, hands only no faces, photorealistic, 35mm film grain, natural imperfections, 4K, no text, no watermark",
  },
  {
    file: "cta.webp",
    ratio: "16:9",
    prompt: "Japanese cheesecake being sliced in half revealing light airy fluffy interior texture, golden caramelized top, cream interior, warm light from left, dark moody background, dramatic food photography, no faces, photorealistic, 35mm film grain, natural imperfections, 4K, no text, no watermark",
  },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetchJSON(url, options, body) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const req = https.request(
      {
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        method: options.method || "GET",
        headers: options.headers || {},
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data), headers: res.headers });
          } catch {
            resolve({ status: res.statusCode, body: data, headers: res.headers });
          }
        });
      }
    );
    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", (e) => {
      fs.unlinkSync(dest);
      reject(e);
    });
  });
}

async function generateImage(image, attempt = 0) {
  const destPath = path.join(OUT_DIR, image.file);
  if (fs.existsSync(destPath)) {
    console.log(`⏭️  ${image.file} déjà présent, saut.`);
    return;
  }

  console.log(`🎨 Génération : ${image.file} …`);

  const res = await fetchJSON(
    "https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        Prefer: "wait",
      },
    },
    {
      input: {
        prompt: image.prompt,
        aspect_ratio: image.ratio,
        num_outputs: 1,
        output_format: "webp",
        output_quality: 90,
        go_fast: true,
        num_inference_steps: 4,
      },
    }
  );

  if (res.status === 429) {
    const wait = parseInt(res.headers["retry-after"] || "12", 10) + 2;
    console.log(`⏳ Rate limit — attente ${wait}s…`);
    await sleep(wait * 1000);
    return generateImage(image, attempt + 1);
  }

  if (res.status === 402) {
    console.error("❌ Erreur 402 : crédit insuffisant sur le compte Replicate.");
    process.exit(1);
  }

  if (res.status !== 201 && res.status !== 200) {
    console.error(`❌ Erreur ${res.status} :`, JSON.stringify(res.body));
    if (attempt < 2) {
      await sleep(5000);
      return generateImage(image, attempt + 1);
    }
    return;
  }

  const output = res.body?.output;
  const imageUrl = Array.isArray(output) ? output[0] : output;

  if (!imageUrl) {
    console.error("❌ Pas d'URL dans la réponse :", JSON.stringify(res.body));
    return;
  }

  await downloadFile(imageUrl, destPath);
  console.log(`✅ ${image.file} sauvegardé.`);
}

async function main() {
  console.log("🚀 Génération des 6 images pour Soufflé Brossard…\n");

  // Test avec la première image
  await generateImage(IMAGES[0]);

  // Reste des images avec délai entre chaque
  for (let i = 1; i < IMAGES.length; i++) {
    await sleep(12000);
    await generateImage(IMAGES[i]);
  }

  console.log("\n🎉 Génération terminée !");
  const files = fs.readdirSync(OUT_DIR);
  console.log(`📁 Images dans public/images/ : ${files.join(", ")}`);
}

main().catch(console.error);
