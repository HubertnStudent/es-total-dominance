// ES_SLIDES: Constraints (26-27)
const AnimConstraints = {
    s26_kara(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const boxX = w * 0.3, boxY = h * 0.25, boxW = w * 0.4, boxH = h * 0.5;
            ctx.fillStyle = 'rgba(0,200,0,0.2)'; ctx.fillRect(boxX, boxY, boxW, boxH); ctx.strokeStyle = '#0A0'; ctx.lineWidth = 3; ctx.strokeRect(boxX, boxY, boxW, boxH);
            ESHelpers.text(ctx, 'DOPUSZCZALNE', boxX + boxW / 2 - 50, boxY + boxH / 2, '#0A0', 'bold 14px Roboto');
            const insideX = boxX + boxW * 0.3, insideY = boxY + boxH * 0.5; ESHelpers.circle(ctx, insideX, insideY, 12, '#0A0'); ESHelpers.text(ctx, '✓', insideX - 8, insideY + 6, '#FFF', 'bold 14px Roboto');
            const outsideX = boxX - 50 + Math.sin(frame * 0.05) * 10, outsideY = boxY + boxH * 0.3; ESHelpers.circle(ctx, outsideX, outsideY, 12, '#D00'); ESHelpers.text(ctx, '✗', outsideX - 6, outsideY + 5, '#FFF', 'bold 14px Roboto');
            ctx.beginPath(); ctx.moveTo(outsideX, outsideY - 20); ctx.lineTo(outsideX, outsideY - 60); ctx.strokeStyle = '#D00'; ctx.lineWidth = 3; ctx.stroke();
            ESHelpers.text(ctx, 'KARA: f → ∞', outsideX - 40, outsideY - 70, '#D00', 'bold 14px Roboto');
            ESHelpers.text(ctx, 'Poza ograniczeniami = śmierć (fitness = ∞)', w / 2 - 160, h - 20, '#000', '14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['OGRANICZENIA', 'METODA KARY', 'f → ∞']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s27_naprawa(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0, pointX = w * 0.15, pointY = h * 0.3, targetX = w * 0.3;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const boxX = w * 0.3, boxY = h * 0.2, boxW = w * 0.4, boxH = h * 0.6;
            ctx.fillStyle = 'rgba(0,200,0,0.2)'; ctx.fillRect(boxX, boxY, boxW, boxH); ctx.strokeStyle = '#0A0'; ctx.lineWidth = 3; ctx.strokeRect(boxX, boxY, boxW, boxH);
            const cycleFrame = frame % 180;
            if (cycleFrame < 60) { pointX = w * 0.15; targetX = boxX; } else if (cycleFrame < 120) { pointX += (targetX - pointX) * 0.1; } else { pointX = boxX; }
            if (cycleFrame > 30) { ctx.globalAlpha = 0.3; ESHelpers.circle(ctx, w * 0.15, h * 0.3, 10, '#D00'); ctx.globalAlpha = 1; }
            if (cycleFrame > 30 && cycleFrame < 120) { ctx.beginPath(); ctx.moveTo(w * 0.15, h * 0.3); ctx.lineTo(pointX, pointY); ctx.strokeStyle = '#00A'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]); ctx.stroke(); ctx.setLineDash([]); }
            const col = pointX >= boxX ? '#0A0' : '#D00'; ESHelpers.circle(ctx, pointX, pointY, 12, col);
            if (cycleFrame > 100) ESHelpers.text(ctx, 'NAPRAWIONO!', pointX + 20, pointY, '#0A0', 'bold 14px Roboto');
            ESHelpers.text(ctx, 'Naprawa: przesunięcie na najbliższy brzeg', w / 2 - 150, h - 20, '#000', '14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['OGRANICZENIA', 'METODA NAPRAWY', 'PROJEKCJA']);
            return requestAnimationFrame(draw);
        }
        return draw();
    }
};
if (typeof module !== 'undefined') module.exports = AnimConstraints;