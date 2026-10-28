// Vaardigheden: pas naam, niveau (0-100) en label aan
const skills = {
  "Programmeren": [
    ["HTML & CSS", 85, "Gevorderd"],
    ["JavaScript", 70, "Gemiddeld"],
    ["Python", 60, "Gemiddeld"],
    ["SQL", 55, "Basis+"]
  ],
  "Tools & overig": [
    ["Git & GitHub", 75, "Gevorderd"],
    ["Responsive design", 80, "Gevorderd"],
    ["Godot", 60, "Gemiddeld"]
  ]
};
const box = document.getElementById("skills");
for (const [groep, lijst] of Object.entries(skills)) {
  const g = document.createElement("div");
  g.className = "skills-group";
  g.innerHTML = `<h3>${groep}</h3>` + lijst.map(([n, p, l]) => `
    <div class="skill">
      <div class="skill-top"><span>${n}</span><small>${l}</small></div>
      <div class="track" role="progressbar" aria-valuenow="${p}" aria-valuemin="0" aria-valuemax="100" aria-label="${n}">
        <div class="fill" data-w="${p}"></div>
      </div>
    </div>`).join("");
  box.appendChild(g);
}
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.querySelectorAll(".fill").forEach(f => f.style.width = f.dataset.w + "%"); io.unobserve(e.target); }
}), { threshold: .3 });
io.observe(box);

document.getElementById("jaar").textContent = new Date().getFullYear();

// Contactformulier via Formspree
const form = document.getElementById("form");
const status = document.getElementById("status");

form.addEventListener("submit", e => {
  e.preventDefault();

  const data = new FormData(form);
  const onderwerp = "Contact via portfolio";
  const bericht =
    `Naam: ${data.get("naam")}\n` +
    `E-mailadres: ${data.get("email")}\n\n` +
    `Bericht:\n${data.get("bericht")}`;

  status.textContent =
    "Je e-mailprogramma wordt geopend. Verstuur het bericht daar.";

  window.location.href =
  `mailto:daanabbink@icloud.com?subject=${encodeURIComponent(onderwerp)}&body=${encodeURIComponent(bericht)}`;
});

const visualViewport = window.visualViewport;

function updateFooterPosition() {
  const bottomInset = visualViewport
    ? Math.max(
        0,
        window.innerHeight - visualViewport.height - visualViewport.offsetTop
      )
    : 0;

  document.documentElement.style.setProperty(
    "--browser-bottom-inset",
    `${bottomInset}px`
  );
}

updateFooterPosition();
window.addEventListener("resize", updateFooterPosition);

if (visualViewport) {
  visualViewport.addEventListener("resize", updateFooterPosition);
  visualViewport.addEventListener("scroll", updateFooterPosition);
}