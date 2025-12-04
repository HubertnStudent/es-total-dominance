// ES_SLIDES: Multi-objective (47-49)
const AnimMO = {
    s47_wstep(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            ESHelpers.line(ctx, 50, h - 50, w - 50, h - 50, '#000', 2); ESHelpers.line(ctx, 50, h - 50, 50, 50, '#000', 2);
            ESHelpers.text(ctx, 'koszt', w - 80, h - 30, '#000', '14px Roboto'); ESHelpers.text(ctx, 'jakość', 60, 60, '#000', '14px Roboto');
            const x1 = 100 + frame * 0.5 % 200, y1 = h - 80 - x1 * 0.3; ESHelpers.circle(ctx, x1, y1, 8, '#D00'); ESHelpers.text(ctx, 'MIN koszt', x1 + 15, y1, '#D00', '12px Roboto');
            const x2 = 300 - frame * 0.3 % 150, y2 = 100 + x2 * 0.2; ESHelpers.circle(ctx, x2, y2, 8, '#00D'); ESHelpers.text(ctx, 'MAX jakość', x2 + 15, y2, '#00D', '12px Roboto');
            ESHelpers.text(ctx, '⚡ KONFLIKT CELÓW!', w / 2 - 80, h * 0.4, '#000', 'bold 16px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['MULTI-OBJECTIVE', '≥2 CELE', 'KONFLIKT']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s48_dominacja(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const points = []; for (let i = 0; i < 20; i++) points.push({ x: Math.random() * (w - 100) + 50, y: Math.random() * (h - 100) + 50 });
        function dominates(a, b) { return a.x <= b.x && a.y <= b.y && (a.x < b.x || a.y < b.y); }
        function isDominated(p) { return points.some(q => dominates(q, p)); }
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            ESHelpers.line(ctx, 50, h - 50, w - 50, h - 50, '#000', 2); ESHelpers.line(ctx, 50, h - 50, 50, 50, '#000', 2);
            ESHelpers.text(ctx, 'f₁ (min)', w - 70, h - 30, '#000', '12px Roboto'); ESHelpers.text(ctx, 'f₂ (min)', 60, 60, '#000', '12px Roboto');
            points.forEach(p => { const dominated = isDominated(p), color = dominated ? '#888' : '#D00'; ESHelpers.circle(ctx, p.x, p.y, 6, color); if (!dominated) { ctx.beginPath(); ctx.arc(p.x, p.y, 10, 0, Math.PI * 2); ctx.strokeStyle = '#D00'; ctx.lineWidth = 2; ctx.stroke(); } });
            if (points.length >= 2) { const a = points[0], b = points[5] || points[1]; ctx.setLineDash([5, 5]); ESHelpers.line(ctx, a.x, a.y, b.x, a.y, '#00F', 1); ESHelpers.line(ctx, b.x, a.y, b.x, b.y, '#00F', 1); ctx.setLineDash([]); if (dominates(a, b)) ESHelpers.text(ctx, 'A dominuje B', w / 2 - 50, 30, '#D00', 'bold 14px Roboto'); }
            ESHelpers.text(ctx, 'Czerwone = niezdominowane (Pareto optimalne)', w / 2 - 140, h - 20, '#000', 'bold 12px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['DOMINACJA', 'PARETO', 'OPTYMALNE']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s49_front(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            ESHelpers.line(ctx, 50, h - 50, w - 50, h - 50, '#000', 2); ESHelpers.line(ctx, 50, h - 50, 50, 50, '#000', 2);
            ctx.beginPath(); ctx.moveTo(60, h - 60); for (let t = 0; t <= 1; t += 0.01) { const fx = 60 + t * (w - 120), fy = h - 60 - (1 - t * t) * (h - 120); ctx.lineTo(fx, fy); } ctx.strokeStyle = '#D00'; ctx.lineWidth = 3; ctx.stroke();
            const numPoints = 8; for (let i = 0; i < numPoints; i++) { const t = i / (numPoints - 1), fx = 60 + t * (w - 120), fy = h - 60 - (1 - t * t) * (h - 120), pulse = Math.sin(frame * 0.03 + i) * 3; ESHelpers.circle(ctx, fx + pulse, fy, 7, '#D00'); }
            const cursor = (frame * 0.01) % 1, cx = 60 + cursor * (w - 120), cy = h - 60 - (1 - cursor * cursor) * (h - 120); ESHelpers.circle(ctx, cx, cy, 12, '#0A0'); ESHelpers.text(ctx, '← WYBÓR', cx + 15, cy, '#0A0', 'bold 12px Roboto');
            ESHelpers.text(ctx, 'Front Pareto = kompromisy', w / 2 - 90, 30, '#000', 'bold 14px Roboto'); ESHelpers.text(ctx, 'Decydent wybiera z frontu', w / 2 - 90, h - 20, '#000', '12px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['PARETO FRONT', 'KOMPROMISY', 'DECYZJA']);
            return requestAnimationFrame(draw);
        }
        return draw();
    }
};
if (typeof module !== 'undefined') module.exports = AnimMO;