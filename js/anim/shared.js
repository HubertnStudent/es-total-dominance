// ES_SLIDES: Shared helpers for all animations
const ESHelpers = {
    setupCanvas(canvasId) {
        const c = document.getElementById(canvasId);
        if (!c) return null;
        const dpr = window.devicePixelRatio || 1;
        const parent = c.parentElement;
        let rect = c.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) rect = parent ? parent.getBoundingClientRect() : rect;
        let w = rect.width || 500;
        let h = rect.height || 350;
        c.width = w * dpr;
        c.height = h * dpr;
        c.style.width = w + 'px';
        c.style.height = h + 'px';
        const ctx = c.getContext('2d');
        ctx.scale(dpr, dpr);
        return { ctx, w, h, canvas: c };
    },
    clear(ctx, w, h) { ctx.clearRect(0, 0, w, h); },
    circle(ctx, x, y, r, color) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill(); },
    circleStroke(ctx, x, y, r, color, lw = 2) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.stroke(); },
    line(ctx, x1, y1, x2, y2, color, lw = 2) { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.stroke(); },
    text(ctx, txt, x, y, color = '#000', font = '16px Roboto') { ctx.fillStyle = color; ctx.font = font; ctx.fillText(txt, x, y); },
    randNorm(mean = 0, std = 1) { let u = 0, v = 0; while (u === 0) u = Math.random(); while (v === 0) v = Math.random(); return mean + std * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v); },
    drawIsolines(ctx, cx, cy, maxR, step, color = '#DDD') { ctx.strokeStyle = color; ctx.lineWidth = 1; for (let r = step; r < maxR; r += step) { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke(); } },
    drawHUD(ctx, w, h, items) { const padding = 10; ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(padding, padding, 150, items.length * 22 + 10); ctx.fillStyle = '#FFF'; ctx.font = '14px monospace'; items.forEach((txt, i) => { ctx.fillText(txt, padding + 8, padding + 20 + i * 22); }); },
    lerpColor(c1, c2, t) { const r1 = parseInt(c1.slice(1, 3), 16), g1 = parseInt(c1.slice(3, 5), 16), b1 = parseInt(c1.slice(5, 7), 16); const r2 = parseInt(c2.slice(1, 3), 16), g2 = parseInt(c2.slice(3, 5), 16), b2 = parseInt(c2.slice(5, 7), 16); const r = Math.round(r1 + (r2 - r1) * t), g = Math.round(g1 + (g2 - g1) * t), b = Math.round(b1 + (b2 - b1) * t); return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`; }
};