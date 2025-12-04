// ES_SLIDES: Mutation details (33-36)
const AnimMutation = {
    s33_gauss2d(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const points = [];
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            if (frame % 5 === 0 && points.length < 200) points.push({ x: w / 2 + ESHelpers.randNorm(0, 60), y: h / 2 + ESHelpers.randNorm(0, 60), age: 0 });
            for (let i = points.length - 1; i >= 0; i--) { points[i].age++; if (points[i].age > 100) points.splice(i, 1); }
            points.forEach(p => { const alpha = 1 - p.age / 100; ctx.globalAlpha = alpha; ESHelpers.circle(ctx, p.x, p.y, 3, '#D00'); }); ctx.globalAlpha = 1;
            ESHelpers.circleStroke(ctx, w / 2, h / 2, 5, '#000', 2);
            [1, 2, 3].forEach(s => { ctx.beginPath(); ctx.arc(w / 2, h / 2, s * 60, 0, Math.PI * 2); ctx.strokeStyle = `rgba(0,0,0,${0.3 / s})`; ctx.lineWidth = 1; ctx.stroke(); ESHelpers.text(ctx, `${s}σ`, w / 2 + s * 60 + 5, h / 2, '#666', '10px Roboto'); });
            ESHelpers.text(ctx, '68% w 1σ, 95% w 2σ, 99.7% w 3σ', w / 2 - 110, h - 20, '#000', '12px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['GAUSS 2D', `PUNKTY: ${points.length}`, 'N(0,σ)']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s34_korelacja(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const leftX = w * 0.25, leftY = h * 0.5;
            ctx.beginPath(); ctx.arc(leftX, leftY, 80, 0, Math.PI * 2); ctx.strokeStyle = '#00A'; ctx.lineWidth = 3; ctx.stroke();
            for (let i = 0; i < 30; i++) { const angle = Math.random() * Math.PI * 2, r = Math.random() * 70; ESHelpers.circle(ctx, leftX + Math.cos(angle) * r, leftY + Math.sin(angle) * r, 3, '#00A'); }
            ESHelpers.text(ctx, 'NIESKORELOWANE', leftX - 60, h * 0.85, '#00A', 'bold 14px Roboto'); ESHelpers.text(ctx, '(koło)', leftX - 20, h * 0.9, '#00A', '12px Roboto');
            const rightX = w * 0.75, rightY = h * 0.5, rotation = frame * 0.01;
            ctx.save(); ctx.translate(rightX, rightY); ctx.rotate(rotation); ctx.scale(2, 0.5); ctx.beginPath(); ctx.arc(0, 0, 60, 0, Math.PI * 2); ctx.restore(); ctx.strokeStyle = '#D00'; ctx.lineWidth = 3; ctx.stroke();
            for (let i = 0; i < 30; i++) { const u = ESHelpers.randNorm(0, 40), v = ESHelpers.randNorm(0, 15), x = u * Math.cos(rotation) - v * Math.sin(rotation), y = u * Math.sin(rotation) + v * Math.cos(rotation); ESHelpers.circle(ctx, rightX + x, rightY + y, 3, '#D00'); }
            ESHelpers.text(ctx, 'SKORELOWANE', rightX - 50, h * 0.85, '#D00', 'bold 14px Roboto'); ESHelpers.text(ctx, '(elipsa rotuje)', rightX - 45, h * 0.9, '#D00', '12px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['KORELACJA', 'KOŁO vs ELIPSA', 'KIERUNKOWOŚĆ']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s35_przyklad711(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const cx = w * 0.4, cy = h * 0.5, scale = 40;
            ESHelpers.drawIsolines(ctx, cx, cy, 150, 30, '#E8E8E8'); ESHelpers.circle(ctx, cx, cy, 6, '#0A0');
            const xPx = cx + (-1.45) * scale, xPy = cy - (-1.95) * scale; ESHelpers.circle(ctx, xPx, xPy, 10, '#00A'); ESHelpers.text(ctx, 'x', xPx + 12, xPy, '#00A', 'bold 14px Roboto');
            const yPx = cx + (-2.35) * scale, yPy = cy - (-2.03) * scale, phase = (frame % 180) / 180;
            if (phase > 0.2) { ctx.setLineDash([5, 5]); ESHelpers.line(ctx, xPx, xPy, yPx, yPy, '#D00', 2); ctx.setLineDash([]); ESHelpers.circle(ctx, yPx, yPy, 10, '#D00'); ESHelpers.text(ctx, 'y', yPx + 12, yPy, '#D00', 'bold 14px Roboto'); }
            const panelX = w * 0.6; ctx.fillStyle = '#FFF'; ctx.fillRect(panelX, h * 0.15, w * 0.35, h * 0.7); ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.strokeRect(panelX, h * 0.15, w * 0.35, h * 0.7);
            ESHelpers.text(ctx, 'PRZYKŁAD 7.11', panelX + 10, h * 0.22, '#000', 'bold 14px Roboto');
            ESHelpers.text(ctx, 'x = [-1.45, -1.95]', panelX + 10, h * 0.32, '#00A', '13px Roboto'); ESHelpers.text(ctx, 'F(x) = -3.91', panelX + 10, h * 0.38, '#00A', '13px Roboto');
            if (phase > 0.2) { ESHelpers.text(ctx, 'y = [-2.35, -2.03]', panelX + 10, h * 0.5, '#D00', '13px Roboto'); ESHelpers.text(ctx, 'F(y) = -7.64', panelX + 10, h * 0.56, '#D00', '13px Roboto'); }
            if (phase > 0.5) { ESHelpers.text(ctx, 'F(y) < F(x)?', panelX + 10, h * 0.68, '#000', 'bold 13px Roboto'); ESHelpers.text(ctx, '-7.64 < -3.91?', panelX + 10, h * 0.74, '#000', '13px Roboto'); ESHelpers.text(ctx, 'TAK → SUKCES', panelX + 10, h * 0.82, '#0A0', 'bold 14px Roboto'); }
            ESHelpers.drawHUD(ctx, w, h, ['PRZYKŁAD 7.11', 'KONKRETNE DANE', phase > 0.5 ? 'SUKCES!' : 'OCENA...']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s36_samoadaptacja(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const phase = (frame % 300) / 300;
            const step1Y = h * 0.25; ctx.fillStyle = phase < 0.33 ? 'rgba(255,0,0,0.2)' : 'rgba(200,200,200,0.2)'; ctx.fillRect(w * 0.1, step1Y - 20, w * 0.8, 50);
            ESHelpers.text(ctx, "σ' = σ · exp(τ·N(0,1))", w * 0.15, step1Y + 10, phase < 0.33 ? '#D00' : '#666', 'bold 16px Roboto'); ESHelpers.text(ctx, 'Najpierw mutujesz ZASIĘG', w * 0.5, step1Y + 10, '#666', '12px Roboto');
            ESHelpers.text(ctx, '↓', w * 0.5, h * 0.38, '#000', 'bold 24px Roboto');
            const step2Y = h * 0.55; ctx.fillStyle = phase >= 0.33 && phase < 0.66 ? 'rgba(0,0,255,0.2)' : 'rgba(200,200,200,0.2)'; ctx.fillRect(w * 0.1, step2Y - 20, w * 0.8, 50);
            ESHelpers.text(ctx, "x' = x + N(0, σ')", w * 0.15, step2Y + 10, phase >= 0.33 && phase < 0.66 ? '#00A' : '#666', 'bold 16px Roboto'); ESHelpers.text(ctx, 'Potem mutujesz X z NOWĄ sigmą', w * 0.5, step2Y + 10, '#666', '12px Roboto');
            ESHelpers.text(ctx, '↓', w * 0.5, h * 0.68, '#000', 'bold 24px Roboto');
            const step3Y = h * 0.85; ctx.fillStyle = phase >= 0.66 ? 'rgba(0,200,0,0.2)' : 'rgba(200,200,200,0.2)'; ctx.fillRect(w * 0.1, step3Y - 20, w * 0.8, 50);
            ESHelpers.text(ctx, "Selekcja: (x', σ') vs (x, σ)", w * 0.15, step3Y + 10, phase >= 0.66 ? '#0A0' : '#666', 'bold 16px Roboto'); ESHelpers.text(ctx, 'Strategia ewoluuje razem z X!', w * 0.5, step3Y + 10, '#666', '12px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['SAMOADAPTACJA', phase < 0.33 ? 'KROK 1: σ' : phase < 0.66 ? 'KROK 2: x' : 'KROK 3: SEL', 'KOLEJNOŚĆ!']);
            return requestAnimationFrame(draw);
        }
        return draw();
    }
};
if (typeof module !== 'undefined') module.exports = AnimMutation;