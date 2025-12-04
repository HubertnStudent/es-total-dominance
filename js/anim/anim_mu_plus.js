// ES_SLIDES: (μ+λ) ES animations (Slides 9-15)
const AnimMuPlus = {
    s9_populacja(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const mu = 5, parents = [];
        for (let i = 0; i < mu; i++) parents.push({ x: w * 0.3 + Math.random() * w * 0.4, y: h * 0.3 + Math.random() * h * 0.4, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 });
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            ESHelpers.drawIsolines(ctx, w / 2, h / 2, 200, 40, '#E8E8E8'); ESHelpers.circle(ctx, w / 2, h / 2, 6, '#0A0');
            parents.forEach((p, i) => { p.x += p.vx; p.y += p.vy; if (p.x < w * 0.2 || p.x > w * 0.8) p.vx *= -1; if (p.y < h * 0.2 || p.y > h * 0.8) p.vy *= -1;
                const pulse = 1 + Math.sin(frame * 0.05 + i) * 0.1; ESHelpers.circle(ctx, p.x, p.y, 18 * pulse, '#00A'); ESHelpers.text(ctx, `P${i + 1}`, p.x - 10, p.y + 5, '#FFF', 'bold 12px Roboto'); });
            ESHelpers.text(ctx, `μ = ${mu} RODZICÓW`, w / 2 - 60, h - 30, '#00A', 'bold 18px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['(μ+λ) KROK 1', `μ = ${mu}`, 'POPULACJA START']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s10_reprodukcja(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const mu = 3, lambda = 9;
        const parents = []; for (let i = 0; i < mu; i++) parents.push({ x: w * 0.2, y: h * 0.2 + i * h * 0.3 });
        let children = [];
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            if (frame % 20 === 0 && children.length < lambda) { const parentIdx = children.length % mu, parent = parents[parentIdx]; children.push({ x: parent.x, y: parent.y, targetX: w * 0.6 + (children.length % 3) * 50, targetY: h * 0.15 + Math.floor(children.length / 3) * h * 0.25, progress: 0, parentIdx }); }
            parents.forEach((p, i) => { ESHelpers.circle(ctx, p.x, p.y, 22, '#00A'); ESHelpers.text(ctx, `P${i + 1}`, p.x - 10, p.y + 5, '#FFF', 'bold 14px Roboto'); });
            children.forEach((c, i) => { c.progress = Math.min(1, c.progress + 0.03); const x = c.x + (c.targetX - c.x) * c.progress, y = c.y + (c.targetY - c.y) * c.progress;
                if (c.progress < 1) { ctx.beginPath(); ctx.moveTo(parents[c.parentIdx].x, parents[c.parentIdx].y); ctx.lineTo(x, y); ctx.strokeStyle = 'rgba(200,0,0,0.3)'; ctx.lineWidth = 1; ctx.stroke(); }
                ESHelpers.circle(ctx, x, y, 14, '#D00'); ESHelpers.text(ctx, `C${i + 1}`, x - 10, y + 4, '#FFF', 'bold 10px Roboto'); });
            if (children.length >= lambda && frame % 300 === 0) children = [];
            ESHelpers.text(ctx, `μ=${mu}`, w * 0.1, h - 30, '#00A', 'bold 16px Roboto'); ESHelpers.text(ctx, `λ=${lambda}`, w * 0.7, h - 30, '#D00', 'bold 16px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['(μ+λ) KROK 2', 'REPRODUKCJA', `${children.length}/${lambda} DZIECI`]);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s11_pula(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const mu = 3, lambda = 9, pool = [];
        for (let i = 0; i < mu; i++) pool.push({ x: Math.random() * w * 0.6 + w * 0.2, y: Math.random() * h * 0.6 + h * 0.2, isParent: true, fitness: Math.random() });
        for (let i = 0; i < lambda; i++) pool.push({ x: Math.random() * w * 0.6 + w * 0.2, y: Math.random() * h * 0.6 + h * 0.2, isParent: false, fitness: Math.random() });
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            pool.forEach(p => { p.x += (Math.random() - 0.5) * 2; p.y += (Math.random() - 0.5) * 2; p.x = Math.max(w * 0.1, Math.min(w * 0.9, p.x)); p.y = Math.max(h * 0.15, Math.min(h * 0.85, p.y)); });
            pool.forEach((p, i) => { const col = p.isParent ? '#00A' : '#D00', size = p.isParent ? 18 : 12; ESHelpers.circle(ctx, p.x, p.y, size, col); });
            ctx.fillStyle = '#000'; ctx.font = 'bold 20px Roboto'; ctx.fillText(`PULA: μ + λ = ${mu} + ${lambda} = ${mu + lambda}`, w / 2 - 100, h - 20);
            ESHelpers.drawHUD(ctx, w, h, ['(μ+λ) KROK 3', 'POŁĄCZONA PULA', `SUMA: ${mu + lambda}`]);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s12_sortowanie(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const count = 10, individuals = [];
        for (let i = 0; i < count; i++) individuals.push({ fitness: Math.random(), currentPos: i, targetPos: i, y: h * 0.5 });
        let sorted = false, sortStep = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const barW = w * 0.06, startX = w * 0.1, gap = (w * 0.8 - barW * count) / (count - 1);
            if (frame % 30 === 0 && !sorted) { for (let i = 0; i < count - 1; i++) if (individuals[i].fitness > individuals[i + 1].fitness) [individuals[i], individuals[i + 1]] = [individuals[i + 1], individuals[i]]; sortStep++; if (sortStep > count) sorted = true; }
            individuals.forEach((ind, i) => { const x = startX + i * (barW + gap), barH = ind.fitness * h * 0.6, t = i / (count - 1), col = ESHelpers.lerpColor('#00AA00', '#DD0000', t);
                ctx.fillStyle = col; ctx.fillRect(x, h * 0.8 - barH, barW, barH); ctx.fillStyle = '#000'; ctx.font = '12px monospace'; ctx.fillText(ind.fitness.toFixed(2), x, h * 0.85); });
            ESHelpers.text(ctx, '← LEPSZE', w * 0.05, h * 0.1, '#0A0', 'bold 14px Roboto'); ESHelpers.text(ctx, 'GORSZE →', w * 0.8, h * 0.1, '#D00', 'bold 14px Roboto');
            if (frame % 400 === 0) { sorted = false; sortStep = 0; individuals.forEach(ind => { ind.fitness = Math.random(); }); }
            ESHelpers.drawHUD(ctx, w, h, ['(μ+λ) KROK 4', 'SORTOWANIE', sorted ? 'POSORTOWANE!' : 'SORTOWANIE...']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s13_odciecie(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const mu = 4, total = 12;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const barW = 40, gap = 10, startX = (w - total * (barW + gap)) / 2;
            for (let i = 0; i < total; i++) { const x = startX + i * (barW + gap), barH = (total - i) * 20 + 50, y = h * 0.7 - barH, selected = i < mu, fadePhase = Math.max(0, Math.min(1, (frame - 60) / 60));
                if (selected) ctx.fillStyle = '#0A0'; else ctx.fillStyle = `rgba(150,150,150,${1 - fadePhase * 0.7})`; ctx.fillRect(x, y, barW, barH);
                if (selected) ESHelpers.text(ctx, '★', x + barW / 2 - 8, y - 10, '#FFD700', 'bold 20px Roboto');
                if (!selected && fadePhase > 0.3) { ctx.strokeStyle = '#D00'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + barW, y + barH); ctx.moveTo(x + barW, y); ctx.lineTo(x, y + barH); ctx.stroke(); } }
            const cutX = startX + mu * (barW + gap) - gap / 2; ctx.setLineDash([10, 5]); ctx.strokeStyle = '#D00'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cutX, h * 0.1); ctx.lineTo(cutX, h * 0.8); ctx.stroke(); ctx.setLineDash([]);
            ESHelpers.text(ctx, `TOP ${mu}`, cutX - 100, h * 0.1, '#0A0', 'bold 20px Roboto'); ESHelpers.text(ctx, 'ELIMINACJA', cutX + 20, h * 0.1, '#D00', 'bold 20px Roboto');
            if (frame > 300) frame = 0;
            ESHelpers.drawHUD(ctx, w, h, ['(μ+λ) KROK 5', 'SELEKCJA ELITARNA', `TOP μ = ${mu} ZOSTAJE`]);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s14_stagnacja(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const localOptX = w * 0.3, localOptY = h * 0.5, globalOptX = w * 0.75, globalOptY = h * 0.5;
        const pop = []; for (let i = 0; i < 8; i++) pop.push({ x: localOptX + ESHelpers.randNorm(0, 20), y: localOptY + ESHelpers.randNorm(0, 20), vx: 0, vy: 0 });
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            ESHelpers.drawIsolines(ctx, localOptX, localOptY, 100, 25, '#E8E8E8'); ESHelpers.circle(ctx, localOptX, localOptY, 8, '#FA0'); ESHelpers.text(ctx, 'LOCAL', localOptX - 25, localOptY + 30, '#FA0', 'bold 14px Roboto');
            ESHelpers.drawIsolines(ctx, globalOptX, globalOptY, 120, 20, '#D8FFD8'); ESHelpers.circle(ctx, globalOptX, globalOptY, 10, '#0A0'); ESHelpers.text(ctx, 'GLOBAL', globalOptX - 30, globalOptY + 35, '#0A0', 'bold 14px Roboto');
            pop.forEach((p, i) => { const angle = frame * 0.02 + i * Math.PI * 2 / pop.length, dist = 30 + Math.sin(frame * 0.05 + i) * 10; p.x = localOptX + Math.cos(angle) * dist; p.y = localOptY + Math.sin(angle) * dist; ESHelpers.circle(ctx, p.x, p.y, 8, '#D00'); });
            if (frame % 120 < 60) ESHelpers.text(ctx, '⚠ STAGNACJA!', w / 2 - 60, h - 30, '#D00', 'bold 20px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['(μ+λ) PROBLEM', 'LOKALNE OPTIMUM', 'ELITA = PUŁAPKA']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s15_podsumowanie(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const plotX = w * 0.15, plotW = w * 0.7, plotY = h * 0.2, plotH = h * 0.5;
            ctx.strokeStyle = '#000'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(plotX, plotY); ctx.lineTo(plotX, plotY + plotH); ctx.lineTo(plotX + plotW, plotY + plotH); ctx.stroke();
            ESHelpers.text(ctx, 'FITNESS', plotX - 60, plotY + plotH / 2, '#000', '14px Roboto'); ESHelpers.text(ctx, 'GENERACJA', plotX + plotW / 2 - 40, plotY + plotH + 30, '#000', '14px Roboto');
            ctx.beginPath(); ctx.moveTo(plotX, plotY + 20);
            for (let i = 0; i <= 100; i++) { const x = plotX + (i / 100) * plotW, decay = Math.exp(-i * 0.03), y = plotY + 20 + (1 - decay) * (plotH - 40); if (i * 3 < frame) ctx.lineTo(x, y); }
            ctx.strokeStyle = '#00A'; ctx.lineWidth = 3; ctx.stroke();
            ESHelpers.text(ctx, 'GWARANCJA: f(t+1) ≤ f(t)', w / 2 - 100, h - 40, '#0A0', 'bold 18px Roboto');
            ESHelpers.text(ctx, '✓ Elitaryzm', w * 0.1, h * 0.85, '#0A0', 'bold 14px Roboto'); ESHelpers.text(ctx, '✗ Ryzyko stagnacji', w * 0.5, h * 0.85, '#D00', 'bold 14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['(μ+λ) CECHY', 'ELITARYZM', 'MONOTONIA']);
            if (frame > 400) frame = 0;
            return requestAnimationFrame(draw);
        }
        return draw();
    }
};