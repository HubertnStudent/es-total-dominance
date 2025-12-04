// ES_SLIDES: Reguła 1/5 sukcesu (Slide 8)
const AnimOneFifth = {
    s8_regula(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0, sigma = 50, successCount = 0, totalCount = 0, results = [];
        const maxResults = 20, centerX = w * 0.35, centerY = h / 2;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++;
            ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            ESHelpers.drawIsolines(ctx, centerX, centerY, 150, 30, '#E8E8E8'); ESHelpers.circle(ctx, centerX, centerY, 6, '#0A0');
            ESHelpers.circle(ctx, centerX, centerY + 40, 10, '#000');
            ctx.beginPath(); ctx.arc(centerX, centerY + 40, sigma, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(200,0,0,0.5)'; ctx.lineWidth = 3; ctx.stroke();
            if (frame % 30 === 0) {
                const angle = Math.random() * Math.PI * 2, r = Math.abs(ESHelpers.randNorm(0, sigma * 0.6));
                const testX = centerX + Math.cos(angle) * r, testY = centerY + 40 + Math.sin(angle) * r;
                const oldDist = 40, newDist = Math.sqrt((testX - centerX) ** 2 + (testY - centerY) ** 2);
                const success = newDist < oldDist; results.push({ success, x: testX, y: testY }); if (results.length > maxResults) results.shift();
                totalCount++; if (success) successCount++;
                if (totalCount % 20 === 0) { const rate = successCount / 20; if (rate > 0.2) sigma = Math.min(sigma * 1.22, 120); else if (rate < 0.2) sigma = Math.max(sigma * 0.82, 15); successCount = 0; }
            }
            results.forEach((r, i) => { const alpha = 0.3 + (i / results.length) * 0.5; ctx.globalAlpha = alpha; ESHelpers.circle(ctx, r.x, r.y, 5, r.success ? '#0A0' : '#D00'); }); ctx.globalAlpha = 1;
            const panelX = w * 0.55, panelY = h * 0.15;
            ctx.fillStyle = '#FFF'; ctx.fillRect(panelX, panelY, w * 0.4, h * 0.7); ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.strokeRect(panelX, panelY, w * 0.4, h * 0.7);
            ESHelpers.text(ctx, 'REGUŁA 1/5', panelX + 20, panelY + 30, '#000', 'bold 18px Roboto');
            const rate = results.length > 0 ? results.filter(r => r.success).length / results.length : 0;
            const meterY = panelY + 60, meterW = w * 0.35, meterH = 30;
            ctx.fillStyle = '#EEE'; ctx.fillRect(panelX + 10, meterY, meterW, meterH);
            ctx.fillStyle = 'rgba(0,150,0,0.3)'; ctx.fillRect(panelX + 10 + meterW * 0.15, meterY, meterW * 0.1, meterH);
            const rateColor = rate > 0.2 ? '#00A' : (rate < 0.2 ? '#D00' : '#0A0'); ctx.fillStyle = rateColor; ctx.fillRect(panelX + 10, meterY, meterW * rate, meterH);
            ctx.strokeStyle = '#000'; ctx.strokeRect(panelX + 10, meterY, meterW, meterH);
            ESHelpers.text(ctx, `${(rate * 100).toFixed(0)}%`, panelX + meterW + 20, meterY + 22, rateColor, 'bold 16px Roboto');
            ESHelpers.text(ctx, `σ = ${sigma.toFixed(1)}`, panelX + 20, meterY + 80, '#000', 'bold 20px Roboto');
            const rulesY = meterY + 110;
            ESHelpers.text(ctx, 'ZASADY:', panelX + 20, rulesY, '#000', 'bold 14px Roboto');
            ESHelpers.text(ctx, '> 20% → σ × 1.22', panelX + 20, rulesY + 25, '#00A', '14px Roboto');
            ESHelpers.text(ctx, '= 20% → σ bez zmian', panelX + 20, rulesY + 50, '#0A0', '14px Roboto');
            ESHelpers.text(ctx, '< 20% → σ × 0.82', panelX + 20, rulesY + 75, '#D00', '14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['REGUŁA 1/5', `PRÓBY: ${totalCount}`, `RATE: ${(rate * 100).toFixed(0)}%`]);
            return requestAnimationFrame(draw);
        }
        return draw();
    }
};