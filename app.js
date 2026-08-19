/* ===== Заборы на сваях — данные и логика (v0, мок-данные) =====
   Всё, что меняется по контенту, — в блоке DATA. Вёрстку трогать не нужно. */

const DATA = {
  phone: "+7 (904) 613-65-30",
  heroPrice: 4000,                       // одна цифра на общем первом экране
  geo: "Сыктывкар и 50 км вокруг",
  deadline: "30 сентября",              // договоры на монтаж в этом сезоне
  season: "2026",

  /* ---- виды заборов. id = значение параметра ?vid= ---- */
  vids: {
    proflist: {
      tab: "Профлист",
      title: "Забор из <span>профлиста</span> на винтовых сваях",
      h3: "Профлист",
      sub: "Глухой, ветроустойчивый, самый популярный. На сваях — ниже промерзания, забор не поведёт.",
      price: 6000, from: true,
      priceCap: "калитка +10 000 ₽ · распашные ворота +30 000 ₽ · откатные +70 000 ₽",
      desc: "Закрывает участок полностью — от глаз, ветра и собак соседей. Лист с полимерным покрытием, цвет любой из палитры RAL.",
      spec: [["Основание", "винтовые сваи 1,8 м или забивные столбы"], ["Лаги", "2 ряда, профтруба"], ["Лист", "С8/С20, полимерное покрытие"], ["Шаг столбов", "2,5 м"]],
      fit: ["глухой забор", "шумная дорога рядом", "хочу приватность"],
      photo: "case4-1.jpg",
      qLabel: "Профлист", qSmall: "самый частый"
    },
    shtaketnik: {
      tab: "Штакетник",
      title: "Забор из <span>евроштакетника</span> на винтовых сваях",
      h3: "Евроштакетник",
      sub: "Красиво, продувается, не «коробка». Одно- или двухрядный, любой цвет.",
      price: 6500, from: true,
      priceCap: "один ряд · калитка +10 000 ₽ · распашные ворота +30 000 ₽ · откатные +70 000 ₽",
      desc: "Смотрится дороже профлиста, участок остаётся светлым и проветривается. Двухрядный (в шахматном порядке) — почти глухой, но без «коробки».",
      spec: [["Основание", "винтовые сваи 1,8 м или забивные столбы"], ["Лаги", "2 ряда, профтруба"], ["Планка", "П-образная, полимерное покрытие"], ["Зазор", "по желанию: 2–5 см или шахматка"]],
      fit: ["фасадная сторона", "садовый участок", "нужен свет и воздух"],
      photo: "case1-1.jpg",
      qLabel: "Штакетник", qSmall: "красиво и продувается"
    },
    rabica: {
      tab: "Рабица",
      title: "Забор из <span>сетки-рабицы</span> на винтовых сваях",
      h3: "Сетка-рабица",
      sub: "Самый бюджетный вариант. Между соседями, по меже, вокруг дачи.",
      price: 4500, from: true, postsOnly: true,
      priceCap: "калитка +10 000 ₽ · распашные ворота +30 000 ₽ · откатные +70 000 ₽",
      desc: "Оцинкованная или с ПВХ-покрытием, в натяг или секциями. Для рабицы почти всегда хватает забивных столбов — сваи здесь избыточны, советуем не переплачивать.",
      spec: [["Основание", "забивные столбы (сваи — по желанию)"], ["Сетка", "ячейка 50×50, оцинк./ПВХ"], ["Натяжка", "прут или трос сверху и снизу"], ["Шаг столбов", "2,5–3 м"]],
      fit: ["межа с соседями", "дачный участок", "минимальный бюджет"],
      photo: "case5-1.jpg",
      qLabel: "Рабица", qSmall: "бюджетно"
    }
  },
  gateSwing: 30000, gateSlide: 70000, wicket: 10000,
  life: 25,                              // MOCK: срок службы, лет
  /* ---- основание: коэффициент к цене за метр ---- */
  postsDelta: 1500,                     // забивные столбы дешевле свай на столько ₽/м.п.
  tech: {
    svai:  { label: "Винтовые сваи, 1,8 м", small: "надёжнее", delta: 0 },
    posts: { label: "Забивные столбы", small: "дешевле", delta: -1500 }
  },
  vidOrder: ["proflist", "shtaketnik", "rabica"],

  /* ---- работы: реальные объекты из папки «Кейсы» ---- */
  works: [
    { vid: "shtaketnik", photos: 3, where: "Морово, СНТ «Авиатор»", when: "июль 2025", m: 25, h: 2, base: "свайный",
      title: "Евроштакетник 2 м, откатные ворота и калитка",
      list: ["Винтовые сваи", "Откатные ворота", "Калитка"], total: 270000 },
    { vid: "shtaketnik", photos: 4, where: "Эжвинские дачи, СНТ «Черёмушки»", when: "июль 2026", m: 21, h: 1.5, base: "забивной",
      title: "Евроштакетник 1,5 м, распашные ворота и калитка",
      list: ["Забивные столбы", "Распашные ворота", "Калитка"], total: 135000 },
    { vid: "shtaketnik", photos: 6, where: "Сыктывкар, ул. Жакова", when: "июль 2026", m: 20, h: 1.7, base: "готовый фундамент",
      title: "Евроштакетник 1,7 м на готовом фундаменте, откатные ворота",
      list: ["Монтаж на ленту и кирпичные столбы заказчика", "Откатные ворота", "Калитка"], total: 270000 },
    { vid: "proflist", photos: 7, where: "Сыктывкар, ул. Ручейная", when: "июнь 2026", m: 64, h: 2, base: "свайный",
      title: "Профлист 2 м, откатные ворота и калитка",
      list: ["Винтовые сваи", "Откатные ворота", "Калитка"], total: 600000 },
    { vid: "rabica", photos: 3, where: "Выльгорт", when: "май 2026", m: 70, h: 1.8, base: "забивной",
      title: "Сетка-рабица 1,8 м, с калиткой",
      list: ["Забивные столбы", "Калитка", "Без ворот"], total: 210000 }
  ],

  /* ---- квиз ---- */
  quiz: {
    length: [["до 30 м", 25], ["30–60 м", 45], ["60–100 м", 80], ["больше 100 м", 120]],
    heightMult: [[1.2, .88], [1.5, .92], [1.8, 1], [2, 1], [2.5, 1.12]],  // опорные точки множителя цены
    gates: [["Ничего, только забор", 0], ["Калитка", 10000], ["Распашные ворота + калитка", 40000], ["Откатные ворота + калитка", 80000]],
    where: [["Сыктывкар / Эжва", 0], ["До 20 км от города", 0], ["20–50 км", 0]]
  }
};

/* ================== логика ================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = n => n.toLocaleString("ru-RU");
const fmtK = n => Math.round(n / 1000) + " тыс.";
const imgSrc = n => (window.CASE_IMG && window.CASE_IMG[n]) || (n.endsWith(".svg") ? "img/" : "img/cases/") + n;   // в артефакте картинки вшиты
const postsPrice = v => v.price - DATA.postsDelta;
const priceStr = v => `${v.from ? "от " : ""}${fmt(v.price)} ₽ / м.п.`;
const priceLines = v => `<span class="pl"><b>${v.from ? "от " : ""}${fmt(postsPrice(v))} ₽</b> / м.п. на забивных столбах${v.postsOnly ? " — рекомендуем" : ""}</span><span class="pl"><b>${v.from ? "от " : ""}${fmt(v.price)} ₽</b> / м.п. на винтовых сваях</span>`;

/* --- определить vid: ?vid= → #vid= → localStorage (панель прототипа) → общий --- */
function detectVid() {
  const q = new URLSearchParams(location.search).get("vid");
  const h = (location.hash.match(/vid=(\w+)/) || [])[1];
  const s = localStorage.getItem("proto-vid");
  const v = q || h || s;
  return DATA.vids[v] ? v : null;
}
let currentVid = detectVid();          // null = общий запрос
let activeTab = currentVid || "proflist";

/* --- первый экран --- */
function renderHero() {
  const v = currentVid ? DATA.vids[currentVid] : null;
  $("#hero-title").innerHTML = v ? v.title : "Заборы на винтовых сваях <span>под ключ</span> в Сыктывкаре";
  $("#hero-sub").textContent = v ? v.sub : "Профлист, евроштакетник, рабица. Сваи закручиваем ниже промерзания — забор не поведёт весной. Цена фиксируется в договоре.";
  const p = v || DATA.vids.proflist;
  $("#hero-price").textContent = `от ${fmt(v ? postsPrice(v) : DATA.heroPrice)} ₽ / м.п.`;
  $("#hero-price-cap").textContent = "за погонный метр готового забора под ключ";
}

/* --- табы видов --- */
function renderTabs() {
  const tabs = $("#tabs"); tabs.innerHTML = "";
  DATA.vidOrder.forEach(id => {
    const b = document.createElement("button");
    b.className = "tab"; b.role = "tab"; b.textContent = DATA.vids[id].tab;
    b.setAttribute("aria-selected", id === activeTab);
    b.onclick = () => { activeTab = id; renderTabs(); renderKinds(); };
    tabs.appendChild(b);
  });
}
function renderKinds() {
  const box = $("#kinds"); box.innerHTML = "";
  DATA.vidOrder.forEach(id => {
    const v = DATA.vids[id];
    const el = document.createElement("article");
    el.className = "kind"; if (id === activeTab) el.dataset.active = "";
    el.innerHTML = `
      <div class="kind-photo"><img src="${imgSrc(v.photo)}" alt="${v.h3}" loading="lazy"></div>
      <div class="kind-body">
        <h3>${v.h3}</h3>
        <div class="kind-price">${priceLines(v)}<span class="cap">${v.priceCap}</span></div>
        <p>${v.desc}</p>
        <dl class="spec">${v.spec.map(([k, val]) => `<dt>${k}</dt><dd>${val}</dd>`).join("")}</dl>
        <div class="kind-fit">${v.fit.map(f => `<span>${f}</span>`).join("")}</div>
        <button class="btn btn-primary" data-popup="calc" data-vid="${id}" data-source="kind-${id}" data-title="Рассчитать ${v.tab.toLowerCase()}">Рассчитать ${v.tab.toLowerCase()}</button>
      </div>`;
    box.appendChild(el);
  });
}

/* --- работы --- */
function renderWorks() {
  const box = $("#works"); box.innerHTML = "";
  // если пришли по конкретному виду — его работы первыми
  const list = DATA.works.map((w, i) => ({ ...w, id: i + 1 })).sort((a, b) => (b.vid === currentVid) - (a.vid === currentVid));
  list.forEach(w => {
    const el = document.createElement("article"); el.className = "work";
    const gates = w.list.filter(x => /ворота|калитк/i.test(x)).length;
    el.innerHTML = `
      <div class="work-photo" data-id="${w.id}" data-n="${w.photos}" data-i="1">
        <img src="${imgSrc(`case${w.id}-1.jpg`)}" alt="${w.title} — ${w.where}" loading="lazy">
        ${w.photos > 1 ? `<button class="work-prev" aria-label="предыдущее фото">‹</button><button class="work-next" aria-label="следующее фото">›</button><span class="work-count">1 / ${w.photos}</span>` : ""}
        <span class="work-base">${w.base}</span>
      </div>
      <div class="work-body">
        <div class="work-meta"><span>${w.where}</span><span>${w.when}</span></div>
        <h3>${w.title}</h3>
        <ul class="work-list"><li>${w.m} м.п. × ${String(w.h).replace(".", ",")} м</li>${w.list.map(i => `<li>${i}</li>`).join("")}</ul>
        <div class="work-total"><b>${fmt(w.total)} ₽</b><span>≈ ${fmt(Math.round(w.total / w.m / 10) * 10)} ₽/м.п.${gates ? " с воротами" : ""}</span></div>
      </div>`;
    box.appendChild(el);
  });
  const cta = document.createElement("article"); cta.className = "work work-cta";
  cta.innerHTML = `<div class="work-cta-body"><h3>Тут будет ваш забор</h3><p>Посёлок — ваш, цена — честная. Фото добавим сюда после монтажа.</p><button class="btn btn-primary" data-popup="contact" data-source="works" data-title="Начнём с бесплатного замера" data-btn="Записаться на замер">Хочу так же</button></div>`;
  box.appendChild(cta);
  $$(".work-photo").forEach(ph => {
    const step = d => {
      const n = +ph.dataset.n; let i = (+ph.dataset.i + d - 1 + n) % n + 1; ph.dataset.i = i;
      ph.querySelector("img").src = imgSrc(`case${ph.dataset.id}-${i}.jpg`);
      ph.querySelector(".work-count").textContent = `${i} / ${n}`;
    };
    ph.querySelector(".work-prev")?.addEventListener("click", () => step(-1));
    ph.querySelector(".work-next")?.addEventListener("click", () => step(1));
  });
}

/* --- квиз --- */
function hMult(h) {
  const pts = DATA.quiz.heightMult;
  if (h <= pts[0][0]) return pts[0][1];
  for (let i = 1; i < pts.length; i++) if (h <= pts[i][0]) {
    const [x1, y1] = pts[i - 1], [x2, y2] = pts[i];
    return y1 + (y2 - y1) * (h - x1) / (x2 - x1);
  }
  return pts[pts.length - 1][1];
}
const quiz = { step: currentVid ? 1 : 0, a: { vid: currentVid || null, tech: null, length: null, height: null, gates: null, where: null, channel: "tg" } };
const STEPS = ["vid", "tech", "length", "height", "gates", "where", "contact"];
const N = STEPS.length;
function estimate() {
  const v = DATA.vids[quiz.a.vid || "proflist"];
  const L = DATA.quiz.length[quiz.a.length ?? 1][1];
  const H = hMult(quiz.a.height ?? 1.8);
  const G = DATA.quiz.gates[quiz.a.gates ?? 0][1];
  const W = DATA.quiz.where[quiz.a.where ?? 0][1];
  const D = quiz.a.tech ? DATA.tech[quiz.a.tech].delta : 0;
  const base = (v.price + D) * L * H + G + W;
  return [base * 0.95, base * 1.1];   // вилка: длина в квизе приблизительная
}
function renderQuiz() {
  const root = $("#quiz-body"); const s = STEPS[quiz.step];
  $("#quiz-step").textContent = quiz.step < N - 1 ? `шаг ${quiz.step + 1} из ${N}` : "последний шаг";
  $("#quiz-bar").style.width = ((quiz.step + 1) / N * 100) + "%";
  const opts = (key, arr, cols) => `<div class="opts ${cols ? "cols-2" : ""}">${arr.map(([lbl, , small], i) =>
    `<button class="opt" aria-pressed="${quiz.a[key] === i}" data-k="${key}" data-i="${i}">${lbl}${small ? `<small>${small}</small>` : ""}</button>`).join("")}</div>`;
  let html = "";
  if (s === "vid") {
    html = `<div class="quiz-q">Какой забор хотите?</div><div class="opts">${DATA.vidOrder.map(id =>
      `<button class="opt" aria-pressed="${quiz.a.vid === id}" data-vid="${id}">${DATA.vids[id].qLabel}<small>${DATA.vids[id].qSmall}</small></button>`).join("")}</div>`;
  } else if (s === "tech") {
    html = `<div class="quiz-q">На чём ставим столбы?</div><div class="quiz-fine">Сваи — ниже промерзания, забор не поведёт. Столбы — дешевле, но со временем может потребовать подравнивания.</div><div class="opts">${Object.entries(DATA.tech).map(([id, t]) =>
      `<button class="opt" aria-pressed="${quiz.a.tech === id}" data-tech="${id}">${t.label}<small>${t.small}</small></button>`).join("")}</div>`;
  } else if (s === "length") {
    html = `<div class="quiz-q">Какая длина забора?</div><div class="quiz-fine">Примерно — точную снимет замерщик, бесплатно</div>${opts("length", DATA.quiz.length, true)}`;
  } else if (s === "height") {
    if (quiz.a.height == null) quiz.a.height = 1.8;
    html = `<div class="quiz-q">Высота забора?</div>
      <div class="hslider">
        <output id="h-out">${quiz.a.height.toFixed(1).replace(".", ",")} м</output>
        <input type="range" id="h-range" min="1.2" max="2.5" step="0.1" value="${quiz.a.height}" aria-label="Высота забора, метров">
        <div class="hslider-scale"><span>1,2</span><span>1,8</span><span>2,5</span></div>
      </div>`;
  } else if (s === "gates") {
    html = `<div class="quiz-q">Ворота и калитка нужны?</div>${opts("gates", DATA.quiz.gates, false)}`;
  } else if (s === "where") {
    html = `<div class="quiz-q">Где участок?</div>${opts("where", DATA.quiz.where, false)}`;
  } else {
    const CH = [["tg", "В Telegram"], ["max", "В MAX"], ["call", "Позвоните мне"]];
    html = `<div class="quiz-est"><b>Готово — считаем вашу смету</b><span>Куда прислать расчёт?</span></div>
      <div class="opts ch-opts">${CH.map(([id, lbl]) =>
        `<button class="opt" aria-pressed="${quiz.a.channel === id}" data-ch="${id}">${lbl}</button>`).join("")}</div>
      <div class="field"><label for="q-phone">${quiz.a.channel === "call" ? "Телефон — перезвоним с расчётом" : "Номер, привязанный к мессенджеру"}</label><input id="q-phone" type="tel" inputmode="tel" placeholder="+7 ___ ___-__-__" autocomplete="tel"></div>
      <button class="btn btn-primary btn-block" id="q-send">Получить расчёт</button>
      <div class="quiz-fine">Точную смету посчитаем после бесплатного замера и зафиксируем в договоре. Никакого спама.</div>`;
  }
  root.innerHTML = html;
  $("#quiz-back").style.visibility = quiz.step > 0 ? "visible" : "hidden";
  const next = $("#quiz-next");
  next.style.display = (s === "contact") ? "none" : "";
  next.disabled = quiz.a[s] == null;

  $$(".opt[data-vid]", root).forEach(b => b.onclick = () => { quiz.a.vid = b.dataset.vid; go(1); });
  const hr = $("#h-range", root);
  if (hr) hr.oninput = () => { quiz.a.height = +hr.value; $("#h-out").textContent = quiz.a.height.toFixed(1).replace(".", ",") + " м"; };
  $$(".opt[data-ch]", root).forEach(b => b.onclick = () => {
    quiz.a.channel = b.dataset.ch;
    const phone = $("#q-phone").value;
    renderQuiz(); $("#q-phone").value = phone;
  });
  $$(".opt[data-tech]", root).forEach(b => b.onclick = () => { quiz.a.tech = b.dataset.tech; go(1); });
  $$(".opt[data-k]", root).forEach(b => b.onclick = () => { quiz.a[b.dataset.k] = +b.dataset.i; go(1); });
  const send = $("#q-send"); if (send) send.onclick = () => {
    const ph = $("#q-phone").value.replace(/\D/g, "");
    if (ph.length < 10) { $("#q-phone").focus(); $("#q-phone").style.borderColor = "var(--accent)"; return; }
    const msg = quiz.a.channel === "call" ? "Перезвоним с расчётом в течение 15 минут в рабочее время (9:00–20:00)."
      : `Пришлём расчёт в ${quiz.a.channel === "tg" ? "Telegram" : "MAX"} в течение 15 минут в рабочее время (9:00–20:00).`;
    root.innerHTML = `<div class="quiz-done"><b>Спасибо! Смета уже считается.</b><span>${msg}</span><span class="mock">mock: заявка никуда не отправлена</span></div>`;
    $("#quiz-back").style.visibility = "hidden";
  };
}
function go(d) { quiz.step = Math.max(0, Math.min(N - 1, quiz.step + d)); renderQuiz(); }

/* --- попап --- */
const overlay = $("#overlay");
let popupSource = "";
function openPopup(mode, o = {}) {
  popupSource = o.source || "";
  $("#modal-title").textContent = o.title || (mode === "calc" ? "Смета за минуту" : "Оставьте контакт");
  $("#modal-calc").hidden = mode !== "calc";
  const form = $("#modal-contact");
  form.hidden = mode !== "contact";
  $("#c-done").hidden = true;
  if (mode === "contact") { $("#c-comment-wrap").style.display = o.comment ? "" : "none"; $('#modal-contact button[type="submit"]').textContent = o.btn || "Отправить"; }
  if (mode === "calc") { if (o.vid && DATA.vids[o.vid]) { quiz.a.vid = o.vid; if (quiz.step === 0) quiz.step = 1; } renderQuiz(); }
  overlay.hidden = false; document.body.style.overflow = "hidden";
  const f = mode === "contact" ? $("#c-name") : null; if (f) f.focus();
}
function closePopup() { overlay.hidden = true; document.body.style.overflow = ""; }
function bindPopup() {
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-popup]");
    if (b) openPopup(b.dataset.popup, { title: b.dataset.title, source: b.dataset.source, vid: b.dataset.vid, comment: !!b.dataset.comment, btn: b.dataset.btn });
  });
  $("#modal-close").onclick = closePopup;
  overlay.addEventListener("click", e => { if (e.target === overlay) closePopup(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !overlay.hidden) closePopup(); });
  $("#modal-contact").addEventListener("submit", e => {
    e.preventDefault();
    const ph = $("#c-phone").value.replace(/\D/g, "");
    if (ph.length < 10) { $("#c-phone").focus(); return; }
    // popupSource — источник кнопки, уйдёт в заявку при подключении бэкенда
    $("#modal-contact").hidden = true; $("#c-done").hidden = false;
  });
}

/* --- финальная форма --- */
function bindFinal() {
  $("#f-send").onclick = e => {
    e.preventDefault();
    const ph = $("#f-phone").value.replace(/\D/g, "");
    if (ph.length < 10) { $("#f-phone").focus(); return; }
    $("#final-form").innerHTML = `<div class="form-ok">Заявка принята. Перезвоним в течение 15 минут.</div><span class="mock">mock: заявка никуда не отправлена</span>`;
  };
}

/* --- панель прототипа --- */
function renderProto() {
  const box = $("#proto-opts"); box.innerHTML = "";
  [["", "общий запрос"], ...DATA.vidOrder.map(id => [id, "?vid=" + id])].forEach(([id, lbl]) => {
    const b = document.createElement("button");
    b.textContent = lbl; b.setAttribute("aria-pressed", (currentVid || "") === id);
    b.onclick = () => { if (id) localStorage.setItem("proto-vid", id); else localStorage.removeItem("proto-vid");
      const u = new URL(location.href); u.search = id ? "?vid=" + id : ""; u.hash = ""; location.href = u.href; };
    box.appendChild(b);
  });
}

/* --- init --- */
document.addEventListener("DOMContentLoaded", () => {
  $$("[data-phone]").forEach(el => { if (!el.hasAttribute("data-keep")) el.textContent = DATA.phone; el.href = "tel:" + DATA.phone.replace(/\D/g, ""); });
  $$("[data-deadline]").forEach(el => el.textContent = DATA.deadline);
  $$("[data-num]").forEach(el => el.textContent = DATA[el.dataset.num]);
  const hp = $("#hero-photo-img"); if (hp) hp.src = imgSrc("case3-6.jpg");
  renderHero(); renderTabs(); renderKinds(); renderWorks(); renderQuiz(); bindFinal(); bindPopup(); renderProto();
  $("#quiz-back").onclick = () => go(-1);
  $("#quiz-next").onclick = () => go(1);
});
