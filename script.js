(() => {
  "use strict";

  const D = window.PORTFOLIO;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hasGSAP = !!(window.gsap && window.ScrollTrigger);
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const esc = (s = "") => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const rich = (s = "") => esc(s).replace(/\*(.+?)\*/g, "<em>$1</em>");
  const pad2 = (n) => String(n).padStart(2, "0");
  const get = (obj, path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);

  /* ------------------------------------------------------------------
     Theme
  ------------------------------------------------------------------ */
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem("theme");
    if (saved) root.dataset.theme = saved;
  } catch (e) {}

  /* ------------------------------------------------------------------
     Render content
  ------------------------------------------------------------------ */
  document.title = `${D.name} — ${D.role}`;
  const bindExtra = { year: new Date().getFullYear() };
  $$("[data-bind]").forEach((el) => {
    const key = el.dataset.bind;
    const val = key in bindExtra ? bindExtra[key] : get(D, key);
    if (val != null) el.innerHTML = rich(String(val));
  });
  $$("[data-bind-href]").forEach((el) => {
    const key = el.dataset.bindHref;
    el.href = key === "mailto" ? `mailto:${D.email}` : key === "tel" ? `tel:${(D.phone || "").replace(/\s+/g, "")}` : get(D, key) || "#";
  });

  // Portrait + résumé
  if (D.portrait) {
    $("#portraitArt").innerHTML = `<img src="${esc(D.portrait)}" alt="${esc(D.name)}">`;
    $(".portrait-cap").textContent = `${D.name} · ${D.location}`;
  }
  if (!D.resume || D.resume === "#") $$('[data-bind-href="resume"]').forEach((el) => el.remove());

  // Hero
  $("#heroTitle").innerHTML = D.hero.lines
    .map((l) => `<span class="line"><span class="line-inner">${rich(l)}</span></span>`)
    .join("");

  // Marquee
  const mItems = D.skills
    .map((s) => `<span class="marquee-item">${esc(s)}<span class="star">✦</span></span>`)
    .join("");
  $("#marquee").innerHTML = `<div class="marquee-group">${mItems}</div><div class="marquee-group" aria-hidden="true">${mItems}</div>`;
  $$(".marquee-group").forEach((g) => (g.style.display = "flex"));

  // About — every word wrapped for the scroll-scrubbed reveal
  $("#aboutLead").innerHTML = rich(D.about.lead)
    .split(/(<em>.*?<\/em>|\s+)/)
    .filter(Boolean)
    .map((t) => {
      if (/^\s+$/.test(t)) return " ";
      if (t.startsWith("<em>")) return `<em class="aw">${t.slice(4, -5)}</em>`;
      return `<span class="aw">${t}</span>`;
    })
    .join("");
  $("#stats").innerHTML = D.about.stats
    .map(
      (s) => `<div class="stat" data-reveal>
        <div class="stat-num"><span class="count" data-value="${s.value}">${s.value}</span><sup>${esc(s.suffix)}</sup></div>
        <div class="stat-label">${esc(s.label)}</div>
      </div>`
    )
    .join("");

  // Cover art ----------------------------------------------------------
  const patterns = {
    orbs: `<svg class="cover-pattern" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="currentColor"><circle cx="320" cy="60" r="70"/><circle cx="320" cy="60" r="110"/><circle cx="60" cy="260" r="90"/></g></svg>`,
    rings: `<svg class="cover-pattern" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="currentColor">${Array.from({ length: 9 }, (_, i) => `<circle cx="200" cy="150" r="${20 + i * 26}"/>`).join("")}</g></svg>`,
    grid: `<svg class="cover-pattern" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><g stroke="currentColor">${Array.from({ length: 11 }, (_, i) => `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="300"/>`).join("")}${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${i * 40}" x2="400" y2="${i * 40}"/>`).join("")}</g></svg>`,
    waves: `<svg class="cover-pattern" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="currentColor">${Array.from({ length: 12 }, (_, i) => `<path d="M0 ${30 + i * 22} C 100 ${i * 22}, 150 ${60 + i * 22}, 250 ${30 + i * 22} S 380 ${i * 22}, 400 ${30 + i * 22}"/>`).join("")}</g></svg>`,
    bars: `<svg class="cover-pattern" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><g fill="currentColor">${Array.from({ length: 20 }, (_, i) => `<rect x="${i * 20 + 4}" y="${300 - (40 + ((i * 53) % 180))}" width="8" height="${40 + ((i * 53) % 180)}" rx="4" opacity=".6"/>`).join("")}</g></svg>`,
  };
  const cover = (p) => {
    const [c1, c2] = p.colors || ["#ff6a3d", "#7b5cff"];
    if (p.image) return `<div class="cover cover--img"><img src="${esc(p.image)}" alt="${esc(p.title)} preview" loading="lazy"></div>`;
    return `<div class="cover" style="--c1:${c1};--c2:${c2}">
      <div class="cover-bg"></div>${patterns[p.pattern] || patterns.orbs}
      <div class="cover-mock"><div class="dots"><i></i><i></i><i></i></div>
        <div class="ttl">${esc(p.title)}</div>
        <div class="sk"><span></span><span></span></div>
        <div class="blocks"><span></span><span></span><span></span><span></span><span></span></div>
      </div></div>`;
  };

  // Work list ----------------------------------------------------------
  const arrowSvg = `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12h14m0 0-6-6m6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
  $("#workList").innerHTML = D.projects
    .map(
      (p, i) => `<li class="work-row" data-index="${i}" data-category="${esc(p.category)}">
        <button class="work-link" data-cursor="View" aria-label="Open ${esc(p.title)} case study">
          <span class="work-idx mono">${pad2(i + 1)}</span>
          <span class="work-title">${esc(p.title)}<small>${esc(p.category)} · ${esc(p.year)}</small></span>
          <span class="work-cat">${esc(p.category)}</span>
          <span class="work-year mono">${esc(p.year)}</span>
          <span class="work-arrow">${arrowSvg}</span>
        </button>
      </li>`
    )
    .join("");
  $("#previewStrip").innerHTML = D.projects.map(cover).join("");

  const cats = ["All", ...new Set(D.projects.map((p) => p.category))];
  $("#filters").innerHTML = cats
    .map((c, i) => {
      const n = c === "All" ? D.projects.length : D.projects.filter((p) => p.category === c).length;
      return `<button class="filter${i === 0 ? " is-active" : ""}" role="tab" aria-selected="${i === 0}" data-filter="${esc(c)}">${esc(c)}<sup>${pad2(n)}</sup></button>`;
    })
    .join("");

  // Services -------------------------------------------------------------
  $("#servicesList").innerHTML = D.services
    .map(
      (s, i) => `<div class="service${i === 0 ? " is-open" : ""}">
        <button class="service-btn" aria-expanded="${i === 0}">
          <span class="service-num mono">${pad2(i + 1)}</span>
          <span class="service-title">${esc(s.title)}</span>
          <span class="service-icon" aria-hidden="true"></span>
        </button>
        <div class="service-panel"><div><div class="service-content">
          <p>${esc(s.text)}</p>
          <div class="tags">${s.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        </div></div></div>
      </div>`
    )
    .join("");

  // Experience -----------------------------------------------------------
  $("#expList").innerHTML = D.experience
    .map(
      (e) => `<div class="exp" data-reveal>
        <span class="exp-period mono">${esc(e.period)}</span>
        <div class="exp-role">${esc(e.role)} <em>at ${esc(e.company)}</em></div>
        <p class="exp-note">${esc(e.note)}</p>
      </div>`
    )
    .join("");

  // Socials --------------------------------------------------------------
  $$("[data-socials]").forEach(
    (el) =>
      (el.innerHTML = D.socials
        .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener" class="magnetic">${esc(s.label)} ↗</a>`)
        .join(""))
  );

  /* ------------------------------------------------------------------
     Smooth scroll (Lenis) + GSAP ticker
  ------------------------------------------------------------------ */
  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 1 });
    if (hasGSAP) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    lenis.stop();
  }
  const scrollTo = (target) => {
    if (lenis) lenis.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else (typeof target === "number" ? window.scrollTo({ top: target, behavior: "smooth" }) : target.scrollIntoView({ behavior: "smooth" }));
  };
  const lockScroll = (lock) => {
    if (lenis) lock ? lenis.stop() : lenis.start();
    document.body.style.overflow = lock ? "hidden" : "";
  };

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    const target = id === "#top" || id === "#" ? 0 : $(id);
    if (target === null) return;
    e.preventDefault();
    if (document.body.classList.contains("menu-open")) toggleMenu(false);
    scrollTo(target);
  });

  /* ------------------------------------------------------------------
     Nav: hide on scroll down, reveal on scroll up; progress bar
  ------------------------------------------------------------------ */
  const nav = $("#nav");
  const progress = $("#progress");
  let lastY = 0;
  let scrollVel = 0;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle("is-scrolled", y > 40);
    if (!document.body.classList.contains("menu-open")) nav.classList.toggle("is-hidden", y > lastY && y > 300);
    scrollVel = y - lastY;
    lastY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ------------------------------------------------------------------
     Menu
  ------------------------------------------------------------------ */
  const menuBtn = $("#menuBtn");
  function toggleMenu(open) {
    document.body.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", open);
    $("#menu").setAttribute("aria-hidden", !open);
    lockScroll(open);
    nav.classList.remove("is-hidden");
  }
  menuBtn.addEventListener("click", () => toggleMenu(!document.body.classList.contains("menu-open")));

  /* ------------------------------------------------------------------
     Theme toggle
  ------------------------------------------------------------------ */
  $("#themeToggle").addEventListener("click", () => {
    const isLight = root.dataset.theme ? root.dataset.theme === "light" : matchMedia("(prefers-color-scheme: light)").matches;
    const next = isLight ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    $('meta[name="theme-color"]').content = getComputedStyle(root).getPropertyValue("--bg").trim();
    shader.updateColors();
  });

  /* ------------------------------------------------------------------
     Copy email + toast
  ------------------------------------------------------------------ */
  const toastEl = $("#toast");
  let toastT;
  const toast = (msg) => {
    toastEl.textContent = msg;
    toastEl.classList.add("is-visible");
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove("is-visible"), 2200);
  };
  $$(".copy-btn").forEach((btn) =>
    btn.addEventListener("click", async () => {
      const key = btn.dataset.copy;
      const value = D[key] || "";
      const label = key === "phone" ? "Phone number" : "Email";
      try {
        await navigator.clipboard.writeText(value);
        toast(`${label} copied ✦`);
      } catch (e) {
        const range = document.createRange();
        range.selectNodeContents(btn.parentElement.querySelector("span"));
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        toast(`${label} selected. Press Ctrl+C to copy`);
      }
    })
  );

  /* ------------------------------------------------------------------
     Services accordion
  ------------------------------------------------------------------ */
  $$(".service-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const open = !item.classList.contains("is-open");
      $$(".service").forEach((s) => {
        s.classList.remove("is-open");
        $(".service-btn", s).setAttribute("aria-expanded", "false");
      });
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open);
      if (hasGSAP) setTimeout(() => ScrollTrigger.refresh(), 650);
    })
  );

  /* ------------------------------------------------------------------
     Filters
  ------------------------------------------------------------------ */
  $("#filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    const f = btn.dataset.filter;
    $$(".filter").forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-selected", b === btn);
    });
    const rows = $$(".work-row");
    rows.forEach((r) => r.classList.toggle("is-filtered", f !== "All" && r.dataset.category !== f));
    if (hasGSAP && !reduce) {
      gsap.fromTo(rows.filter((r) => !r.classList.contains("is-filtered")), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: "expo.out", clearProps: "opacity,transform" });
      ScrollTrigger.refresh();
    }
  });

  /* ------------------------------------------------------------------
     Case study overlay
  ------------------------------------------------------------------ */
  const caseEl = $("#case");
  let current = -1;
  let lastFocus = null;
  function fillCase(i) {
    const p = D.projects[i];
    current = i;
    $("#caseKicker").innerHTML = `<span>${pad2(i + 1)} / ${pad2(D.projects.length)}</span><span>${esc(p.category)}</span>`;
    $("#caseTitle").textContent = p.title;
    $("#caseSummary").textContent = p.summary;
    $("#caseCover").innerHTML = cover(p);
    $("#caseMeta").innerHTML = [
      ["Role", p.role], ["When", p.year], ["Context", p.client], ["Stack", (p.stack || []).join(", ")],
    ].map(([k, v]) => `<div><dt class="mono">${k}</dt><dd>${esc(v)}</dd></div>`).join("");

    const block = (h, body, cls = "") => `<section class="case-block ${cls}"><h3>${h}</h3>${body}</section>`;
    const list = (arr) => `<ul>${arr.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>`;
    const media = (m, cls = "") =>
      m.type === "video"
        ? `<figure class="g-item ${m.tall ? "is-tall" : ""} ${cls}"><video src="${esc(m.src)}" poster="${esc(m.poster || "")}" controls playsinline muted loop preload="none"></video>${m.caption ? `<figcaption>${esc(m.caption)}</figcaption>` : ""}</figure>`
        : `<figure class="g-item ${m.tall ? "is-tall" : ""} ${cls}"><button class="g-zoom" data-cursor="Zoom" data-src="${esc(m.src)}" data-caption="${esc(m.caption || "")}"><img src="${esc(m.src)}" alt="${esc(m.caption || p.title)}" loading="lazy"></button>${m.caption ? `<figcaption>${esc(m.caption)}</figcaption>` : ""}</figure>`;

    const sections = [];
    if (p.highlights && p.highlights.length)
      sections.push(`<div class="case-highlights">${p.highlights.map((h) => `<div><strong>${esc(h.value)}</strong><span>${esc(h.label)}</span></div>`).join("")}</div>`);
    if (p.results)
      sections.push(block(esc(p.results.title), `<div class="results">${p.results.items.map((r) => `
        <figure class="result">
          <span class="result-label mono">${esc(r.label)}</span>
          <button class="g-zoom" data-cursor="Zoom" data-src="${esc(r.src)}" data-caption="${esc(r.label + " · " + r.caption)}"><img src="${esc(r.src)}" alt="${esc(r.label + ": " + r.caption)}" loading="lazy"></button>
          <figcaption>${esc(r.caption)}</figcaption>
        </figure>`).join("")}</div>${p.results.note ? `<p class="results-note mono">${esc(p.results.note)}</p>` : ""}`, "is-wide"));
    if (p.overview) sections.push(block("Overview", `<p>${esc(p.overview)}</p>`));
    if (p.challenge) sections.push(block("Challenge", `<p>${esc(p.challenge)}</p>`));
    if (p.solution) sections.push(block("Solution", `<p>${esc(p.solution)}</p>`));
    if (p.flow && p.flow.length)
      sections.push(block("How it works", `<ol class="case-flow">${p.flow.map((s, i) => `<li><span class="mono">${pad2(i + 1)}</span>${esc(s)}</li>`).join("")}</ol>`, "is-wide"));
    if (p.journey && p.journey.length)
      sections.push(block("The journey", `<div class="journey">${p.journey.map((j, i) => `
        <div class="journey-stage ${i === p.journey.length - 1 ? "is-latest" : ""}">
          <div class="journey-head"><span class="mono">${esc(j.label)}</span><h4>${esc(j.title)}</h4></div>
          ${j.media ? media(j.media, "journey-media") : ""}
          ${list(j.points)}
        </div>`).join('<div class="journey-arrow" aria-hidden="true">→</div>')}</div>`, "is-wide"));
    if (p.outcomes && p.outcomes.length) sections.push(block("Outcomes", list(p.outcomes)));
    if (p.next && p.next.length) sections.push(block("What's next", `<div class="tags">${p.next.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>`));
    if (p.gallery && p.gallery.length)
      sections.push(block("Gallery", `<div class="case-gallery">${p.gallery.map((m) => media(m)).join("")}</div>`, "is-wide"));
    $("#caseBody").innerHTML = sections.join("");

    $("#caseLinks").innerHTML = (p.links || [])
      .map((l) => `<a class="pill ${l.primary ? "primary" : ""} magnetic" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`)
      .join("");
    $("#caseNextTitle").textContent = D.projects[(i + 1) % D.projects.length].title;
    $("#caseScroll").scrollTop = 0;
    bindMagnetic($$(".magnetic", caseEl));
    bindCursorTargets(caseEl);
  }
  function openCase(i) {
    lastFocus = document.activeElement;
    fillCase(i);
    caseEl.classList.add("is-open");
    caseEl.setAttribute("aria-hidden", "false");
    lockScroll(true);
    hidePreview();
    history.replaceState(null, "", `#p-${D.projects[i].slug}`);
    setTimeout(() => $("#caseClose").focus({ preventScroll: true }), 50);
  }
  const pauseCaseVideos = () => $$("video", caseEl).forEach((v) => v.pause());
  function closeCase() {
    pauseCaseVideos();
    caseEl.classList.remove("is-open");
    caseEl.setAttribute("aria-hidden", "true");
    lockScroll(false);
    history.replaceState(null, "", location.pathname + location.search);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  $("#workList").addEventListener("click", (e) => {
    const row = e.target.closest(".work-row");
    if (row) openCase(+row.dataset.index);
  });
  $("#caseClose").addEventListener("click", closeCase);
  $("#caseNext").addEventListener("click", () => {
    const next = (current + 1) % D.projects.length;
    const scroller = $("#caseScroll");
    pauseCaseVideos();
    caseEl.classList.remove("is-open");
    setTimeout(() => {
      fillCase(next);
      history.replaceState(null, "", `#p-${D.projects[next].slug}`);
      caseEl.classList.add("is-open");
      scroller.scrollTop = 0;
    }, reduce ? 0 : 700);
  });
  // Lightbox for gallery images
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.innerHTML = `<img alt=""><p class="mono"></p>`;
  document.body.appendChild(lb);
  const closeLb = () => lb.classList.remove("is-open");
  lb.addEventListener("click", closeLb);
  caseEl.addEventListener("click", (e) => {
    const z = e.target.closest(".g-zoom");
    if (!z) return;
    $("img", lb).src = z.dataset.src;
    $("img", lb).alt = z.dataset.caption;
    $("p", lb).textContent = z.dataset.caption;
    lb.classList.add("is-open");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (lb.classList.contains("is-open")) closeLb();
    else if (caseEl.classList.contains("is-open")) closeCase();
    else if (document.body.classList.contains("menu-open")) toggleMenu(false);
  });

  /* ------------------------------------------------------------------
     Cursor, magnetic elements, project preview
  ------------------------------------------------------------------ */
  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  function bindCursorTargets() {}

  function bindMagnetic(els) {
    if (!finePointer || reduce) return;
    els.forEach((el) => {
      if (el.__mag) return;
      el.__mag = true;
      const strength = el.classList.contains("cta") ? 0.4 : 0.3;
      const inner = $(".cta-inner", el);
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transition = "transform .25s cubic-bezier(.16,1,.3,1)";
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        if (inner) inner.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transition = "transform .9s cubic-bezier(.16,1,.3,1)";
        el.style.transform = "";
        if (inner) { inner.style.transition = "transform .9s cubic-bezier(.16,1,.3,1)"; inner.style.transform = ""; }
      });
    });
  }

  // Preview
  const preview = $("#preview");
  const strip = $("#previewStrip");
  const prev = { x: mouse.x, y: mouse.y, rot: 0, scale: 0.6, targetScale: 0.6 };
  let previewOn = false;
  function hidePreview() {
    previewOn = false;
    prev.targetScale = 0.6;
    preview.classList.remove("is-visible");
  }
  if (finePointer) {
    bindMagnetic($$(".magnetic"));
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    $$(".work-row").forEach((row) => {
      row.addEventListener("mouseenter", () => {
        strip.style.transform = `translateY(${-row.dataset.index * 100}%)`;
        if (!previewOn) {
          prev.x = mouse.x;
          prev.y = mouse.y;
        }
        previewOn = true;
        prev.targetScale = 1;
        preview.classList.add("is-visible");
      });
    });
    $("#workList").addEventListener("mouseleave", hidePreview);
    window.addEventListener("scroll", () => {
      if (!previewOn) return;
      const el = document.elementFromPoint(mouse.x, mouse.y);
      if (!el || !el.closest("#workList")) hidePreview();
    }, { passive: true });

    const loop = () => {
      const dx = mouse.x - prev.x;
      prev.x = lerp(prev.x, mouse.x, 0.12);
      prev.y = lerp(prev.y, mouse.y, 0.12);
      prev.rot = lerp(prev.rot, clamp(dx * 0.08, -14, 14), 0.1);
      prev.scale = lerp(prev.scale, prev.targetScale, 0.12);
      preview.style.transform = `translate(${prev.x}px, ${prev.y}px) translate(-50%, -50%) rotate(${prev.rot}deg) scale(${prev.scale})`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ------------------------------------------------------------------
     Marquee — speed & direction follow scroll velocity
  ------------------------------------------------------------------ */
  (() => {
    const track = $("#marquee");
    const group = $(".marquee-group", track);
    let x = 0, dir = 1, boost = 0;
    const step = () => {
      const w = group.offsetWidth;
      if (Math.abs(scrollVel) > 0.5) dir = scrollVel > 0 ? 1 : -1;
      boost = lerp(boost, Math.min(Math.abs(scrollVel) * 0.35, 18), 0.1);
      scrollVel *= 0.9;
      x -= (reduce ? 0 : 0.6 + boost) * dir;
      if (w) { if (x <= -w) x += w; if (x > 0) x -= w; }
      track.style.transform = `translate3d(${x}px,0,0)`;
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  })();

  /* ------------------------------------------------------------------
     WebGL hero shader
  ------------------------------------------------------------------ */
  const shader = (() => {
    const canvas = $("#shader");
    const api = { updateColors() {} };
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, preserveDrawingBuffer: false });
    if (!gl) { canvas.classList.add("fallback"); return api; }

    const vs = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;
    const fs = `
      precision highp float;
      uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse;
      uniform vec3 uBg; uniform vec3 uA; uniform vec3 uB;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p){
        vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
      }
      float fbm(vec2 p){
        float v = 0.0, a = 0.5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
        for (int i = 0; i < 5; i++){ v += a * noise(p); p = m * p; a *= 0.5; }
        return v;
      }
      void main(){
        vec2 uv = gl_FragCoord.xy / uRes;
        vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
        float t = uTime * 0.05;
        vec2 mo = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);
        vec2 q = vec2(fbm(p * 1.3 + t), fbm(p * 1.3 - t + 3.1));
        vec2 r = vec2(fbm(p * 1.2 + 2.2 * q + vec2(1.7, 9.2) + t * 1.4), fbm(p * 1.2 + 2.2 * q + vec2(8.3, 2.8) - t));
        float f = fbm(p * 1.1 + 2.6 * r);
        vec2 c = vec2(0.42, 0.02) + mo * 0.25;
        float d = length((p - c) * vec2(0.8, 1.1));
        float glow = smoothstep(1.0, 0.0, d);
        float k = smoothstep(0.35, 0.95, f) * (0.25 + 0.75 * glow);
        vec3 col = mix(uBg, uB, smoothstep(0.3, 0.9, r.y) * 0.55 * glow);
        col = mix(col, uA, k * 0.9);
        col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.035;
        float v = smoothstep(1.25, 0.35, length((uv - vec2(0.5, 0.45)) * vec2(1.2, 1.4)));
        col = mix(uBg, col, v);
        gl_FragColor = vec4(col, 1.0);
      }`;
    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const v = compile(gl.VERTEX_SHADER, vs), f = compile(gl.FRAGMENT_SHADER, fs);
    if (!v || !f) { canvas.classList.add("fallback"); return api; }
    const prog = gl.createProgram();
    gl.attachShader(prog, v); gl.attachShader(prog, f); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.classList.add("fallback"); return api; }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n) => gl.getUniformLocation(prog, n);
    const uRes = U("uRes"), uTime = U("uTime"), uMouse = U("uMouse"), uBg = U("uBg"), uA = U("uA"), uB = U("uB");

    const hex = (h) => {
      h = h.trim().replace("#", "");
      if (h.length === 3) h = h.split("").map((c) => c + c).join("");
      const n = parseInt(h, 16);
      return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
    };
    api.updateColors = () => {
      const cs = getComputedStyle(root);
      gl.uniform3fv(uBg, hex(cs.getPropertyValue("--bg")));
      gl.uniform3fv(uA, hex(cs.getPropertyValue("--accent")));
      gl.uniform3fv(uB, hex(cs.getPropertyValue("--accent-2")));
      if (reduce) draw(8);
    };
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.5) * 0.75;
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      if (reduce) draw(8);
    };
    const m = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    window.addEventListener("mousemove", (e) => { m.tx = e.clientX / innerWidth; m.ty = 1 - e.clientY / innerHeight; }, { passive: true });
    function draw(t) {
      m.x = lerp(m.x, m.tx, 0.04);
      m.y = lerp(m.y, m.ty, 0.04);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, m.x, m.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    let visible = true;
    new IntersectionObserver(([en]) => (visible = en.isIntersecting)).observe(canvas);
    window.addEventListener("resize", resize);
    api.updateColors();
    resize();
    if (!reduce) {
      const start = performance.now();
      const frame = (now) => {
        if (visible && !document.hidden) draw((now - start) / 1000 + 8);
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }
    return api;
  })();

  /* ------------------------------------------------------------------
     Split text helper
  ------------------------------------------------------------------ */
  function splitWords(el) {
    const frag = document.createDocumentFragment();
    [...el.childNodes].forEach((n) => {
      if (n.nodeName === "BR") return frag.appendChild(n.cloneNode());
      const isEl = n.nodeType === 1;
      n.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) return frag.appendChild(document.createTextNode(" "));
        const w = document.createElement("span");
        w.className = "w";
        const inner = document.createElement("span");
        inner.className = "w-inner";
        if (isEl) { const c = n.cloneNode(false); c.textContent = part; inner.appendChild(c); }
        else inner.textContent = part;
        w.appendChild(inner);
        frag.appendChild(w);
      });
    });
    el.innerHTML = "";
    el.appendChild(frag);
    return $$(".w-inner", el);
  }

  /* ------------------------------------------------------------------
     Scroll animations
  ------------------------------------------------------------------ */
  function initScrollAnimations() {
    if (!hasGSAP || reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    $$("[data-split]").forEach((el) => {
      const words = splitWords(el);
      gsap.from(words, {
        yPercent: 115, rotate: 4, duration: 1.3, ease: "expo.out", stagger: 0.06,
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });

    $$("[data-reveal]").forEach((el) =>
      gsap.from(el, { y: 50, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } })
    );

    // About lead — words light up as you scroll
    gsap.fromTo($$("#aboutLead .aw"), { opacity: 0.12 }, {
      opacity: 1, stagger: 0.1, ease: "none",
      scrollTrigger: { trigger: "#aboutLead", start: "top 80%", end: "bottom 40%", scrub: 0.6 },
    });

    // Portrait parallax
    gsap.fromTo(".portrait-initials", { yPercent: -18 }, { yPercent: 18, ease: "none", scrollTrigger: { trigger: ".portrait", start: "top bottom", end: "bottom top", scrub: true } });
    gsap.from(".portrait-art", { clipPath: "inset(100% 0 0 0 round 18px)", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: ".portrait", start: "top 80%" } });

    // Counters
    $$(".count").forEach((el) => {
      const end = +el.dataset.value;
      const o = { v: 0 };
      el.textContent = "0";
      gsap.to(o, {
        v: end, duration: 2.2, ease: "power3.out",
        onUpdate: () => (el.textContent = Math.round(o.v)),
        scrollTrigger: { trigger: el, start: "top 90%" },
      });
    });

    // Work rows
    gsap.from(".work-row", { y: 60, opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.08, clearProps: "opacity,transform", scrollTrigger: { trigger: "#workList", start: "top 85%" } });

    // Services
    gsap.from(".service", { y: 40, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, clearProps: "opacity,transform", scrollTrigger: { trigger: "#servicesList", start: "top 85%" } });

    // Hero parallax out
    gsap.to(".hero-inner", { yPercent: 18, opacity: 0.1, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    gsap.to("#shader", { scale: 1.2, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

    // Contact panel rises
    gsap.from(".contact", { yPercent: 8, ease: "none", scrollTrigger: { trigger: ".contact", start: "top bottom", end: "top 40%", scrub: true } });

    ScrollTrigger.refresh();
  }

  function heroIntro() {
    if (!hasGSAP || reduce) return;
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from(".hero-title .line-inner", { yPercent: 120, rotate: 5, duration: 1.6, stagger: 0.1 })
      .from(".hero-meta > *, .hero-name, .hero-intro, .scroll-cue", { y: 24, opacity: 0, duration: 1.2, stagger: 0.06 }, "-=1.2")
      .from(".nav > *", { y: -30, opacity: 0, duration: 1.2, stagger: 0.06 }, "<")
      .from("#shader", { opacity: 0, scale: 1.3, duration: 2.4, ease: "power2.out" }, 0);
  }

  // Pre-hide hero bits so nothing flashes before the intro plays
  if (hasGSAP && !reduce) {
    gsap.set(".hero-title .line-inner", { yPercent: 120 });
  }

  /* ------------------------------------------------------------------
     Loader
  ------------------------------------------------------------------ */
  (() => {
    const loader = $("#loader");
    const count = $("#loaderCount");
    const bar = $("#loaderBar");
    const duration = reduce ? 200 : 1400;
    const start = performance.now();
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    let fontsDone = false;
    fontsReady.then(() => (fontsDone = true));
    setTimeout(() => (fontsDone = true), 3000);

    const step = (now) => {
      let t = Math.min((now - start) / duration, 1);
      if (!fontsDone) t = Math.min(t, 0.9);
      const e = 1 - Math.pow(1 - t, 3);
      count.textContent = Math.round(e * 100);
      bar.style.transform = `scaleX(${e})`;
      if (t < 1) return requestAnimationFrame(step);
      finish();
    };
    requestAnimationFrame(step);

    function finish() {
      loader.classList.add("is-done");
      document.body.classList.remove("is-loading");
      if (hasGSAP && !reduce) gsap.set(".hero-title .line-inner", { clearProps: "transform" });
      heroIntro();
      initScrollAnimations();
      if (lenis) lenis.start();
      setTimeout(() => loader.remove(), 1200);

      // Deep link to a project: #p-slug
      const m = location.hash.match(/^#p-(.+)$/);
      if (m) {
        const i = D.projects.findIndex((p) => p.slug === m[1]);
        if (i >= 0) setTimeout(() => openCase(i), 600);
      }
    }
  })();
})();
