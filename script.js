/* ==========================================================
   ZONE DE CONFIGURATION : modifie ici les textes et informations.
   Un champ laissé vide ("") est simplement masqué sur le site.
   ========================================================== */
const CONFIG = {
  defunt: {
    nomFamille: "BOSSIKPONNON",
    prenoms: "Nah",
    initiales: "BN",
    dateNaissance: "",
    dateDeces: "21 août 2026",
    age: "dans sa 102ᵉ année",
    hommage: "Une longue vie de foi, de dignité et d’amour, désormais dans la paix du Seigneur."
  },
  famille: "BOSSIKPONNON",
  organisateur: {
    nom: "Pélagie D. KOVENON",
    conjoint: "Rév. Noël M. AHINON",
    conjointTitre: "Président du secteur de Covè / Koguédé"
  },
  histoire: {
    intro: "Plus de cent ans de vie, de courage et de dignité. Une longue route que nous avons eu la grâce de parcourir à ses côtés.",
    etapes: [
      { titre: "Un siècle de vie", texte: "Elle a vu grandir les générations, transmis, aimé et tenu bon. Une longévité rare, que nous recevons comme une bénédiction." },
      { titre: "Ce qu’elle nous laisse", texte: "Des valeurs de respect, de travail et de partage, et une famille rassemblée autour de son souvenir." },
      { titre: "Notre promesse", texte: "Honorer sa mémoire en gardant vivantes les valeurs qu’elle nous a transmises." }
    ],
    cloture: "« L’Éternel est mon berger : je ne manquerai de rien. » Psaume 23:1"
  },
  galerie: ["galerie-1.jpg","galerie-2.jpg"],
  programme: [
    { titre: "Veillée de prière", jour: "Jeudi 29 octobre 2026", heure: "20h00", detail: "Prière et chants animés par la chorale et Asaph de l’église protestante méthodiste." },
    { titre: "Retrait du corps", jour: "Vendredi 30 octobre 2026", heure: "08h00", detail: "À la morgue de Mougnon." },
    { titre: "Réception des invités", jour: "Vendredi 30 octobre 2026", heure: "13h00", detail: "À Domè Houandougon, à côté de l’église protestante méthodiste de Domè." },
    { titre: "Inhumation", jour: "Samedi 31 octobre 2026", heure: "08h00", detail: "Inhumation du corps." }
  ],
  lieu: {
    nom: "Domè Houandougon",
    adresse: "À côté de l’église protestante méthodiste de Domè",
    recherche: "Houandougon, Domè, Bénin"
  },
  infos: [
    { titre: "Tenue",         texte: "Une tenue sobre et digne est souhaitée." },
    { titre: "Horaires",      texte: "Merci d’arriver un peu avant l’heure de chaque moment." },
    { titre: "Stationnement", texte: "Merci de vous garer sans gêner la circulation aux abords du lieu." }
  ],
  contacts: [
    { affiche: "01 97 10 13 25", tel: "+2290197101325" },
    { affiche: "01 97 74 25 58", tel: "+2290197742558" }
  ],
  presence: {
    whatsapp: "2290197101325",
    dateLimite: ""
  },
  remerciement: "La famille remercie chaleureusement toutes les personnes qui lui témoignent leur soutien et leur affection."
};

/* ===================== Code du site ===================== */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const C = CONFIG, D = C.defunt, O = C.organisateur;
const nomComplet = `${D.nomFamille} ${D.prenoms}`;
document.title = `Cérémonies funéraires – ${nomComplet}`;

$("introName").textContent = nomComplet;
$("seal").textContent = D.initiales;
$("heroSmall").textContent = "Cérémonies funéraires";
$("nomF").textContent = D.nomFamille;
$("prenoms").textContent = D.prenoms;
$("tribute").textContent = D.hommage;
$("dates").textContent = [D.dateNaissance && `Née le ${D.dateNaissance}`, `Décédée le ${D.dateDeces} ${D.age}`.trim()].filter(Boolean).join(" – ");
$("invite").textContent = O.conjoint
  ? `${O.nom} et ${O.conjoint}, au nom de la famille ${C.famille}, ont l’honneur de vous inviter à prendre part aux cérémonies funéraires de ${nomComplet}.`
  : `${O.nom}, au nom de la famille ${C.famille}, a l’honneur de vous inviter à prendre part aux cérémonies funéraires de ${nomComplet}.`;

const H = C.histoire;
$("histoireBody").innerHTML = (H.intro ? `<p class="rv">${esc(H.intro)}</p>` : "") +
  H.etapes.filter(e => e.texte).map(e => `<div class="stage rv"><h3>${esc(e.titre)}</h3><p>${esc(e.texte)}</p></div>`).join("") +
  (H.cloture ? `<p class="rv" style="font-family:var(--serif);font-style:italic;font-size:1.3rem">${esc(H.cloture)}</p>` : "");

$("galerieBody").innerHTML = C.galerie.map(src =>
  `<div class="g rv"><img src="${esc(src)}" alt="Photo souvenir" loading="lazy" onerror="this.remove()"></div>`).join("");

$("progBody").innerHTML = C.programme.map(p => `<li class="rv"><p class="t">${esc(p.titre)}</p>
  <p class="h">${esc([p.jour, p.heure].filter(Boolean).join(" à ") || "Horaire à confirmer")}</p>
  ${p.detail ? `<p class="d">${esc(p.detail)}</p>` : ""}</li>`).join("");

const L = C.lieu, q = encodeURIComponent(L.adresse ? `${L.adresse} ${L.recherche}` : L.recherche);
$("lieuBody").innerHTML = `${L.nom ? `<p class="rv" style="font-family:var(--serif);font-size:1.5rem">${esc(L.nom)}</p>` : ""}
  ${L.adresse ? `<p class="rv">${esc(L.adresse)}</p>` : ""}
  <iframe class="map rv" title="Carte du lieu" loading="lazy" src="https://maps.google.com/maps?q=${q}&output=embed"></iframe>
  <a class="btn rv" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=${q}">Ouvrir l’itinéraire</a>`;

$("infosBody").innerHTML = C.infos.filter(i => i.texte).map(i => `<div class="rv"><h3>${esc(i.titre)}</h3><p>${esc(i.texte)}</p></div>`).join("") +
  (C.contacts.length ? `<div class="rv"><h3>Renseignements</h3><p>${C.contacts.map(c => `<a href="tel:${esc(c.tel)}">${esc(c.affiche)}</a>`).join(" &nbsp;/&nbsp; ")}</p></div>` : "");

const P = C.presence;
$("presenceBody").innerHTML = `${P.dateLimite ? `<p class="deadline rv">Merci de répondre avant le ${esc(P.dateLimite)}.</p>` : ""}
  <button class="btn rv" id="rsvpBtn" type="button" aria-expanded="false">Confirmer ma présence</button>
  <form class="form" id="rsvp">
    <label>Nom et prénoms<input name="nom" required autocomplete="name"></label>
    <label>Nombre de personnes<input name="nb" type="number" min="1" value="1" required inputmode="numeric"></label>
    <label>Message à la famille (facultatif)<textarea name="msg" rows="3"></textarea></label>
    <button class="btn" type="submit">Envoyer par WhatsApp</button>
  </form>`;
$("rsvpBtn").onclick = e => { const f = $("rsvp"); const o = f.classList.toggle("open"); e.target.setAttribute("aria-expanded", o); if (o) f.querySelector("input").focus(); };
$("rsvp").onsubmit = e => {
  e.preventDefault(); const f = new FormData(e.target);
  const t = `Bonjour, je confirme ma présence aux cérémonies funéraires de ${nomComplet}.\nNom : ${f.get("nom")}\nNombre de personnes : ${f.get("nb")}` + (f.get("msg") ? `\nMessage : ${f.get("msg")}` : "");
  window.open(`https://wa.me/${P.whatsapp}?text=${encodeURIComponent(t)}`, "_blank", "noopener");
};

$("footInit").textContent = D.initiales;
$("thanks").textContent = C.remerciement;
$("by").textContent = O.conjoint ? `${O.nom} et ${O.conjoint}, pour la famille ${C.famille}` : `${O.nom}, pour la famille ${C.famille}`;
$("heroImg").onerror = e => e.target.remove();

/* Titres mot par mot */
document.querySelectorAll("[data-words]").forEach(el => {
  el.innerHTML = el.textContent.split(" ").map((w, i) => `<span class="w" style="--i:${i}">${esc(w)}</span>`).join(" ");
  el.classList.add("rv-title");
});

/* Apparitions au défilement */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
const watch = () => document.querySelectorAll(".rv,.rv-title").forEach(el => io.observe(el));

/* Profondeur de la galerie */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let tick = false;
function parallax() {
  const vh = innerHeight;
  document.querySelectorAll(".g img").forEach(img => {
    const r = img.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) return;
    img.style.transform = `translateY(${((r.top + r.height / 2 - vh / 2) * -0.07).toFixed(1)}px)`;
  });
  tick = false;
}
if (!reduce) addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(parallax); } }, { passive: true });

/* Ouverture de l’enveloppe */
$("openBtn").onclick = () => {
  $("intro").classList.add("opened");
  setTimeout(() => {
    $("intro").classList.add("done");
    $("site").classList.add("show");
    document.body.classList.remove("locked");
    watch(); parallax();
  }, reduce ? 100 : 2900);
};
