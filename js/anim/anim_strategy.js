// ES_SLIDES: Strategy (40-43)
const AnimStrategy = {
    s40_eksploracja(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const points = [];
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            if (frame % 10 === 0 && points.length < 50) points.push({ x: Math.random() * w * 0.8 + w * 0.1, y: Math.random() * h * 0.7 + h * 0.1, age: 0 });
            points.forEach(p => p.age++); points.forEach(p => { const alpha = Math.max(0.2, 1 - p.age / 100); ctx.globalAlpha = alpha; ESHelpers.circle(ctx, p.x, p.y, 8, '#D00'); }); ctx.globalAlpha = 1;
            ctx.beginPath(); ctx.arc(w / 2, h / 2, 150, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(200,0,0,0.3)'; ctx.lineWidth = 3; ctx.setLineDash([10, 5]); ctx.stroke(); ctx.setLineDash([]);
            ESHelpers.text(ctx, 'σ = DUŻE', w / 2 - 30, h / 2, '#D00', 'bold 16px Roboto'); ESHelpers.text(ctx, 'EKSPLORACJA: szukaj szeroko!', w / 2 - 110, h - 20, '#000', 'bold 14px Roboto');
            if (points.length > 50) points.shift();
            ESHelpers.drawHUD(ctx, w, h, ['EKSPLORACJA', 'DUŻE σ', 'SZEROKO']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s41_eksploatacja(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            ESHelpers.drawIsolines(ctx, w / 2, h / 2, 150, 30, '#E8E8E8'); ESHelpers.circle(ctx, w / 2, h / 2, 6, '#0A0');
            for (let i = 0; i < 15; i++) { const angle = i * Math.PI * 2 / 15 + frame * 0.01, r = 20 + Math.sin(frame * 0.05 + i) * 5; ESHelpers.circle(ctx, w / 2 + Math.cos(angle) * r, h / 2 + Math.sin(angle) * r, 6, '#00A'); }
            ctx.beginPath(); ctx.arc(w / 2, h / 2, 40, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(0,0,200,0.5)'; ctx.lineWidth = 2; ctx.stroke();
            ESHelpers.text(ctx, 'σ = MAŁE', w / 2 - 30, h / 2 + 60, '#00A', 'bold 14px Roboto'); ESHelpers.text(ctx, 'EKSPLOATACJA: szlifuj optimum!', w / 2 - 120, h - 20, '#000', 'bold 14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['EKSPLOATACJA', 'MAŁE σ', 'GŁĘBOKO']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s42_pulapki(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            ctx.beginPath(); ctx.moveTo(0, h * 0.3);
            for (let x = 0; x <= w; x += 5) { const t = x / w, y1 = Math.exp(-Math.pow((t - 0.3) * 10, 2)) * 0.4, y2 = Math.exp(-Math.pow((t - 0.75) * 10, 2)) * 0.6, y = h * 0.3 + (1 - Math.max(y1, y2)) * h * 0.5; ctx.lineTo(x, y); }
            ctx.strokeStyle = '#000'; ctx.lineWidth = 3; ctx.stroke();
            ESHelpers.circle(ctx, w * 0.3, h * 0.5, 8, '#FA0'); ESHelpers.text(ctx, 'LOCAL', w * 0.3 - 25, h * 0.45, '#FA0', 'bold 12px Roboto');
            ESHelpers.circle(ctx, w * 0.75, h * 0.4, 10, '#0A0'); ESHelpers.text(ctx, 'GLOBAL', w * 0.75 - 25, h * 0.33, '#0A0', 'bold 12px Roboto');
            const bobble = Math.sin(frame * 0.1) * 5; ESHelpers.circle(ctx, w * 0.3 + bobble, h * 0.5, 10, '#D00');
            if (frame % 60 < 30) ESHelpers.text(ctx, '⚠ UTKNĄŁ!', w * 0.3 - 30, h * 0.6, '#D00', 'bold 16px Roboto');
            ESHelpers.text(ctx, 'Gradient = 0, ale to nie global!', w / 2 - 110, h - 20, '#000', '14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['PUŁAPKA', 'LOKALNE MIN.', 'GRADIENT = 0']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s43_restart(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0, phase = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const cycleFrame = frame % 300;
            if (cycleFrame < 100) phase = 0; else if (cycleFrame < 150) phase = 1; else phase = 2;
            ESHelpers.circle(ctx, w * 0.25, h * 0.3, 12, '#0A0'); ESHelpers.text(ctx, 'BEST', w * 0.25 - 20, h * 0.25, '#0A0', 'bold 12px Roboto');
            ESHelpers.drawIsolines(ctx, w * 0.6, h * 0.5, 150, 30, '#E8E8E8');
            if (phase === 0) { for (let i = 0; i < 5; i++) ESHelpers.circle(ctx, w * 0.6 + (i - 2) * 15, h * 0.5, 8, '#D00'); ESHelpers.text(ctx, 'STAGNACJA', w * 0.55, h * 0.7, '#D00', 'bold 16px Roboto'); }
            else if (phase === 1) { ctx.fillStyle = 'rgba(255,255,0,0.3)'; ctx.fillRect(0, 0, w, h); ESHelpers.text(ctx, '⟳ RESTART!', w / 2 - 50, h / 2, '#000', 'bold 24px Roboto'); }
            else { for (let i = 0; i < 5; i++) { const x = Math.random() * w * 0.6 + w * 0.3, y = Math.random() * h * 0.6 + h * 0.2; ESHelpers.circle(ctx, x, y, 8, '#00A'); } ESHelpers.text(ctx, 'NOWA POPULACJA', w * 0.5, h * 0.85, '#00A', 'bold 14px Roboto'); }
            ESHelpers.text(ctx, 'Restart: zachowaj best, zresetuj resztę', w / 2 - 130, h - 15, '#000', '12px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['RESTART', phase === 0 ? 'STAGNACJA' : phase === 1 ? 'RESET!' : 'NOWY START', 'ZACHOWAJ BEST']);
            return requestAnimationFrame(draw);
        }
        return draw();
    }
};
if (typeof module !== 'undefined') module.exports = AnimStrategy;