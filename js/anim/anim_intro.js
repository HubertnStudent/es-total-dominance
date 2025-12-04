// ES_SLIDES: Intro animations (Slides 1-2)
const AnimIntro = {
    s1_historia(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId);
        if (!setup) return null;
        const { ctx, w, h } = setup;
        const particles = [];
        for (let i = 0; i < 40; i++) particles.push({ x: Math.random() * w, y: Math.random() * h, speed: 1 + Math.random() * 2, size: 2 + Math.random() * 4 });
        const nozzleTop = [], nozzleBot = [];
        for (let i = 0; i <= 20; i++) { const t = i / 20, x = t * w, squeeze = Math.sin(t * Math.PI) * 80; nozzleTop.push({ x, y: h * 0.15 + squeeze * 0.5 }); nozzleBot.push({ x, y: h * 0.85 - squeeze * 0.5 }); }
        let frame = 0, gen = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++;
            const grad = ctx.createLinearGradient(0, 0, w, 0); grad.addColorStop(0, '#f8f8f8'); grad.addColorStop(1, '#e8e8e8'); ctx.fillStyle = grad; ctx.fillRect(0, 0, w, h);
            ctx.beginPath(); ctx.moveTo(nozzleTop[0].x, nozzleTop[0].y); nozzleTop.forEach(p => ctx.lineTo(p.x, p.y)); ctx.strokeStyle = '#333'; ctx.lineWidth = 4; ctx.stroke();
            ctx.beginPath(); ctx.moveTo(nozzleBot[0].x, nozzleBot[0].y); nozzleBot.forEach(p => ctx.lineTo(p.x, p.y)); ctx.stroke();
            particles.forEach(p => { p.x += p.speed; if (p.x > w) { p.x = 0; p.y = h * 0.2 + Math.random() * h * 0.6; } const distFromCenter = Math.abs(p.y - h / 2) / (h / 2); const col = ESHelpers.lerpColor('#FF0000', '#0000FF', distFromCenter); ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.size * 3, p.y); ctx.strokeStyle = col; ctx.lineWidth = p.size; ctx.stroke(); });
            if (frame % 120 === 0) { gen++; for (let i = 5; i < 15; i++) { nozzleTop[i].y += ESHelpers.randNorm(0, 5); nozzleBot[i].y += ESHelpers.randNorm(0, 5); } }
            ESHelpers.drawHUD(ctx, w, h, [`GEN: ${gen}`, 'BERLIN 1960s', 'OPTYMALIZACJA']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s2_floats(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId);
        if (!setup) return null;
        const { ctx, w, h } = setup;
        const nums = []; for (let i = 0; i < 20; i++) nums.push({ x: Math.random() * w, y: Math.random() * h, val: (Math.random() * 10 - 5).toFixed(3), vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, size: 16 + Math.random() * 8 });
        const vec = [1.23, -0.45, 2.78, -1.92, 0.34];
        function draw() {
            ESHelpers.clear(ctx, w, h); ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            nums.forEach(n => { n.x += n.vx; n.y += n.vy; if (n.x < 0 || n.x > w) n.vx *= -1; if (n.y < 0 || n.y > h) n.vy *= -1; ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.font = `${n.size}px monospace`; ctx.fillText(n.val, n.x, n.y); });
            const boxW = 280, boxH = 60, boxX = (w - boxW) / 2, boxY = (h - boxH) / 2;
            ctx.fillStyle = '#FFF'; ctx.fillRect(boxX, boxY, boxW, boxH); ctx.strokeStyle = '#000'; ctx.lineWidth = 3; ctx.strokeRect(boxX, boxY, boxW, boxH);
            ctx.fillStyle = '#000'; ctx.font = '20px monospace'; ctx.fillText('x = [', boxX + 10, boxY + 38);
            vec.forEach((v, i) => { const col = v >= 0 ? '#00A' : '#A00'; ctx.fillStyle = col; ctx.fillText(v.toFixed(2), boxX + 55 + i * 45, boxY + 38); });
            ctx.fillStyle = '#000'; ctx.fillText(']', boxX + 255, boxY + 38);
            ESHelpers.text(ctx, 'x ∈ ℝⁿ', w / 2 - 30, boxY + boxH + 40, '#D00', 'bold 24px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['REPREZENTACJA', 'CIĄGŁA (FLOAT)', `n = ${vec.length}`]);
            return requestAnimationFrame(draw);
        }
        return draw();
    }
};