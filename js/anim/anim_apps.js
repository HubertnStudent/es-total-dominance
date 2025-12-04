// ES_SLIDES: Applications (50-51)
const AnimApps = {
    s50_aero(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, w, h);
            ctx.save(); ctx.translate(w / 2, h / 2); const morph = Math.sin(frame * 0.02) * 0.3;
            ctx.beginPath(); ctx.moveTo(-120, 0); ctx.bezierCurveTo(-80, -30 - morph * 20, 80, -40 - morph * 30, 120, 0); ctx.bezierCurveTo(80, 10 + morph * 10, -80, 15 + morph * 10, -120, 0); ctx.closePath(); ctx.fillStyle = '#666'; ctx.fill(); ctx.strokeStyle = '#888'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
            for (let i = 0; i < 20; i++) { const baseY = (i - 10) * 20 + h / 2, x = (frame * 3 + i * 30) % (w + 50) - 25, yOffset = Math.abs(baseY - h / 2) < 50 ? -Math.sign(baseY - h / 2) * 20 * Math.sin(x / 80) : 0; ctx.beginPath(); ctx.arc(x, baseY + yOffset, 2, 0, Math.PI * 2); ctx.fillStyle = 'rgba(100,200,255,0.7)'; ctx.fill(); ESHelpers.line(ctx, x - 15, baseY + yOffset, x, baseY + yOffset, 'rgba(100,200,255,0.3)', 1); }
            const lift = 0.8 + morph * 0.2, drag = 0.15 + Math.abs(morph) * 0.05; ESHelpers.text(ctx, `L/D: ${(lift / drag).toFixed(2)}`, 20, 30, '#0F0', 'bold 14px Roboto');
            ESHelpers.text(ctx, 'ES optymalizuje profil skrzydła', w / 2 - 100, h - 20, '#FFF', 'bold 14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['AERODYNAMIKA', 'SKRZYDŁO', 'L/D MAX']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s51_robot(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, w, h);
            ESHelpers.line(ctx, 0, h - 50, w, h - 50, '#555', 3);
            const baseX = w / 2, baseY = h - 50, angle1 = Math.sin(frame * 0.03) * 0.5 + 0.5, angle2 = Math.sin(frame * 0.04 + 1) * 0.8, arm1Len = 80, arm2Len = 60;
            const joint1X = baseX + Math.cos(angle1 - Math.PI / 2) * arm1Len, joint1Y = baseY + Math.sin(angle1 - Math.PI / 2) * arm1Len;
            const endX = joint1X + Math.cos(angle1 + angle2 - Math.PI / 2) * arm2Len, endY = joint1Y + Math.sin(angle1 + angle2 - Math.PI / 2) * arm2Len;
            ctx.lineWidth = 8; ctx.strokeStyle = '#888'; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(baseX, baseY); ctx.lineTo(joint1X, joint1Y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(joint1X, joint1Y); ctx.lineTo(endX, endY); ctx.stroke();
            ESHelpers.circle(ctx, baseX, baseY, 10, '#D00'); ESHelpers.circle(ctx, joint1X, joint1Y, 8, '#D00'); ESHelpers.circle(ctx, endX, endY, 6, '#0F0');
            const targetX = w * 0.7 + Math.sin(frame * 0.02) * 50, targetY = h * 0.4; ctx.beginPath(); ctx.arc(targetX, targetY, 15, 0, Math.PI * 2); ctx.strokeStyle = '#FF0'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]); ctx.stroke(); ctx.setLineDash([]); ESHelpers.text(ctx, '🎯', targetX - 10, targetY + 5, '#FF0', '16px Roboto');
            const dist = Math.sqrt((endX - targetX) ** 2 + (endY - targetY) ** 2); ESHelpers.text(ctx, `błąd: ${dist.toFixed(1)}px`, 20, 30, '#0F0', 'bold 14px Roboto');
            ESHelpers.text(ctx, 'ES optymalizuje trajektorię', w / 2 - 90, h - 20, '#FFF', 'bold 14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['ROBOTYKA', 'MANIPULATOR', 'TRAJEKTORIA']);
            return requestAnimationFrame(draw);
        }
        return draw();
    }
};
if (typeof module !== 'undefined') module.exports = AnimApps;