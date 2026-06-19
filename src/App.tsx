import { useEffect, useRef } from "react";
import {
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Star,
  Instagram,
  ShoppingBag,
  Cake,
  Package,
  Leaf,
  Sparkles,
  Heart,
} from "lucide-react";

export default function App() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = e.clientX - 100 + "px";
      glowRef.current.style.top = e.clientY - 100 + "px";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="site-wrapper">
      {/* Cursor glow */}
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,169,98,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "left 0.12s ease, top 0.12s ease",
          filter: "blur(20px)",
        }}
      />

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-inner">
          <a href="#" className="nav-logo">
            <span className="logo-main">Soufflé</span>
            <span className="logo-accent">🍰</span>
          </a>
          <ul className="nav-links">
            <li><a href="#menu" className="nav-link">Menu</a></li>
            <li><a href="#about" className="nav-link">À propos</a></li>
            <li><a href="#locations" className="nav-link">Succursales</a></li>
            <li><a href="#contact" className="nav-link">Contact</a></li>
          </ul>
          <a
            href="tel:5146078544"
            className="btn-nav-cta"
            style={{ marginLeft: "auto" }}
          >
            <Phone size={13} />
            (514) 607‑8544
          </a>
          <button className="nav-hamburger" aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src="/images/new-3.jpg"
            alt="Soufflé — cheesecakes japonais collection complète"
            className="hero-img"
            loading="eager"
            fetchPriority="high"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
            style={{ objectFit: "cover", objectPosition: "center center", width: "100%", height: "100%" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #1a0f05 0%, #2c1a08 40%, #3d2510 100%)",
            }}
          />
        </div>
        <div className="hero-overlay" />

        <div className="hero-content" style={{ width: "100%" }}>
          <div className="hero-badge">
            <MapPin size={11} />
            Mail Champlain · Brossard — 5 succursales au Québec
          </div>

          <h1 className="hero-title">
            Le cheesecake<br />
            japonais qui<br />
            <span className="hero-title-accent">vous fera fondre.</span>
          </h1>

          <p className="hero-sub">
            Fait frais tous les jours. Technique japonaise traditionnelle,
            ingrédients premium, texture légère et aérienne comme un nuage.
          </p>

          <a href="tel:5146078544" className="hero-phone">
            <Phone size={22} />
            (514) 607‑8544
          </a>

          <div className="hero-actions">
            <a
              href="https://www.ubereats.com/ca/store/souffle-brossard/k7dUjxLiVdOvQVgc0e_UXw"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <ShoppingBag size={15} style={{ marginRight: 8 }} />
              Commander sur Uber Eats
            </a>
            <a href="#locations" className="btn-ghost">
              Nos succursales
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="stats-band">
        <div className="stats-inner">
          <div className="stat-item">
            <span className="stat-number">4.5<span className="stat-plus">★</span></span>
            <span className="stat-label">Note Google</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">200<span className="stat-plus">+</span></span>
            <span className="stat-label">Avis clients</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">5</span>
            <span className="stat-label">Succursales</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">
              <span style={{ fontSize: "1.5rem" }}>Frais</span>
            </span>
            <span className="stat-label">Fait tous les jours</span>
          </div>
        </div>
      </section>

      {/* ── SERVICES / MENU ── */}
      <section className="services-section" id="menu">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">Notre menu</span>
            <h2 className="section-title">
              Des saveurs qui
              <span className="title-accent"> élèvent les sens</span>
            </h2>
          </div>

          <div className="services-grid">
            {/* Card 1 */}
            <div className="service-card">
              <div className="service-img-wrap">
                <img
                  src="/images/new-1.jpg"
                  alt="Cheesecake cœur fraises bleuets noix de coco"
                  className="service-img"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).parentElement!.style.background =
                      "linear-gradient(135deg, #2c1a08, #4a2d0f)";
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="service-img-overlay" />
              </div>
              <div className="service-body">
                <div className="service-icon-wrap">
                  <Cake size={18} />
                </div>
                <h3 className="service-title">Cheesecake à la part</h3>
                <p className="service-desc">
                  Notre cheesecake japonais signature : ultra-léger, aérien, avec
                  cette texture qui fond en bouche. Disponible nature ou avec garnitures.
                </p>
                <ul className="service-list">
                  <li><Star size={12} /> Chocolat & pistache</li>
                  <li><Star size={12} /> Caramel & noix de coco</li>
                  <li><Star size={12} /> Royal Dubaï (édition spéciale)</li>
                </ul>
                <a href="https://www.ubereats.com/ca/store/souffle-brossard/k7dUjxLiVdOvQVgc0e_UXw" target="_blank" rel="noopener noreferrer" className="service-link">
                  Commander <ArrowRight size={12} />
                </a>
              </div>
            </div>

            {/* Card 2 — Featured */}
            <div className="service-card service-card--featured">
              <div className="service-img-wrap">
                <img
                  src="/images/new-2.jpg"
                  alt="Gâteau entier pistache fruits chocolat"
                  className="service-img"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).parentElement!.style.background =
                      "linear-gradient(135deg, #0f1117, #181c26)";
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="service-img-overlay" />
              </div>
              <div className="service-body">
                <div className="service-icon-wrap service-icon-wrap--accent">
                  <Heart size={18} />
                </div>
                <h3 className="service-title">Gâteau entier</h3>
                <p className="service-desc">
                  Pour vos anniversaires, célébrations et événements. Un soufflé cheesecake
                  entier à partager, préparé avec soin le jour même pour une fraîcheur optimale.
                </p>
                <ul className="service-list">
                  <li><Star size={12} /> Disponible en 15 cm et 20 cm</li>
                  <li><Star size={12} /> Personnalisable avec vos garnitures</li>
                  <li><Star size={12} /> Emballage cadeau disponible</li>
                </ul>
                <a href="tel:5146078544" className="service-link service-link--accent">
                  Nous contacter <ArrowRight size={12} />
                </a>
              </div>
            </div>

            {/* Card 3 */}
            <div className="service-card">
              <div className="service-img-wrap">
                <img
                  src="/images/google-2.jpg"
                  alt="Taiyaki chocolat pistache Soufflé"
                  className="service-img"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).parentElement!.style.background =
                      "linear-gradient(135deg, #1a0f05, #2c1a08)";
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="service-img-overlay" />
              </div>
              <div className="service-body">
                <div className="service-icon-wrap">
                  <Package size={18} />
                </div>
                <h3 className="service-title">Livraison & Emporter</h3>
                <p className="service-desc">
                  Commandez en ligne via Uber Eats pour la livraison à domicile,
                  ou passez nous voir directement au Mail Champlain. Nos cheesecakes
                  sont prêts à emporter dans un emballage soigné.
                </p>
                <ul className="service-list">
                  <li><Star size={12} /> Livraison via Uber Eats</li>
                  <li><Star size={12} /> Commande en ligne 24/7</li>
                  <li><Star size={12} /> Ramassage en boutique</li>
                </ul>
                <a href="https://www.ubereats.com/ca/store/souffle-brossard/k7dUjxLiVdOvQVgc0e_UXw" target="_blank" rel="noopener noreferrer" className="service-link">
                  Uber Eats <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT / EDITORIAL ── */}
      <section className="why-section" id="about">
        <div className="why-inner">
          <div className="why-visual">
            <div className="why-img" style={{ position: "relative", height: 560 }}>
              <img
                src="/images/store.jpg"
                alt="Boutique Soufflé Mail Champlain Brossard"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, #1a0f05 0%, #2c1a08 100%)",
                  zIndex: -1,
                }}
              />
            </div>
            <div className="why-badge-float">
              <span className="why-badge-num">4.5</span>
              <div>
                <div className="why-badge-text">Note Google</div>
                <div className="why-badge-text">200+ avis</div>
              </div>
            </div>
          </div>

          <div className="why-content">
            <span className="section-eyebrow">Notre histoire</span>
            <h2 className="section-title why-title">
              L'art du soufflé<br />
              <span className="title-accent">à la japonaise</span>
            </h2>
            <p className="why-desc">
              Chez Soufflé, nous avons fusionné la rigueur de la technique japonaise
              avec la passion française de la pâtisserie. Chaque cheesecake est
              préparé frais quotidiennement, avec des ingrédients de première qualité,
              pour vous offrir une texture inégalée : légère comme un nuage,
              riche en saveurs, fondant en bouche à chaque bouchée.
            </p>

            <div className="why-pillars">
              <div className="pillar">
                <div className="pillar-icon"><Leaf size={16} /></div>
                <div>
                  <div className="pillar-title">Ingrédients premium</div>
                  <div className="pillar-desc">Sélection rigoureuse de chaque ingrédient pour une qualité constante et irréprochable.</div>
                </div>
              </div>
              <div className="pillar">
                <div className="pillar-icon"><Sparkles size={16} /></div>
                <div>
                  <div className="pillar-title">Fait frais tous les jours</div>
                  <div className="pillar-desc">Aucun cheesecake d'hier. Chaque jour, une nouvelle fournée — fraîcheur garantie.</div>
                </div>
              </div>
              <div className="pillar">
                <div className="pillar-icon"><Heart size={16} /></div>
                <div>
                  <div className="pillar-title">Technique japonaise</div>
                  <div className="pillar-desc">Méthode traditionnelle pour obtenir cette texture aérienne signature impossible à imiter.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATIONS ── */}
      <section
        id="locations"
        style={{
          background: "var(--clr-light)",
          padding: "7rem 0",
        }}
      >
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">Nos succursales</span>
            <h2 className="section-title">
              Trouvez-nous
              <span className="title-accent"> près de chez vous</span>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5px",
              background: "rgba(0,0,0,0.08)",
            }}
          >
            {[
              { name: "Mail Champlain", address: "2151 Boul. Lapinière K08, Brossard", hours: "Lun–Mer 10h–18h · Jeu–Ven 10h–21h" },
              { name: "Centre Eaton", address: "705 Rue Ste-Catherine O #1-264, Montréal", hours: "Lun–Ven 10h–19h · Sam 11h–17h30" },
              { name: "Village / Centre-Sud", address: "1215 Rue Ste-Catherine E, Montréal", hours: "Lun–Ven 10h–19h · Sam 11h–17h30" },
              { name: "CF Promenades St-Bruno", address: "1000 Boul. Belvédère S, St-Bruno", hours: "Lun–Mer 10h–17h30 · Jeu–Ven 10h–21h" },
              { name: "Galerie d'Anjou", address: "7999 Boul. Les Galeries d'Anjou, Montréal", hours: "Lun–Mer 10h–17h30 · Jeu–Ven 10h–21h" },
            ].map((loc) => (
              <div
                key={loc.name}
                style={{
                  background: "var(--clr-white)",
                  padding: "2rem",
                  transition: "transform 0.25s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    background: "var(--clr-gold)",
                    marginBottom: "1.25rem",
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-title)",
                    fontSize: "1.2rem",
                    marginBottom: "0.75rem",
                    color: "var(--clr-text-dark)",
                  }}
                >
                  {loc.name}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <MapPin size={13} style={{ color: "var(--clr-gold)", marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: "0.8rem", color: "var(--clr-text-muted)", lineHeight: 1.5 }}>
                    {loc.address}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                  <Clock size={13} style={{ color: "var(--clr-gold)", marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: "0.75rem", color: "var(--clr-text-muted)", lineHeight: 1.5 }}>
                    {loc.hours}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" id="contact">
        <div className="cta-bg">
          <img
            src="/images/new-2.jpg"
            alt="Cheesecake japonais Soufflé pistache fruits"
            className="cta-img"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #1a0f05ee 0%, #2c1a08cc 100%)",
            }}
          />
        </div>
        <div className="cta-overlay" />

        <div className="cta-content">
          <div className="cta-offer-badge">
            <Sparkles size={13} />
            <span>Disponible en boutique & livraison · <strong>Fait frais chaque matin</strong></span>
          </div>

          <h2 className="cta-title">
            Venez goûter le cheesecake
            <span className="cta-title-accent"> qui fait fondre Montréal.</span>
          </h2>

          <p className="cta-sub">
            Rejoignez les 200+ clients qui nous font confiance chaque semaine.
            Passez nous voir au Mail Champlain à Brossard, ou commandez en ligne —
            livraison rapide via Uber Eats.
          </p>

          <div className="cta-actions">
            <a
              href="https://www.ubereats.com/ca/store/souffle-brossard/k7dUjxLiVdOvQVgc0e_UXw"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta-main"
            >
              <ShoppingBag size={15} />
              Commander maintenant
            </a>
            <a href="tel:5146078544" className="btn-cta-phone">
              <Phone size={15} />
              (514) 607‑8544
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">
              <span className="logo-main">Soufflé</span>
              <span className="logo-accent"> 🍰</span>
            </div>
            <p className="footer-tagline">
              Cheesecakes japonais faits frais tous les jours.<br />
              Légers, aériens, inoubliables.
            </p>
            <div className="footer-contact">
              <a href="tel:5146078544" className="footer-phone">
                <Phone size={14} />
                (514) 607‑8544
              </a>
              <div className="footer-location">
                <MapPin size={13} />
                2151 Boul. Lapinière K08, Brossard, QC
              </div>
              <div className="footer-hours">
                <Clock size={13} />
                Lun–Mer 10h–18h · Jeu–Ven 10h–21h · Sam 9h–19h · Dim 10h–18h
              </div>
            </div>
          </div>

          <div>
            <div className="footer-heading">Succursales</div>
            <ul className="footer-links">
              <li><a href="#locations">Mail Champlain</a></li>
              <li><a href="#locations">Centre Eaton</a></li>
              <li><a href="#locations">Village / Centre-Sud</a></li>
              <li><a href="#locations">CF Promenades St-Bruno</a></li>
              <li><a href="#locations">Galerie d'Anjou</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-heading">Menu</div>
            <ul className="footer-links">
              <li><a href="#menu">Cheesecake à la part</a></li>
              <li><a href="#menu">Gâteau entier</a></li>
              <li><a href="#menu">Éditions spéciales</a></li>
              <li><a href="https://www.ubereats.com/ca/store/souffle-brossard/k7dUjxLiVdOvQVgc0e_UXw" target="_blank" rel="noopener noreferrer">Commander en ligne</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-heading">Suivez-nous</div>
            <ul className="footer-links">
              <li>
                <a
                  href="https://www.instagram.com/souffle_ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                >
                  <Instagram size={13} />
                  @souffle_ca
                </a>
              </li>
              <li><a href="https://souffleinc.com" target="_blank" rel="noopener noreferrer">souffleinc.com</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Soufflé Inc. Tous droits réservés.</span>
          <div className="footer-legal">
            <a href="#">Politique de confidentialité</a>
            <a href="#">Conditions d'utilisation</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
