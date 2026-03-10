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

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove 'active' from all buttons
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      
      sections.forEach(section => {
        const category = section.dataset.category;

        if (filter === "all") {
          section.style.display = "block";
        } else {
          // Show only matching categories
          section.style.display = (category === filter) ? "block" : "none";
        }
      });
    });
  });
});
