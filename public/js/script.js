// color functionals
document.querySelectorAll(".card-quantity").forEach((el) => {
  el.style.color = el.dataset.colour;
});

document.querySelectorAll(".podcasts").forEach((el) => {
  let hex = el.dataset.colour;
  hex = hex.replace(/"/g, "").trim();
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  el.style.setProperty("--colour-r", r);
  el.style.setProperty("--colour-g", g);
  el.style.setProperty("--colour-b", b);
});
// slider logic
document.querySelectorAll(".section").forEach((section) => {
  const container = section.querySelector(".card-container");
  const viewport = section.querySelector(".cards-viewport");
  const leftBtn = section.querySelector(".arrow-left");
  const rightBtn = section.querySelector(".arrow-right");

  if (!container || !leftBtn || !rightBtn || !viewport) return;

  const gap = 11; // match your CSS
  let step = 0;

  function calculateStep() {
    const card = container.querySelector(".card");
    if (!card) return;
    step = card.offsetWidth + gap;
  }

  function updateArrows() {
    const maxScroll = container.scrollWidth - viewport.clientWidth;

    // No scrolling needed
    if (maxScroll <= 0) {
      leftBtn.disabled = true;
      rightBtn.disabled = true;
      leftBtn.classList.remove("active");
      rightBtn.classList.remove("active");
      return;
    }

    // Left arrow
    if (viewport.scrollLeft <= 0) {
      leftBtn.disabled = true;
      leftBtn.classList.remove("active");
    } else {
      leftBtn.disabled = false;
      leftBtn.classList.add("active");
    }

    // Right arrow
    if (viewport.scrollLeft >= maxScroll - 1) {
      rightBtn.disabled = true;
      rightBtn.classList.remove("active");
    } else {
      rightBtn.disabled = false;
      rightBtn.classList.add("active");
    }
  }

  function scrollRight() {
    viewport.scrollBy({ left: step, behavior: "smooth" });
    setTimeout(updateArrows, 310); // wait for smooth scroll to update
  }

  function scrollLeft() {
    viewport.scrollBy({ left: -step, behavior: "smooth" });
    setTimeout(updateArrows, 310);
  }

  rightBtn.addEventListener("click", scrollRight);
  leftBtn.addEventListener("click", scrollLeft);

  window.addEventListener("resize", () => {
    calculateStep();
    updateArrows();
  });

  calculateStep();
  updateArrows();
});

// mix background logic
document.querySelectorAll(".mix").forEach((card) => {
  const color = card.dataset.color;
  if (color) {
    card.style.backgroundColor = color;
  }
});

// your mix background logic
document.querySelectorAll(".mix").forEach((card) => {
  const color = card.dataset.color;
  if (color) {
    card.style.backgroundColor = color;
  }
});

//cancel button
document.querySelectorAll(".cancel").forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = this.closest(".card");
    if (card) {
      card.style.display = "none";
    }
  });
});
//friends activity
const toggleBtn = document.getElementById("friendsToggle");
const closeBtn = document.getElementById("friends-close");
const panel = document.getElementById("friendsPanel");

toggleBtn?.addEventListener("click", (e) => {
  e.preventDefault();

  panel?.classList.toggle("active");
  toggleBtn.classList.toggle("active");
});

closeBtn?.addEventListener("click", () => {
  panel?.classList.remove("active");
  toggleBtn?.classList.remove("active");
});

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const sections = document.querySelectorAll("section.section");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove 'active' from all buttons
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      sections.forEach((section) => {
        const category = section.dataset.category;

        if (filter === "all") {
          section.style.display = "block";
        } else {
          // Show only matching categories
          section.style.display = category === filter ? "block" : "none";
        }
      });
    });
  });
});
// player logic
const audio = document.getElementById("audio");

const progressWrappers = document.querySelectorAll(".music-player-progress-wrapper");
const progressFills = document.querySelectorAll(".music-player-progress-fill");

const currentTimeEl = document.querySelector(".music-player-time-current");
const totalTimeEl = document.querySelector(".music-player-time-total");

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

audio.addEventListener("loadedmetadata", () => {
  totalTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;

  // update ALL progress bars
  progressFills.forEach((fill) => {
    fill.style.width = `${percent}%`;
  });

  currentTimeEl.textContent = formatTime(audio.currentTime);
});

/* PLAY BUTTONS */

const playBtns = document.querySelectorAll(".music-player-btn");

let isPlaying = false;

playBtns.forEach((btn) => {
  const playIcon = btn.querySelector(".play-icon");
  const pauseIcon = btn.querySelector(".pause-icon");

  btn.addEventListener("click", () => {
    if (!isPlaying) {
      audio.play();
      isPlaying = true;

      playBtns.forEach((b) => {
        b.querySelector(".play-icon").style.display = "none";
        b.querySelector(".pause-icon").style.display = "block";
      });
    } else {
      audio.pause();
      isPlaying = false;

      playBtns.forEach((b) => {
        b.querySelector(".play-icon").style.display = "block";
        b.querySelector(".pause-icon").style.display = "none";
      });
    }
  });
});

/* SEEKING */

let isDragging = false;
let activeWrapper = null;

function updateAudioTime(e, wrapper) {
  const rect = wrapper.getBoundingClientRect();

  let offsetX = e.clientX - rect.left;
  offsetX = Math.max(0, Math.min(offsetX, rect.width));

  const percent = offsetX / rect.width;

  audio.currentTime = percent * audio.duration;
}

// add events to ALL progress bars
progressWrappers.forEach((wrapper) => {
  wrapper.addEventListener("click", (e) => {
    updateAudioTime(e, wrapper);
  });

  wrapper.addEventListener("mousedown", (e) => {
    isDragging = true;
    activeWrapper = wrapper;
    updateAudioTime(e, wrapper);
  });
});

window.addEventListener("mousemove", (e) => {
  if (isDragging && activeWrapper) {
    updateAudioTime(e, activeWrapper);
  }
});

window.addEventListener("mouseup", () => {
  isDragging = false;
  activeWrapper = null;
});
