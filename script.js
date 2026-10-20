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
    ["Figma", 65, "Gemiddeld"],
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
const form = document.getElementById("form"), status = document.getElementById("status");
form.addEventListener("submit", async e => {
  e.preventDefault();
  status.textContent = "Bezig met versturen...";
  try {
    const r = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
    if (r.ok) { status.textContent = "Bericht verstuurd. Ik reageer zo snel mogelijk."; form.reset(); }
    else throw new Error();
  } catch { status.textContent = "Versturen mislukt. Probeer het later opnieuw of mail me direct."; }
});