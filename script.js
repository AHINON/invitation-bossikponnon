/* ==========================================================
   ZONE DE CONFIGURATION : modifie ici les textes et informations.
   Un champ laissé vide ("") est simplement masqué sur le site.
   ========================================================== */
const CONFIG = {
  defunt: {
    nomFamille: "BOSSIKPONNON",
    prenoms: "Nah",
    initiales: "BN",
    dateNaissance: "",                    // ex : "3 mars 1925" (vide = masquée)
    dateDeces: "21 août 2026",
    age: "dans sa 102ᵉ année",
    hommage: "Une longue vie de foi, de dignité et d’amour, désormais dans la paix du Seigneur."
  },
  famille: "BOSSIKPONNON",
  organisateur: {
    nom: "Pélagie D. KOVENON",
    conjoint: "Rév. Noël M. AHINON",     // vide = formule adaptée automatiquement
    conjointTitre: "Président du secteur de Covè / Koguédé"
  },
  histoire: {
    intro: "Plus d’un siècle de vie : voici quelques pages d’un parcours que nous portons dans nos cœurs.",
    etapes: [
      { titre: "Ses origines", texte: "Écris ici quelques lignes sur l’enfance et les racines de Maman." },
      { titre: "Sa vie de famille", texte: "Écris ici le mariage, les enfants, les petits-enfants et les arrière-petits-enfants." },
      { titre: "Ses valeurs et ses souvenirs", texte: "Écris ici ce qui la caractérisait : sa foi, son travail, ses mots, ses habitudes." }
    ],
    cloture: "Merci, Maman, pour tout ce que tu nous as transmis."
  },
  galerie: ["galerie-1.jpg","galerie-2.jpg"],   // ajoute d’autres photos ici (4 à 6 recommandées)
  programme: [
    { titre: "Veillée",              jour: "", heure: "", detail: "" },
    { titre: "Cérémonie religieuse", jour: "", heure: "", detail: "" },
    { titre: "Levée du corps",       jour: "", heure: "", detail: "" },
    { titre: "Inhumation",           jour: "", heure: "", detail: "" },
    { titre: "Remerciements",        jour: "", heure: "", detail: "" }
  ],
  lieu: {
    nom: "",                              // ex : "Domicile familial"
    adresse: "",                          // ex : "Quartier X, Covè"
    recherche: "Covè, Bénin"              // texte utilisé pour la carte et l’itinéraire
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
    whatsapp: "2290197101325",            // numéro qui reçoit les confirmations
    dateLimite: ""                        // ex : "10 septembre 2026"
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
