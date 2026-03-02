document.querySelectorAll(".card-quantity").forEach((el) => {
  el.style.color = el.dataset.colour;
});

document.querySelectorAll(".podcasts").forEach((el) => {
  const hex = el.dataset.colour; // "#85C585"
  if (!hex) return;

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  el.style.setProperty("--border-colour", `rgba(${r}, ${g}, ${b}, 0.6)`);
});
