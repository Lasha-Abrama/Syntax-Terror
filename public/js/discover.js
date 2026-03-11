(function () {
  if (window.innerWidth <= 420) return;
  document.querySelectorAll(".hero-slide").forEach((el) => {
    let hex = el.dataset.colour;
    hex = hex.replace(/"/g, "").trim();
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    el.style.setProperty("--colour-r", r);
    el.style.setProperty("--colour-g", g);
    el.style.setProperty("--colour-b", b);
  });
  const slides = document.querySelectorAll(".hero-slide");
  const heroSection = document.querySelector(".hero-section");
  const SONG_DURATION = 15; // seconds
  let audio = new Audio();
  let interval = null;
  let currentSlide = null;
  let time = 0;

  function resetSlide(slide) {
    if (!slide) return;
    const progress = slide.querySelector(".progress");
    const playIcon = slide.querySelector(".play-icon");
    const pauseIcon = slide.querySelector(".pause-icon");
    if (progress) progress.style.width = "0%";
    if (playIcon) playIcon.style.display = "block";
    if (pauseIcon) pauseIcon.style.display = "none";
  }

  function stopCurrent() {
    if (interval) clearInterval(interval);
    audio.pause();
    audio.currentTime = 0;
    if (currentSlide) resetSlide(currentSlide);
  }

  function scrollToSlide(slide) {
    if (!slide) return;
    // Scroll relative to container
    const top = slide.offsetTop - 20; // optional offset
    heroSection.scrollTo({
      top: top,
      behavior: "smooth",
    });
  }

  function playSlide(slide) {
    stopCurrent();
    if (!slide) return;

    currentSlide = slide;
    time = 0;

    const progress = slide.querySelector(".progress");
    const playIcon = slide.querySelector(".play-icon");
    const pauseIcon = slide.querySelector(".pause-icon");
    const src = slide.dataset.src;
    if (!src) return;

    audio.src = src;
    audio.muted = false;

    function updateProgress() {
      time += 0.1;
      if (time > SONG_DURATION) time = SONG_DURATION;
      const percent = (time / SONG_DURATION) * 100;
      if (progress) progress.style.width = `${percent}%`;

      if (time >= SONG_DURATION) {
        nextSlide();
      }
    }

    function play() {
      if (playIcon) playIcon.style.display = "none";
      if (pauseIcon) pauseIcon.style.display = "block";
      audio.play();
      interval = setInterval(updateProgress, 100);
      scrollToSlide(slide);
    }

    function pause() {
      if (playIcon) playIcon.style.display = "block";
      if (pauseIcon) pauseIcon.style.display = "none";
      audio.pause();
      clearInterval(interval);
    }

    const toggleBtn = slide.querySelector(".play-icon, .pause-icon")?.parentElement;
    if (toggleBtn) {
      toggleBtn.onclick = (e) => {
        e.stopPropagation();
        if (audio.paused) play();
        else pause();
      };
    }

    const progressWrapper = progress?.parentElement;
    if (progressWrapper) {
      progressWrapper.onclick = (e) => {
        const rect = progressWrapper.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percent = clickX / width;
        audio.currentTime = percent * SONG_DURATION;
        time = audio.currentTime;
        progress.style.width = `${percent * 100}%`;
      };
    }

    play();
  }

  function nextSlide() {
    const currentIndex = Array.from(slides).indexOf(currentSlide);
    const nextIndex = (currentIndex + 1) % slides.length;
    const next = slides[nextIndex];

    // Delay slightly to allow scroll animation
    setTimeout(() => playSlide(next), 200);
  }

  slides.forEach((slide) => {
    const toggleBtn = slide.querySelector(".play-icon, .pause-icon")?.parentElement;
    if (toggleBtn) {
      toggleBtn.onclick = () => playSlide(slide);
    }
  });
})();
(function () {
  if (window.innerWidth > 420) return;

  const slides = document.querySelectorAll(".hero-slide");
  const heroSection = document.querySelector(".hero-section");
  const SONG_DURATION = 15;
  const audio = new Audio();
  let intervalId = null;
  let currentSlide = null;
  let time = 0;
  let isDragging = false;

  function resetSlide(slide) {
    if (!slide) return;
    const progress = slide.querySelector(".progress");
    if (progress) progress.style.width = "0%";
  }

  function stopCurrent() {
    clearInterval(intervalId);
    intervalId = null;
    audio.pause();
    audio.currentTime = 0;
    if (currentSlide) resetSlide(currentSlide);
  }

  function nextSlide() {
    const currentIndex = Array.from(slides).indexOf(currentSlide);
    const nextIndex = (currentIndex + 1) % slides.length;
    setTimeout(() => playSlide(slides[nextIndex], true), 300);
  }

  function startInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      if (isDragging) return;
      time += 0.1;
      if (time > SONG_DURATION) time = SONG_DURATION;
      const progress = currentSlide?.querySelector(".progress");
      if (progress) progress.style.width = `${(time / SONG_DURATION) * 100}%`;
      if (time >= SONG_DURATION) {
        clearInterval(intervalId);
        intervalId = null;
        nextSlide();
      }
    }, 100);
  }

  // scroll is optional — only used when tapping another slide
  function playSlide(slide, scroll = false) {
    stopCurrent();
    if (!slide) return;

    currentSlide = slide;
    time = 0;

    const src = slide.dataset.src;
    if (!src) return;

    audio.src = src;
    audio.load();
    audio.play().catch(() => {});
    startInterval();

    if (scroll) {
      heroSection.scrollTo({ top: slide.offsetTop, behavior: "smooth" });
    }
  }

  // ── Draggable progress bar (attached once per slide) ──────────
  slides.forEach((slide) => {
    const progressBar = slide.querySelector(".progress-bar");
    const progress = slide.querySelector(".progress");
    if (!progressBar) return;

    function seekTo(clientX) {
      if (slide !== currentSlide) return;
      const rect = progressBar.getBoundingClientRect();
      const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      time = percent * SONG_DURATION;
      audio.currentTime = time;
      if (progress) progress.style.width = `${percent * 100}%`;
    }

    progressBar.addEventListener(
      "touchstart",
      (e) => {
        isDragging = true;
        seekTo(e.touches[0].clientX);
      },
      { passive: true },
    );

    progressBar.addEventListener(
      "touchmove",
      (e) => {
        if (!isDragging) return;
        seekTo(e.touches[0].clientX);
      },
      { passive: true },
    );

    progressBar.addEventListener("touchend", () => {
      isDragging = false;
    });

    progressBar.addEventListener("mousedown", (e) => {
      isDragging = true;
      seekTo(e.clientX);
      function onMove(e) {
        seekTo(e.clientX);
      }
      function onUp() {
        isDragging = false;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      }
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    });
  });

  // ── Tap-to-toggle ─────────────────────────────────────────────
  slides.forEach((slide) => {
    slide.addEventListener("click", (e) => {
      if (e.target.closest(".progress-bar, button")) return;

      if (currentSlide === slide) {
        if (audio.paused) {
          audio.play().catch(() => {});
          startInterval();
        } else {
          audio.pause();
          clearInterval(intervalId);
          intervalId = null;
        }
      } else {
        playSlide(slide, true); // scroll only when switching slides
      }
    });
  });

  // Auto-start first slide (no scroll)
  if (slides.length > 0) playSlide(slides[0], false);
})();
