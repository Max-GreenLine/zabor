// Генератор img/sketch.svg — карандашный набросок забора в перспективе.
// Запуск: node gen-sketch.mjs  (детерминирован: один и тот же seed -> один и тот же рисунок)
import { writeFileSync } from "fs";

const W = 900, H = 680;
const INK = "#3B4045";
let seed = 47;
const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
const R = (a, b) => a + rnd() * (b - a);
const lerp = (a, b, t) => a + (b - a) * t;
const out = [];

// «карандашная» линия: ломаная с дрожанием, 1-2 прохода
function line(x1, y1, x2, y2, { w = 1.6, op = .75, passes = 2, jit = 1.5 } = {}) {
  const segs = Math.max(2, Math.round(Math.hypot(x2 - x1, y2 - y1) / 30));
  for (let p = 0; p < passes; p++) {
    const ox = R(-jit, jit), oy = R(-jit, jit);
    let d = `M${(x1 + ox).toFixed(1)} ${(y1 + oy).toFixed(1)}`;
    for (let i = 1; i <= segs; i++) {
      const t = i / segs;
      d += ` L${(lerp(x1, x2, t) + ox + R(-jit, jit)).toFixed(1)} ${(lerp(y1, y2, t) + oy + R(-jit, jit)).toFixed(1)}`;
    }
    out.push(`<path d="${d}" stroke-width="${(w * R(.7, 1.15)).toFixed(2)}" opacity="${(op * R(.65, 1)).toFixed(2)}"/>`);
  }
}
// кустистый скраббл для крон деревьев
function blob(cx, cy, rx, ry, op = .5) {
  let d = "", n = Math.round(R(14, 20));
  for (let i = 0; i <= n; i++) {
    const a = i / n * Math.PI * 2;
    const x = cx + Math.cos(a) * rx * R(.75, 1.15), y = cy + Math.sin(a) * ry * R(.7, 1.2);
    d += (i ? ` Q${(cx + Math.cos(a - .3) * rx * R(1, 1.35)).toFixed(1)} ${(cy + Math.sin(a - .3) * ry * R(1, 1.4)).toFixed(1)} ` : "M") + `${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  out.push(`<path d="${d}" stroke-width="1.1" opacity="${op.toFixed(2)}"/>`);
}

const VP = { x: 300, y: 262 };            // точка схода
const x0 = 878, y0 = 640, h0 = 330;       // ближний столб

// горизонт
line(30, 263, 870, 258, { w: 1, op: .3, passes: 1 });

// дорога слева к точке схода
line(40, H - 12, VP.x - 26, VP.y + 6, { w: 1.2, op: .4 });
line(215, H - 12, VP.x + 2, VP.y + 4, { w: 1.2, op: .4 });
for (let k = 1; k < 9; k++) { // разметка-намёки
  const t = 1 - Math.pow(.72, k);
  const xm = lerp(128, VP.x - 12, t), ym = lerp(H - 14, VP.y + 5, t);
  line(xm - 14 * (1 - t), ym, xm + 14 * (1 - t), ym - 2 * (1 - t), { w: 1.2, op: .3, passes: 1 });
}

// деревья на горизонте (слева и у точки схода)
for (const [cx, cy, rx, ry] of [[86, 240, 52, 22], [175, 246, 38, 16], [258, 244, 46, 19], [330, 248, 30, 13], [402, 250, 26, 11]]) blob(cx, cy, rx, ry, R(.35, .5));

// домики справа за забором
for (const [hx, hy, hw, hh] of [[600, 258, 74, 40], [700, 258, 96, 52], [806, 258, 58, 34]]) {
  line(hx, hy, hx, hy - hh, { w: 1.1, op: .5 }); line(hx + hw, hy, hx + hw, hy - hh, { w: 1.1, op: .5 });
  line(hx, hy - hh, hx + hw * .5, hy - hh - hh * .45, { w: 1.1, op: .55 }); line(hx + hw * .5, hy - hh - hh * .45, hx + hw, hy - hh, { w: 1.1, op: .55 });
  line(hx, hy, hx + hw, hy, { w: 1, op: .4, passes: 1 });
  line(hx + hw * .35, hy, hx + hw * .35, hy - hh * .5, { w: .9, op: .35, passes: 1 }); // окно-намёк
}

// ЗАБОР: столбы + 3 прожилины в перспективе
const rails = [.26, .55, .86];
for (const f of rails) {
  const tEnd = .965;
  line(x0, y0 - h0 * f, lerp(x0, VP.x, tEnd), lerp(y0, VP.y, tEnd) - h0 * (1 - tEnd) * f, { w: 2.1, op: .8 });
  line(x0, y0 - h0 * f + 6, lerp(x0, VP.x, tEnd), lerp(y0, VP.y, tEnd) - h0 * (1 - tEnd) * f + 6 * (1 - tEnd), { w: 1.2, op: .5, passes: 1 }); // нижняя грань доски
}
for (let k = 0; k < 26; k++) {
  const t = 1 - Math.pow(.868, k);
  if (t > .955) break;
  const x = lerp(x0, VP.x, t), yb = lerp(y0, VP.y, t), h = h0 * (1 - t);
  line(x, yb, x, yb - h, { w: 3.2 * (1 - t) + .7, op: .85 });
  if (h > 40) line(x + 4 * (1 - t) + 1, yb - 2, x + 4 * (1 - t) + 1, yb - h + 2, { w: 1, op: .4, passes: 1 }); // грань столба
  if (h > 26) line(x - 7 * (1 - t) - 2, yb + 2, x + 9 * (1 - t) + 2, yb + 3, { w: 1.4, op: .5, passes: 1 });   // земля у столба
}

// трава: пучки, гуще к низу и краям
for (let i = 0; i < 300; i++) {
  const x = R(15, 885);
  const y = H - Math.pow(rnd(), 1.7) * (H - 285);
  // не рисуем поверх полотна дороги
  const tRoad = (H - 12 - y) / (H - 12 - VP.y - 5);
  if (tRoad >= 0 && tRoad < 1 && x > lerp(40, VP.x - 26, tRoad) && x < lerp(215, VP.x + 2, tRoad)) continue;
  const s = (y - 265) / (H - 265) * 13 + 2.5;
  const n = Math.round(R(2, 4));
  for (let j = 0; j < n; j++) {
    const dx = R(-s * .7, s * .7);
    line(x, y, x + dx, y - R(s * .6, s * 1.2), { w: .9, op: R(.25, .5), passes: 1, jit: .6 });
  }
}

// птицы
for (const [bx, by, bs] of [[500, 90, 11], [545, 105, 8], [610, 76, 12]]) {
  line(bx - bs, by, bx, by - bs * .55, { w: 1.1, op: .5, passes: 1 });
  line(bx, by - bs * .55, bx + bs, by, { w: 1.1, op: .5, passes: 1 });
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
<g fill="none" stroke="${INK}" stroke-linecap="round">
${out.join("\n")}
</g>
</svg>`;
writeFileSync(new URL("./img/sketch.svg", import.meta.url), svg);
console.log("img/sketch.svg:", (svg.length / 1024).toFixed(1), "KB,", out.length, "strokes");
