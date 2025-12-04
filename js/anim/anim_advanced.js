// ES_SLIDES: Advanced (21-22)
const AnimAdvanced = {
    s21_genotyp(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const boxY = h * 0.3, boxH = 60, boxW = 80, startX = w * 0.15;
            ESHelpers.text(ctx, 'GENOTYP = (x, σ)', w / 2 - 80, h * 0.15, '#000', 'bold 22px Roboto');
            ESHelpers.text(ctx, 'x = wektor rozwiązania', startX, boxY, '#00A', 'bold 16px Roboto');
            for (let i = 0; i < 4; i++) { const val = (Math.sin(frame * 0.03 + i) * 2).toFixed(1); ctx.fillStyle = '#00A'; ctx.fillRect(startX + i * (boxW + 10), boxY + 20, boxW, boxH); ESHelpers.text(ctx, `x${i + 1}=${val}`, startX + i * (boxW + 10) + 10, boxY + 55, '#FFF', 'bold 14px Roboto'); }
            const sigmaY = h * 0.6; ESHelpers.text(ctx, 'σ = wektor kroków mutacji', startX, sigmaY, '#D00', 'bold 16px Roboto');
            for (let i = 0; i < 4; i++) { const val = (0.5 + Math.abs(Math.sin(frame * 0.02 + i)) * 1.5).toFixed(2); ctx.fillStyle = '#D00'; ctx.fillRect(startX + i * (boxW + 10), sigmaY + 20, boxW, boxH); ESHelpers.text(ctx, `σ${i + 1}=${val}`, startX + i * (boxW + 10) + 8, sigmaY + 55, '#FFF', 'bold 14px Roboto'); }
            ESHelpers.text(ctx, 'Każda współrzędna ma WŁASNE σ!', w / 2 - 130, h - 30, '#000', 'bold 16px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['GENOTYP', '(x, σ)', 'ADAPTACJA']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s22_lognormal(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            ESHelpers.text(ctx, 'MUTACJA LOG-NORMALNA', w / 2 - 120, h * 0.1, '#000', 'bold 20px Roboto');
            ESHelpers.text(ctx, "σ' = σ × exp(τ × N(0,1))", w / 2 - 100, h * 0.22, '#D00', 'bold 18px Roboto'); ESHelpers.text(ctx, "x' = x + σ' × N(0,1)", w / 2 - 80, h * 0.32, '#00A', 'bold 18px Roboto');
            const graphX = w * 0.15, graphW = w * 0.7, graphY = h * 0.75, graphH = h * 0.3;
            ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(graphX, graphY - graphH); ctx.lineTo(graphX, graphY); ctx.lineTo(graphX + graphW, graphY); ctx.stroke();
            ESHelpers.text(ctx, 'P(σ\')', graphX - 40, graphY - graphH / 2, '#000', '12px Roboto'); ESHelpers.text(ctx, "σ'", graphX + graphW / 2, graphY + 20, '#000', '14px Roboto');
            ctx.beginPath(); const sigma = 1, tau = 0.2 + Math.sin(frame * 0.02) * 0.1;
            for (let i = 0; i <= 100; i++) { const s = 0.1 + i * 0.04, x = graphX + (s / 4.1) * graphW, logS = Math.log(s), pdf = Math.exp(-logS * logS / (2 * tau * tau)) / (s * tau * Math.sqrt(2 * Math.PI)), y = graphY - pdf * graphH * 3; if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
            ctx.strokeStyle = '#D00'; ctx.lineWidth = 3; ctx.stroke();
            ctx.beginPath(); ctx.moveTo(graphX + graphW * 0.24, graphY); ctx.lineTo(graphX + graphW * 0.24, graphY - graphH); ctx.strokeStyle = '#0A0'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]); ctx.stroke(); ctx.setLineDash([]);
            ESHelpers.text(ctx, 'σ=1', graphX + graphW * 0.24 - 15, graphY + 15, '#0A0', 'bold 12px Roboto');
            ESHelpers.text(ctx, 'Skośny rozkład: σ > 0 zawsze!', w / 2 - 110, h - 15, '#000', '14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['LOG-NORMAL', 'τ STERUJE', 'σ > 0']);
            return requestAnimationFrame(draw);
        }
        return draw();
    }
};
if (typeof module !== 'undefined') module.exports = AnimAdvanced;