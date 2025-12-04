// ES_SLIDES: Future & Summary (57-60)
const AnimFuture = {
    s57_hybrydy(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, w, h);
            const cx = w / 2, cy = h / 2, esX = cx - 100 + Math.sin(frame * 0.02) * 20; ctx.beginPath(); ctx.arc(esX, cy, 50, 0, Math.PI * 2); ctx.fillStyle = 'rgba(200, 50, 50, 0.6)'; ctx.fill(); ESHelpers.text(ctx, 'ES', esX - 15, cy + 5, '#FFF', 'bold 20px Roboto');
            const gdX = cx + 100 - Math.sin(frame * 0.02) * 20; ctx.beginPath(); ctx.arc(gdX, cy, 50, 0, Math.PI * 2); ctx.fillStyle = 'rgba(50, 50, 200, 0.6)'; ctx.fill(); ESHelpers.text(ctx, 'GD', gdX - 15, cy + 5, '#FFF', 'bold 20px Roboto');
            const overlap = Math.max(0, 50 - Math.abs(esX - gdX) / 2 + 50); if (overlap > 0) { ctx.beginPath(); ctx.arc(cx, cy, overlap, 0, Math.PI * 2); ctx.fillStyle = 'rgba(150, 50, 150, 0.7)'; ctx.fill(); ESHelpers.text(ctx, '⚡', cx - 10, cy + 8, '#FF0', 'bold 24px Roboto'); }
            ESHelpers.text(ctx, 'Strategie Ewolucyjne', w * 0.15, h * 0.2, '#F88', '14px Roboto'); ESHelpers.text(ctx, 'Gradient Descent', w * 0.6, h * 0.2, '#88F', '14px Roboto');
            ESHelpers.text(ctx, 'Hybryda = siła obu metod!', w / 2 - 90, h - 30, '#FFF', 'bold 14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['HYBRYDY', 'ES + GD', 'SYNERGIA']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s58_neuro(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, w, h);
            const layers = [3, 5, 4, 2], layerX = [w * 0.2, w * 0.4, w * 0.6, w * 0.8], nodePositions = [];
            layers.forEach((n, layerIdx) => { const positions = []; for (let i = 0; i < n; i++) positions.push({ x: layerX[layerIdx], y: h / 2 + (i - (n - 1) / 2) * 40 }); nodePositions.push(positions); });
            for (let l = 0; l < nodePositions.length - 1; l++) { nodePositions[l].forEach((from, fi) => { nodePositions[l + 1].forEach((to, ti) => { const weight = Math.sin(frame * 0.03 + fi + ti + l) * 0.5 + 0.5, color = ESHelpers.lerpColor('#333', '#0F0', weight); ESHelpers.line(ctx, from.x, from.y, to.x, to.y, color, weight * 2 + 0.5); }); }); }
            nodePositions.forEach((layer, l) => { layer.forEach((pos, i) => { const activation = Math.sin(frame * 0.05 + i + l) * 0.5 + 0.5, color = ESHelpers.lerpColor('#444', '#0FF', activation); ESHelpers.circle(ctx, pos.x, pos.y, 12, color); }); });
            ESHelpers.text(ctx, 'wejście', w * 0.18, h * 0.1, '#888', '12px Roboto'); ESHelpers.text(ctx, 'wyjście', w * 0.76, h * 0.1, '#888', '12px Roboto');
            ESHelpers.text(ctx, 'ES ewoluuje wagi sieci neuronowej!', w / 2 - 120, h - 30, '#FFF', 'bold 14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['NEURO-EVOLUTION', 'WAGI', 'ES']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s59_podsumowanie(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const items = [{ emoji: '🧬', text: '(1+1) ES - prosty start' }, { emoji: '👥', text: '(μ+λ) - elityzm' }, { emoji: '💀', text: '(μ,λ) - bez stagnacji' }, { emoji: '👑', text: 'CMA-ES - state of the art' }, { emoji: '🌐', text: 'MO - wiele celów' }, { emoji: '🏝️', text: 'Równoległość - wyspy' }];
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            ESHelpers.text(ctx, 'PODSUMOWANIE ES', w / 2 - 100, 40, '#000', 'bold 24px Roboto');
            items.forEach((item, i) => { const delay = i * 30, visible = frame > delay; if (visible) { const alpha = Math.min(1, (frame - delay) / 30); ctx.globalAlpha = alpha; const y = 80 + i * 40, x = w * 0.15, bounce = Math.sin((frame - delay) * 0.1) * 5 * Math.max(0, 1 - (frame - delay) / 30); ESHelpers.text(ctx, item.emoji, x + bounce, y, '#000', '20px Roboto'); ESHelpers.text(ctx, item.text, x + 40, y, '#000', '16px Roboto'); ctx.globalAlpha = 1; } });
            const checkDelay = items.length * 30 + 30; if (frame > checkDelay) items.forEach((_, i) => { const y = 80 + i * 40; if (frame > checkDelay + i * 10) ESHelpers.text(ctx, '✓', w * 0.75, y, '#0A0', 'bold 20px Roboto'); });
            ESHelpers.drawHUD(ctx, w, h, ['PODSUMOWANIE', '6 WARIANTÓW', 'ES']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s60_koniec(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const particles = []; for (let i = 0; i < 50; i++) particles.push({ x: Math.random() * w, y: Math.random() * h, vx: ESHelpers.randNorm(0, 0.5), vy: ESHelpers.randNorm(0, 0.5) - 0.5, size: Math.random() * 4 + 2, hue: Math.random() * 360 });
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; const grad = ctx.createLinearGradient(0, 0, 0, h); grad.addColorStop(0, '#1a1a2e'); grad.addColorStop(1, '#0f0f1a'); ctx.fillStyle = grad; ctx.fillRect(0, 0, w, h);
            particles.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; } if (p.x < -10 || p.x > w + 10) p.x = Math.random() * w; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, 0.6)`; ctx.fill(); });
            const pulse = Math.sin(frame * 0.03) * 5; ctx.textAlign = 'center'; ctx.font = 'bold 48px Roboto'; ctx.fillStyle = '#FFF'; ctx.fillText('DZIĘKUJĘ!', w / 2, h / 2 - 20 + pulse); ctx.font = '24px Roboto'; ctx.fillStyle = '#888'; ctx.fillText('Strategie Ewolucyjne', w / 2, h / 2 + 30); ctx.font = '16px Roboto'; ctx.fillStyle = '#666'; ctx.fillText('Pytania?', w / 2, h / 2 + 70); ctx.textAlign = 'left';
            const emojis = ['🧬', '🔬', '🎯', '🏆', '🚀']; emojis.forEach((e, i) => { const angle = (frame * 0.01 + i / emojis.length) * Math.PI * 2, r = 100 + Math.sin(frame * 0.02 + i) * 20, ex = w / 2 + Math.cos(angle) * r, ey = h / 2 + Math.sin(angle) * r; ESHelpers.text(ctx, e, ex - 12, ey + 8, '#FFF', '24px Roboto'); });
            ESHelpers.drawHUD(ctx, w, h, ['KONIEC', 'ES', '🎉']);
            return requestAnimationFrame(draw);
        }
        return draw();
    }
};
if (typeof module !== 'undefined') module.exports = AnimFuture;