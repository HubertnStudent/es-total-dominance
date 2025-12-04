// ES_SLIDES: (1+1) ES animations (Slides 3-7)
const Anim1p1 = {
    s3_init(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0, pointX = w / 2, pointY = h / 2;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++;
            ESHelpers.drawIsolines(ctx, w / 2, h / 2, Math.max(w, h) / 2, 40, '#E0E0E0');
            ESHelpers.circle(ctx, w / 2, h / 2, 8, '#0A0'); ESHelpers.text(ctx, 'OPT', w / 2 + 15, h / 2 + 5, '#0A0', '14px Roboto');
            const alpha = Math.min(1, frame / 60); ctx.globalAlpha = alpha;
            const pulse = 1 + Math.sin(frame * 0.1) * 0.1; ESHelpers.circle(ctx, pointX, pointY, 15 * pulse, '#D00'); ctx.globalAlpha = 1;
            if (frame % 300 === 0) { pointX = Math.random() * w * 0.6 + w * 0.2; pointY = Math.random() * h * 0.6 + h * 0.2; }
            const dist = Math.sqrt((pointX - w / 2) ** 2 + (pointY - h / 2) ** 2).toFixed(1);
            ESHelpers.drawHUD(ctx, w, h, ['KROK 1: INIT', `x₀ losowy`, `dist = ${dist}`]);
            ESHelpers.text(ctx, 'x₀', pointX + 20, pointY, '#D00', 'bold 18px Roboto');
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s4_mutacja(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const parentX = w * 0.35, parentY = h / 2; let sigma = 60, childX = parentX, childY = parentY, phase = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++;
            ESHelpers.drawIsolines(ctx, w / 2, h / 2, 200, 40, '#E8E8E8');
            const cycleFrame = frame % 300;
            if (cycleFrame < 50) phase = 0; else if (cycleFrame < 150) phase = 1; else phase = 2;
            ESHelpers.circle(ctx, parentX, parentY, 18, '#000'); ESHelpers.text(ctx, 'x', parentX - 5, parentY + 5, '#FFF', 'bold 14px Roboto');
            ctx.beginPath(); ctx.arc(parentX, parentY, sigma, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(255,0,0,0.4)'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]); ctx.stroke(); ctx.setLineDash([]);
            ESHelpers.text(ctx, `σ = ${sigma}`, parentX + sigma + 10, parentY, '#D00', '16px Roboto');
            if (phase >= 1) {
                if (cycleFrame === 50) { const angle = Math.random() * Math.PI * 2, r = Math.abs(ESHelpers.randNorm(0, sigma * 0.5)); childX = parentX + Math.cos(angle) * r; childY = parentY + Math.sin(angle) * r; }
                ESHelpers.line(ctx, parentX, parentY, childX, childY, '#F00', 2);
                ESHelpers.circle(ctx, childX, childY, 12, '#F00'); ESHelpers.text(ctx, "x'", childX + 15, childY, '#F00', 'bold 14px Roboto');
            }
            const phaseNames = ['RODZIC', 'MUTACJA', 'GOTOWE']; ESHelpers.drawHUD(ctx, w, h, ['KROK 2: MUTACJA', `σ = ${sigma}`, phaseNames[phase]]);
            ESHelpers.text(ctx, "x' = x + N(0, σ)", w / 2 - 60, h - 30, '#000', 'bold 16px Roboto');
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s5_ocena(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0, fParent = 0.6, fChild = 0.4;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++;
            const cycleFrame = frame % 240;
            if (cycleFrame === 0) { fParent = 0.3 + Math.random() * 0.5; fChild = 0.2 + Math.random() * 0.6; }
            const anim = Math.min(1, cycleFrame / 60), barW = 80, maxH = h * 0.6, baseY = h * 0.85;
            ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const h1 = maxH * fParent * anim; ctx.fillStyle = '#333'; ctx.fillRect(w * 0.3 - barW / 2, baseY - h1, barW, h1);
            ESHelpers.text(ctx, 'f(x)', w * 0.3 - 15, baseY + 25, '#333', '16px Roboto'); ESHelpers.text(ctx, fParent.toFixed(2), w * 0.3 - 20, baseY - h1 - 10, '#333', 'bold 18px Roboto');
            const h2 = maxH * fChild * anim, childColor = fChild < fParent ? '#0A0' : '#D00'; ctx.fillStyle = childColor; ctx.fillRect(w * 0.7 - barW / 2, baseY - h2, barW, h2);
            ESHelpers.text(ctx, "f(x')", w * 0.7 - 20, baseY + 25, childColor, '16px Roboto'); ESHelpers.text(ctx, fChild.toFixed(2), w * 0.7 - 20, baseY - h2 - 10, childColor, 'bold 18px Roboto');
            if (cycleFrame > 100) { const result = fChild < fParent ? 'LEPSZY! ✓' : 'GORSZY ✗', resColor = fChild < fParent ? '#0A0' : '#D00'; ESHelpers.text(ctx, result, w / 2 - 40, h * 0.15, resColor, 'bold 24px Roboto'); }
            ESHelpers.drawHUD(ctx, w, h, ['KROK 3: OCENA', `f(x) = ${fParent.toFixed(2)}`, `f(x') = ${fChild.toFixed(2)}`]);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s6_selekcja(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0, winner = 'child';
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++;
            const cycleFrame = frame % 300; if (cycleFrame === 0) winner = Math.random() > 0.4 ? 'child' : 'parent';
            ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            ctx.strokeStyle = '#333'; ctx.lineWidth = 4; ctx.strokeRect(w * 0.1, h * 0.2, w * 0.8, h * 0.5);
            const parentX = w * 0.3, childX = w * 0.7, arenaY = h * 0.45;
            if (cycleFrame < 100) {
                ESHelpers.circle(ctx, parentX, arenaY, 25, '#333'); ESHelpers.text(ctx, 'x', parentX - 7, arenaY + 7, '#FFF', 'bold 16px Roboto');
                ESHelpers.circle(ctx, childX, arenaY, 25, '#D00'); ESHelpers.text(ctx, "x'", childX - 10, arenaY + 7, '#FFF', 'bold 16px Roboto');
                ESHelpers.text(ctx, 'VS', w / 2 - 15, arenaY + 8, '#000', 'bold 24px Roboto');
            } else {
                const loserAlpha = Math.max(0, 1 - (cycleFrame - 100) / 100);
                if (winner === 'child') { ctx.globalAlpha = loserAlpha; ESHelpers.circle(ctx, parentX, arenaY, 25, '#AAA'); ctx.globalAlpha = 1; const pulse = 1 + Math.sin(cycleFrame * 0.1) * 0.1; ESHelpers.circle(ctx, childX, arenaY, 25 * pulse, '#0A0'); ESHelpers.text(ctx, "x'", childX - 10, arenaY + 7, '#FFF', 'bold 16px Roboto'); if (cycleFrame > 150) ESHelpers.text(ctx, 'POTOMEK WYGRYWA', w / 2 - 80, h * 0.82, '#0A0', 'bold 20px Roboto'); }
                else { ctx.globalAlpha = loserAlpha; ESHelpers.circle(ctx, childX, arenaY, 25, '#AAA'); ctx.globalAlpha = 1; const pulse = 1 + Math.sin(cycleFrame * 0.1) * 0.1; ESHelpers.circle(ctx, parentX, arenaY, 25 * pulse, '#0A0'); ESHelpers.text(ctx, 'x', parentX - 7, arenaY + 7, '#FFF', 'bold 16px Roboto'); if (cycleFrame > 150) ESHelpers.text(ctx, 'RODZIC ZOSTAJE', w / 2 - 70, h * 0.82, '#333', 'bold 20px Roboto'); }
            }
            ESHelpers.drawHUD(ctx, w, h, ['KROK 4: SELEKCJA', 'DETERMINISTYCZNA', 'LEPSZY WYGRYWA']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s7_petla(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0, gen = 0, sigma = 50, currentX = w * 0.2, currentY = h * 0.7;
        const optX = w / 2, optY = h / 2; let history = [{ x: currentX, y: currentY }], successes = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++;
            ESHelpers.drawIsolines(ctx, optX, optY, 250, 35, '#E8E8E8'); ESHelpers.circle(ctx, optX, optY, 6, '#0A0');
            ctx.beginPath(); history.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y); }); ctx.strokeStyle = 'rgba(0,0,200,0.3)'; ctx.lineWidth = 2; ctx.stroke();
            history.forEach((p, i) => { const alpha = 0.2 + (i / history.length) * 0.6; ctx.globalAlpha = alpha; ESHelpers.circle(ctx, p.x, p.y, 4, '#00A'); }); ctx.globalAlpha = 1;
            ESHelpers.circle(ctx, currentX, currentY, 12, '#D00');
            if (frame % 60 === 0 && gen < 100) {
                gen++;
                const angle = Math.random() * Math.PI * 2, r = Math.abs(ESHelpers.randNorm(0, sigma));
                const newX = currentX + Math.cos(angle) * r, newY = currentY + Math.sin(angle) * r;
                const fOld = Math.sqrt((currentX - optX) ** 2 + (currentY - optY) ** 2), fNew = Math.sqrt((newX - optX) ** 2 + (newY - optY) ** 2);
                if (fNew < fOld) { currentX = newX; currentY = newY; history.push({ x: currentX, y: currentY }); successes++; }
                if (gen % 10 === 0) { const rate = successes / 10; if (rate > 0.2) sigma *= 1.2; else if (rate < 0.2) sigma *= 0.82; successes = 0; }
                if (history.length > 50) history.shift();
            }
            const dist = Math.sqrt((currentX - optX) ** 2 + (currentY - optY) ** 2);
            if ((dist < 10 || gen >= 100) && frame % 180 === 0) { gen = 0; sigma = 50; currentX = Math.random() * w * 0.4 + w * 0.1; currentY = Math.random() * h * 0.4 + h * 0.4; history = [{ x: currentX, y: currentY }]; }
            ESHelpers.drawHUD(ctx, w, h, ['(1+1) ES PĘTLA', `GEN: ${gen}`, `σ = ${sigma.toFixed(1)}`, `dist = ${dist.toFixed(1)}`]);
            return requestAnimationFrame(draw);
        }
        return draw();
    }
};