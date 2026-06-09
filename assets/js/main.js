(function () {
  const whatsappUrl = "https://wa.me/6281200000000?text=Halo%20Akuntara%2C%20saya%20ingin%20konsultasi%20tentang%20layanan%20pembukuan%20UMKM.";
  const navItems = [
    { type: "link", href: "index.html", label: "Home", icon: "bi-grid-1x2" },
    { type: "link", href: "umkm.html", label: "UMKM", icon: "bi-shop" },
    { type: "link", href: "talent.html", label: "Talent", icon: "bi-mortarboard" },
    { type: "link", href: "partner.html", label: "Partner", icon: "bi-diagram-3" },
    {
      type: "dropdown",
      label: "Akuntara",
      icon: "bi-building-check",
      items: [
        { href: "about.html", label: "Tentang Kami", icon: "bi-info-circle" },
        { href: "layanan.html", label: "Layanan", icon: "bi-journal-check" },
        { href: "blog.html", label: "Blog", icon: "bi-newspaper" },
        { href: "contact.html", label: "Contact", icon: "bi-chat-dots" }
      ]
    }
  ];

  const currentFile = window.location.pathname.split("/").pop() || "index.html";

  function renderHeader() {
    const headerMount = document.querySelector("[data-component='header']");
    if (!headerMount) return;

    const navLinks = navItems.map((item, index) => {
      if (item.type === "dropdown") {
        const active = item.items.some((child) => child.href === currentFile) ? " active" : "";
        const children = item.items.map((child) => {
          const childActive = child.href === currentFile ? " active" : "";
          return `<a class="${childActive}" href="${child.href}"><i class="bi ${child.icon}" aria-hidden="true"></i>${child.label}</a>`;
        }).join("");

        return `
          <li class="nav-item nav-menu">
            <button class="nav-link nav-menu-toggle${active}" type="button" data-menu-toggle="navMenu${index}" aria-expanded="false" aria-controls="navMenu${index}"><i class="bi ${item.icon}" aria-hidden="true"></i>${item.label}</button>
            <div class="nav-dropdown" id="navMenu${index}">
              ${children}
            </div>
          </li>
        `;
      }

      const active = item.href === currentFile ? " active" : "";
      return `<li class="nav-item"><a class="nav-link${active}" href="${item.href}"><i class="bi ${item.icon}" aria-hidden="true"></i>${item.label}</a></li>`;
    }).join("");

    headerMount.innerHTML = `
      <a class="skip-link" href="#main">Lewati ke konten</a>
      <header class="site-header">
        <nav class="navbar navbar-expand-xl">
          <div class="container">
            <a class="navbar-brand" href="index.html" aria-label="Akuntara Home">
              <img class="brand-logo" src="assets/img/logo-akuntara.jpg" alt="Akuntara">
            </a>
            <button class="navbar-toggler" type="button" data-nav-toggle aria-controls="mainNav" aria-expanded="false" aria-label="Buka navigasi">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="mainNav">
              <ul class="navbar-nav ms-auto mb-2 mb-xl-0 align-items-xl-center">
                ${navLinks}
              </ul>
              <div class="nav-actions ms-xl-3">
                <div class="login-menu">
                  <button class="btn btn-login btn-sm" type="button" data-menu-toggle="loginDropdown" aria-expanded="false" aria-controls="loginDropdown"><i class="bi bi-person-plus" aria-hidden="true"></i>Daftar</button>
                  <div class="nav-dropdown login-dropdown" id="loginDropdown">
                    <a href="portal/daftar-umkm.html"><i class="bi bi-shop" aria-hidden="true"></i>Daftar UMKM</a>
                    <a href="portal/daftar-talent.html"><i class="bi bi-mortarboard" aria-hidden="true"></i>Daftar Talent</a>
                  </div>
                </div>
                <a class="btn btn-primary btn-sm" href="contact.html#consultation"><i class="bi bi-chat-square-text" aria-hidden="true"></i>Konsultasi</a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    `;
  }

  function renderFooter() {
    const footerMount = document.querySelector("[data-component='footer']");
    if (!footerMount) return;

    footerMount.innerHTML = `
      <footer class="site-footer">
        <div class="container py-5">
          <div class="row g-4">
            <div class="col-lg-4">
              <img class="footer-logo mb-4" src="assets/img/logo-akuntara.jpg" alt="Akuntara">
              <p>Akuntara membantu UMKM Indonesia membangun pembukuan, perpajakan, dan laporan keuangan yang lebih tertib melalui teknologi, talenta akuntansi, dan proses quality control.</p>
              <a class="footer-mini-cta" href="contact.html#consultation"><i class="bi bi-arrow-right-circle" aria-hidden="true"></i>Mulai konsultasi</a>
            </div>
            <div class="col-6 col-lg-2">
              <h3 class="h6 mb-3">Ekosistem</h3>
              <div class="footer-links">
                <a href="umkm.html"><i class="bi bi-shop" aria-hidden="true"></i>UMKM</a>
                <a href="talent.html"><i class="bi bi-mortarboard" aria-hidden="true"></i>Talent</a>
                <a href="partner.html"><i class="bi bi-diagram-3" aria-hidden="true"></i>Partner</a>
              </div>
            </div>
            <div class="col-6 col-lg-3">
              <h3 class="h6 mb-3">Akuntara</h3>
              <div class="footer-links">
                <a href="about.html"><i class="bi bi-info-circle" aria-hidden="true"></i>Tentang Kami</a>
                <a href="layanan.html"><i class="bi bi-journal-check" aria-hidden="true"></i>Layanan</a>
                <a href="blog.html"><i class="bi bi-newspaper" aria-hidden="true"></i>Blog</a>
                <a href="contact.html"><i class="bi bi-chat-dots" aria-hidden="true"></i>Contact</a>
              </div>
            </div>
            <div class="col-lg-3">
              <h3 class="h6 mb-3">Kontak</h3>
              <p class="footer-contact mb-2"><i class="bi bi-envelope" aria-hidden="true"></i>info@akuntara.id</p>
              <p class="footer-contact mb-2"><i class="bi bi-whatsapp" aria-hidden="true"></i>+62 812-0000-0000</p>
              <p class="footer-contact mb-0"><i class="bi bi-geo-alt" aria-hidden="true"></i>Indonesia</p>
            </div>
          </div>
        </div>
        <div class="copyright py-3">
          <div class="container d-flex flex-column flex-md-row justify-content-between gap-2">
            <span>Copyright 2026 Akuntara. All rights reserved.</span>
            <span>Akuntansi Nusantara Solution</span>
          </div>
        </div>
      </footer>
    `;
  }

  function setupNavToggle() {
    const button = document.querySelector("[data-nav-toggle]");
    const menu = document.getElementById("mainNav");
    if (!button || !menu) return;

    button.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("show");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  }

  function setupDropdownMenus() {
    const buttons = document.querySelectorAll("[data-menu-toggle]");
    if (!buttons.length) return;

    function closeMenus(exceptId) {
      buttons.forEach((button) => {
        const dropdown = document.getElementById(button.getAttribute("data-menu-toggle"));
        if (!dropdown || dropdown.id === exceptId) return;
        dropdown.classList.remove("show");
        button.setAttribute("aria-expanded", "false");
      });
    }

    buttons.forEach((button) => {
      const dropdown = document.getElementById(button.getAttribute("data-menu-toggle"));
      if (!dropdown) return;

      button.addEventListener("click", function (event) {
        event.stopPropagation();
        const isOpen = dropdown.classList.contains("show");
        closeMenus(dropdown.id);
        dropdown.classList.toggle("show", !isOpen);
        button.setAttribute("aria-expanded", String(!isOpen));
      });
    });

    document.addEventListener("click", function () {
      closeMenus();
    });
  }

  function setupContactForms() {
    document.querySelectorAll("[data-contact-form]").forEach((form) => {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        const alertBox = form.querySelector("[data-form-alert]");
        if (alertBox) {
          alertBox.classList.remove("d-none");
        }
      });
    });
  }

  function setupPageHeroVisuals() {
    const heroVisuals = {
      "umkm.html": { title: "UMKM Consultation", image: "assets/img/umkm-consultation.png", copy: "Konsultasi dan pemetaan kebutuhan bisnis UMKM." },
      "talent.html": { title: "Talent Training", image: "assets/img/talent-training.png", copy: "Training, mentoring, dan praktik kerja akuntansi." },
      "partner.html": { title: "Education Partner", icon: "bi-building", copy: "Slot foto kerja sama sekolah, kampus, atau komunitas." },
      "about.html": { title: "Akuntara Team", icon: "bi-people", copy: "Slot foto tim, proses kerja, atau ruang kolaborasi Akuntara." },
      "layanan.html": { title: "Service Review", image: "assets/img/laporan-keuangan.png", copy: "Preview layanan, laporan, dan proses review." },
      "blog.html": { title: "Insight Library", icon: "bi-newspaper", copy: "Slot visual editorial untuk artikel dan edukasi UMKM." },
      "contact.html": { title: "Consultation Session", icon: "bi-chat-square-text", copy: "Slot foto percakapan awal dengan tim Akuntara." },
      "daftar.html": { title: "Registration Journey", icon: "bi-person-plus", copy: "Slot visual proses pendaftaran UMKM, talent, atau partner." }
    };

    document.querySelectorAll(".page-hero .container").forEach((container) => {
      if (container.querySelector(".page-hero-visual")) return;

      const currentChildren = Array.from(container.children);
      const copy = document.createElement("div");
      copy.className = "page-hero-copy";
      currentChildren.forEach((child) => copy.appendChild(child));

      const visualContent = heroVisuals[currentFile] || { title: "Akuntara Ecosystem", icon: "bi-building-check", copy: "Slot visual profesional untuk halaman Akuntara." };
      const visual = document.createElement(visualContent.image ? "figure" : "div");
      visual.className = visualContent.image ? "page-hero-visual asset-image-card" : "page-hero-visual image-placeholder";
      visual.innerHTML = visualContent.image
        ? `<img src="${visualContent.image}" alt="${visualContent.title}"><figcaption><strong>${visualContent.title}</strong><span>${visualContent.copy}</span></figcaption>`
        : `
          <div class="image-placeholder-body">
            <i class="bi ${visualContent.icon}" aria-hidden="true"></i>
            <strong>${visualContent.title}</strong>
            <p>${visualContent.copy}</p>
          </div>
        `;

      container.append(copy, visual);
    });
  }

  function setupSwitchers() {
    document.querySelectorAll("[data-switcher]").forEach((switcher) => {
      const tabs = switcher.querySelectorAll("[data-switch-target]");
      const panels = switcher.querySelectorAll("[data-switch-panel]");

      tabs.forEach((tab) => {
        tab.addEventListener("click", function () {
          const target = tab.getAttribute("data-switch-target");

          tabs.forEach((item) => {
            item.classList.toggle("is-active", item === tab);
          });

          panels.forEach((panel) => {
            panel.classList.toggle("is-active", panel.getAttribute("data-switch-panel") === target);
          });
        });
      });
    });
  }

  function setupPageTransitions() {
    window.requestAnimationFrame(() => {
      document.body.classList.add("page-is-ready");
    });
  }

  function setupVisualEnhancements() {
    const iconRules = [
      { pattern: /pembukuan|transaksi|startup/i, icon: "bi-journal-text" },
      { pattern: /pajak|tax/i, icon: "bi-receipt" },
      { pattern: /laporan|report|insight|dashboard/i, icon: "bi-bar-chart-line" },
      { pattern: /teknologi|platform|system|access|security/i, icon: "bi-shield-check" },
      { pattern: /talent|operator|people|magang|training|education|kurikulum|kampus|sekolah/i, icon: "bi-mortarboard" },
      { pattern: /review|control|supervisor|standard|quality|manager/i, icon: "bi-patch-check" },
      { pattern: /partner|community|ecosystem|kolaborasi|institusi/i, icon: "bi-diagram-3" },
      { pattern: /growth|scale|bertumbuh|umkm|business|enterprise/i, icon: "bi-graph-up-arrow" }
    ];

    function pickIcon(text) {
      const match = iconRules.find((rule) => rule.pattern.test(text));
      return match ? match.icon : "bi-building-check";
    }

    document.querySelectorAll(".card-clean, .feature-row, .pricing-card, .ecosystem-node").forEach((card) => {
      if (card.querySelector(":scope > .visual-icon")) return;
      const icon = document.createElement("i");
      icon.className = `visual-icon bi ${pickIcon(card.textContent)}`;
      icon.setAttribute("aria-hidden", "true");
      card.prepend(icon);
    });

    document.querySelectorAll(".workflow-step span, .qc-stage span, .review-step small").forEach((marker) => {
      marker.classList.add("step-marker");
    });

    const revealTargets = document.querySelectorAll(".section-title, .card-clean, .feature-row, .workflow-step, .qc-stage, .pricing-card, .partner-item, .story-panel, .diagnostic-row:not(.is-head), .ecosystem-node, .orbit-node, .logo-placeholder, .article-grid .card-clean, .context-switcher, .capability-stack, .media-strip, .asset-image-card, .summary-table");
    revealTargets.forEach((target) => {
      target.classList.add("reveal-on-scroll");
      if (target.getBoundingClientRect().top < window.innerHeight * 0.82) {
        target.classList.add("is-visible");
      }
    });

    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -32px 0px" });

    revealTargets.forEach((target) => {
      if (!target.classList.contains("is-visible")) {
        observer.observe(target);
      }
    });
  }

  renderHeader();
  renderFooter();
  setupNavToggle();
  setupDropdownMenus();
  setupContactForms();
  setupPageHeroVisuals();
  setupSwitchers();
  setupVisualEnhancements();
  setupPageTransitions();
})();
