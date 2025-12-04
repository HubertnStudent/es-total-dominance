// ES_SLIDES: Metrics (55-56)
const AnimMetrics = {
    s55_koszt(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0, evals = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            if (frame % 3 === 0) evals++; const displayEvals = evals * 100;
            ESHelpers.text(ctx, 'EWALUACJE', w / 2 - 60, h * 0.25, '#000', 'bold 20px Roboto');
            ctx.fillStyle = '#D00'; ctx.font = 'bold 48px Roboto'; ctx.textAlign = 'center'; ctx.fillText(displayEvals.toLocaleString(), w / 2, h * 0.45); ctx.textAlign = 'left';
            const barWidth = w * 0.6, barHeight = 30, barX = w * 0.2, barY = h * 0.55; ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.strokeRect(barX, barY, barWidth, barHeight);
            const progress = (evals % 100) / 100; ctx.fillStyle = ESHelpers.lerpColor('#0F0', '#D00', progress); ctx.fillRect(barX + 2, barY + 2, (barWidth - 4) * progress, barHeight - 4);
            const breakdown = [{ name: 'Fitness f(x)', pct: 70 }, { name: 'Selekcja', pct: 15 }, { name: 'Mutacja', pct: 10 }, { name: 'Inne', pct: 5 }];
            let yOff = h * 0.7; breakdown.forEach(item => { ESHelpers.text(ctx, `${item.name}: ${item.pct}%`, w * 0.25, yOff, '#000', '12px Roboto'); ctx.fillStyle = '#D00'; ctx.fillRect(w * 0.5, yOff - 10, item.pct * 1.5, 12); yOff += 20; });
            ESHelpers.text(ctx, 'Koszt ≈ λ × (koszt f(x)) × generacje', w / 2 - 130, h - 20, '#000', 'bold 12px Roboto');
            if (evals > 200) evals = 0;
            ESHelpers.drawHUD(ctx, w, h, ['KOSZT', 'EWALUACJE', 'BUDŻET']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s56_odpornosc(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const runs = []; for (let i = 0; i < 5; i++) runs.push({ data: [], color: `hsl(${i * 60}, 70%, 50%)` });
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            ESHelpers.line(ctx, 50, h - 50, w - 30, h - 50, '#000', 2); ESHelpers.line(ctx, 50, h - 50, 50, 30, '#000', 2);
            ESHelpers.text(ctx, 'gen', w - 50, h - 30, '#000', '12px Roboto'); ESHelpers.text(ctx, 'f(x)', 55, 40, '#000', '12px Roboto');
            if (frame % 5 === 0) { runs.forEach((run, i) => { const lastVal = run.data.length > 0 ? run.data[run.data.length - 1] : 100, newVal = Math.max(5, lastVal - Math.random() * 5 - 1 + ESHelpers.randNorm(0, 2 + i)); run.data.push(newVal); if (run.data.length > 80) run.data.shift(); }); }
            runs.forEach((run, runIdx) => { if (run.data.length < 2) return; ctx.beginPath(); run.data.forEach((val, i) => { const x = 50 + i * 4, y = h - 50 - val * 2; if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }); ctx.strokeStyle = run.color; ctx.lineWidth = 2; ctx.stroke(); });
            const finals = runs.map(r => r.data.length > 0 ? r.data[r.data.length - 1] : 100), mean = finals.reduce((a, b) => a + b, 0) / finals.length, std = Math.sqrt(finals.map(v => (v - mean) ** 2).reduce((a, b) => a + b, 0) / finals.length);
            ESHelpers.text(ctx, `μ = ${mean.toFixed(1)}`, w - 100, 50, '#000', 'bold 14px Roboto'); ESHelpers.text(ctx, `σ = ${std.toFixed(1)}`, w - 100, 70, '#000', 'bold 14px Roboto');
            const robust = std < 5 ? '✓ ODPORNY' : '⚠ ZMIENNOŚĆ'; ESHelpers.text(ctx, robust, w - 100, 90, std < 5 ? '#0A0' : '#D00', 'bold 12px Roboto');
            ESHelpers.text(ctx, '5 niezależnych uruchomień → ocena stabilności', w / 2 - 140, h - 20, '#000', 'bold 12px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['ODPORNOŚĆ', '5 RUNS', 'μ±σ']);
            return requestAnimationFrame(draw);
        }
        return draw();
    }
};
if (typeof module !== 'undefined') module.exports = AnimMetrics;