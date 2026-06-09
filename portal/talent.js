(function () {
  const whatsappNumber = "6281200000000";
  const form = document.querySelector("[data-talent-form]");
  if (!form) return;

  const successState = form.querySelector("[data-success-state]");
  const whatsappLink = form.querySelector("[data-whatsapp-link]");
  const steps = Array.from(form.querySelectorAll("[data-step]"));
  const prevButton = form.querySelector("[data-prev-step]");
  const nextButton = form.querySelector("[data-next-step]");
  const submitButton = form.querySelector("[data-submit-step]");
  const stepCount = form.querySelector("[data-step-count]");
  const stepTitle = form.querySelector("[data-step-title]");
  const progressBar = form.querySelector("[data-progress-bar]");
  const previewDoc = form.querySelector("[data-preview-doc]");
  const stageDetail = document.querySelector("[data-stage-detail]");
  const infoToggle = document.querySelector("[data-info-toggle]");
  const infoBody = document.querySelector("[data-info-body]");
  const whatsappInput = form.elements.whatsapp;
  const stepTitles = [
    "Informasi Pribadi",
    "Kategori & Latar Belakang",
    "Perangkat & Koneksi",
    "Pengalaman & Kemampuan",
    "Minat & Ketersediaan",
    "Komitmen & Preview"
  ];
  let currentStep = 0;
  let hasSubmitted = false;

  function getValues(name) {
    return Array.from(form.querySelectorAll(`[name="${name}"]:checked`)).map((input) => input.value);
  }

  function fieldValue(name) {
    const field = form.elements[name];
    return field ? field.value.trim() : "";
  }

  function joinValues(values) {
    return values.length ? values.join(", ") : "-";
  }

  function displayValue(name) {
    return fieldValue(name) || "-";
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char]));
  }

  function visibleFields() {
    return Array.from(steps[currentStep].querySelectorAll("input, select, textarea"));
  }

  function validateCurrentStep() {
    const fields = visibleFields();
    return fields.every((field) => {
      if (!field.required) return true;
      if (field.checkValidity()) return true;
      field.reportValidity();
      return false;
    });
  }

  function renderPreview() {
    if (!previewDoc) return;

    const pengalaman = getValues("pengalaman");
    const minat = getValues("minat");
    const ketersediaan = [...getValues("hari"), ...getValues("waktu")];
    const komitmen = getValues("komitmen");
    const rows = [
      ["Nama", displayValue("nama")],
      ["WhatsApp", displayValue("whatsapp")],
      ["Email", displayValue("email")],
      ["Kategori", displayValue("kategori")],
      ["Status Saat Ini", displayValue("status")],
      ["Sekolah / Kampus / Instansi", displayValue("instansi")],
      ["Jurusan / Bidang", displayValue("jurusan")],
      ["Kelas / Semester / Posisi", displayValue("posisi")],
      ["Alamat Domisili", displayValue("alamat")],
      ["Kecamatan", displayValue("kecamatan")],
      ["Kota / Kabupaten", displayValue("kota")],
      ["Provinsi", displayValue("provinsi")],
      ["Kode Pos", displayValue("kode_pos")],
      ["Akses Laptop / Komputer", displayValue("laptop")],
      ["Koneksi Internet", displayValue("internet")],
      ["Tempat Mengerjakan Tugas", displayValue("tempat")],
      ["Pengalaman", joinValues(pengalaman)],
      ["Kemampuan Spreadsheet", displayValue("excel")],
      ["Akuntansi Dasar", displayValue("akuntansi")],
      ["Ketelitian Input Data", displayValue("ketelitian")],
      ["Minat Utama", joinValues(minat)],
      ["Ketersediaan", joinValues(ketersediaan)],
      ["Estimasi Waktu per Minggu", displayValue("waktu_mingguan")],
      ["Komitmen", joinValues(komitmen)],
      ["Catatan", displayValue("catatan")]
    ];

    previewDoc.innerHTML = `
      <div class="portal-preview-head">
        <span>Status awal: Pendaftar Talent</span>
        <strong>Ringkasan Pendaftaran Talent Akuntara</strong>
      </div>
      <div class="portal-preview-grid">
        ${rows.map(([label, value]) => `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join("")}
      </div>
    `;
  }

  function renderStep() {
    steps.forEach((step, index) => {
      step.classList.toggle("is-active", index === currentStep);
    });

    const isFirst = currentStep === 0;
    const isLast = currentStep === steps.length - 1;
    prevButton.disabled = isFirst || hasSubmitted;
    nextButton.disabled = hasSubmitted;
    submitButton.disabled = hasSubmitted;
    nextButton.classList.toggle("d-none", isLast);
    submitButton.classList.toggle("d-none", !isLast);
    stepCount.textContent = `Step ${currentStep + 1} dari ${steps.length}`;
    stepTitle.textContent = stepTitles[currentStep];
    progressBar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
    if (isLast) renderPreview();
  }

  nextButton.addEventListener("click", function () {
    if (!validateCurrentStep()) return;
    currentStep = Math.min(currentStep + 1, steps.length - 1);
    renderStep();
  });

  prevButton.addEventListener("click", function () {
    currentStep = Math.max(currentStep - 1, 0);
    renderStep();
  });

  document.querySelectorAll("[data-stage-info]").forEach((button) => {
    button.addEventListener("click", function () {
      document.querySelectorAll("[data-stage-info]").forEach((item) => item.classList.toggle("is-active", item === button));
      stageDetail.textContent = button.getAttribute("data-stage-info");
      stageDetail.classList.add("is-active");
    });
  });

  if (infoToggle && infoBody) {
    infoToggle.addEventListener("click", function () {
      const isOpen = infoToggle.getAttribute("aria-expanded") === "true";
      infoToggle.setAttribute("aria-expanded", String(!isOpen));
      infoBody.hidden = isOpen;
    });
  }

  document.querySelectorAll("[data-day-action]").forEach((button) => {
    button.addEventListener("click", function () {
      const action = button.getAttribute("data-day-action");
      const days = Array.from(form.querySelectorAll('[name="hari"]'));
      days.forEach((day) => {
        if (action === "clear") {
          day.checked = false;
        } else if (action === "weekday") {
          day.checked = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].includes(day.value);
        } else if (action === "all") {
          day.checked = true;
        }
      });
    });
  });

  document.querySelectorAll("[data-time-action]").forEach((button) => {
    button.addEventListener("click", function () {
      const action = button.getAttribute("data-time-action");
      const times = Array.from(form.querySelectorAll('[name="waktu"]'));
      times.forEach((time) => {
        time.checked = action === "all";
      });
    });
  });

  if (whatsappInput) {
    whatsappInput.addEventListener("input", function () {
      let value = whatsappInput.value.replace(/[^\d+\s-]/g, "");
      value = value.replace(/(?!^)\+/g, "");
      whatsappInput.value = value;
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (hasSubmitted) return;
    if (!validateCurrentStep()) return;

    const minat = getValues("minat");
    const ketersediaan = [...getValues("hari"), ...getValues("waktu")];
    const pengalaman = getValues("pengalaman");
    const message = [
      "Halo Akuntara, saya sudah mengisi pendaftaran Talent.",
      "",
      `Nama: ${fieldValue("nama") || "-"}`,
      `Kategori Pendaftar: ${fieldValue("kategori") || "-"}`,
      `Sekolah/Kampus/Instansi: ${fieldValue("instansi") || "-"}`,
      `Kecamatan: ${fieldValue("kecamatan") || "-"}`,
      `Kota: ${fieldValue("kota") || "-"}`,
      `Minat Utama: ${joinValues(minat)}`,
      `Ketersediaan Waktu: ${joinValues(ketersediaan)}`,
      `Akses Laptop: ${fieldValue("laptop") || "-"}`,
      `Pengalaman Singkat: ${joinValues(pengalaman)}`,
      "",
      "Mohon dibantu untuk proses screening Talent Akuntara."
    ].join("\n");

    whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    hasSubmitted = true;
    submitButton.textContent = "Pendaftaran Terkirim";
    submitButton.disabled = true;
    prevButton.disabled = true;
    nextButton.disabled = true;
    Array.from(form.elements).forEach((field) => {
      field.disabled = true;
    });
    successState.classList.remove("d-none");
    successState.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  renderStep();
})();
