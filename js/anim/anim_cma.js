// ES_SLIDES: CMA-ES (44-46)
const AnimCMA = {
    s44_wstep(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            ESHelpers.text(ctx, '👑', w / 2 - 20, h * 0.15, '#000', '40px Roboto'); ESHelpers.text(ctx, 'CMA-ES', w / 2 - 50, h * 0.25, '#000', 'bold 28px Roboto'); ESHelpers.text(ctx, 'Covariance Matrix Adaptation', w / 2 - 130, h * 0.32, '#666', '16px Roboto');
            const rotation = frame * 0.02; ctx.save(); ctx.translate(w / 2, h * 0.6); ctx.rotate(rotation);
            ctx.beginPath(); ctx.ellipse(0, 0, 100, 40, 0, 0, Math.PI * 2); ctx.strokeStyle = '#D00'; ctx.lineWidth = 4; ctx.stroke();
            for (let i = 0; i < 10; i++) { const angle = i * Math.PI * 2 / 10, rx = (Math.random() * 0.8 + 0.1) * 80, ry = (Math.random() * 0.8 + 0.1) * 30; ctx.beginPath(); ctx.arc(Math.cos(angle) * rx, Math.sin(angle) * ry, 4, 0, Math.PI * 2); ctx.fillStyle = '#D00'; ctx.fill(); }
            ctx.restore();
            ESHelpers.text(ctx, 'Macierz C adaptuje kształt mutacji!', w / 2 - 130, h - 20, '#000', 'bold 14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['CMA-ES', 'KRÓL ES', 'ADAPTACJA C']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s45_macierz(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            ctx.save(); ctx.translate(w / 2, h / 2); ctx.rotate(Math.PI / 4);
            for (let r = 20; r < 200; r += 30) { ctx.beginPath(); ctx.ellipse(0, 0, r * 2, r * 0.3, 0, 0, Math.PI * 2); ctx.strokeStyle = '#E0E0E0'; ctx.lineWidth = 1; ctx.stroke(); }
            ctx.restore();
            const rotation = frame * 0.01, targetRotation = Math.PI / 4, currentRotation = rotation % (Math.PI * 2), adaptedRotation = currentRotation + (targetRotation - currentRotation) * 0.02;
            ctx.save(); ctx.translate(w / 2, h / 2); ctx.rotate(adaptedRotation); const stretch = 1 + Math.abs(Math.sin(frame * 0.02)) * 0.5;
            ctx.beginPath(); ctx.ellipse(0, 0, 60 * stretch, 25, 0, 0, Math.PI * 2); ctx.strokeStyle = '#D00'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
            ESHelpers.circle(ctx, w / 2, h / 2, 6, '#0A0');
            ESHelpers.text(ctx, 'Elipsa dopasowuje się do doliny!', w / 2 - 120, h - 20, '#000', 'bold 14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['MACIERZ C', 'KSZTAŁT', 'ADAPTACJA']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s46_sciezka(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const path = []; let x = w * 0.2, y = h * 0.8;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            ESHelpers.circle(ctx, w * 0.75, h * 0.3, 10, '#0A0');
            const dx = w * 0.75 - x, dy = h * 0.3 - y, dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 10) { x += dx * 0.02 + ESHelpers.randNorm(0, 3); y += dy * 0.02 + ESHelpers.randNorm(0, 3); if (frame % 5 === 0) { path.push({ x, y }); if (path.length > 50) path.shift(); } }
            if (path.length > 1) { ctx.beginPath(); ctx.moveTo(path[0].x, path[0].y); path.forEach(p => ctx.lineTo(p.x, p.y)); ctx.strokeStyle = 'rgba(0,0,200,0.5)'; ctx.lineWidth = 2; ctx.stroke(); }
            ESHelpers.circle(ctx, x, y, 8, '#D00');
            if (path.length > 5) { const startIdx = Math.max(0, path.length - 10), vx = path[path.length - 1].x - path[startIdx].x, vy = path[path.length - 1].y - path[startIdx].y;
                ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + vx * 0.5, y + vy * 0.5); ctx.strokeStyle = '#D00'; ctx.lineWidth = 4; ctx.stroke(); ESHelpers.text(ctx, '→', x + vx * 0.5 - 10, y + vy * 0.5 + 5, '#D00', 'bold 20px Roboto'); }
            if (dist < 10 && frame % 300 === 0) { x = w * 0.2; y = h * 0.8; path.length = 0; }
            ESHelpers.text(ctx, 'Ścieżka pamięta kierunek ruchu', w / 2 - 110, h - 20, '#000', 'bold 14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['EVOLUTION PATH', 'PAMIĘĆ RUCHU', 'PRZYSPIESZENIE']);
            return requestAnimationFrame(draw);
        }
        return draw();
    }
};
if (typeof module !== 'undefined') module.exports = AnimCMA;