// ES_SLIDES: (μ,λ) ES animations (Slides 16-20)
const AnimMuComma = {
    s16_starzenie(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const pop = [];
        for (let i = 0; i < 6; i++) pop.push({ x: w * 0.2 + Math.random() * w * 0.6, y: h * 0.3 + Math.random() * h * 0.4, age: Math.floor(Math.random() * 5) });
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            pop.forEach((p, i) => { const alpha = Math.max(0.2, 1 - p.age * 0.15); ctx.globalAlpha = alpha; const col = p.age >= 5 ? '#AAA' : '#00A'; ESHelpers.circle(ctx, p.x, p.y, 20, col); ESHelpers.text(ctx, `${p.age}`, p.x - 5, p.y + 6, '#FFF', 'bold 14px Roboto'); });
            ctx.globalAlpha = 1; if (frame % 60 === 0) pop.forEach(p => { p.age++; if (p.age > 6) { p.age = 0; p.x = w * 0.2 + Math.random() * w * 0.6; p.y = h * 0.3 + Math.random() * h * 0.4; } });
            ESHelpers.text(ctx, 'RODZICE STARZEJĄ SIĘ → UMIERAJĄ', w / 2 - 140, h - 30, '#000', 'bold 16px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['(μ,λ) KROK 1', 'STARZENIE', 'MAX = 1 GEN']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s17_nadmiarowosc(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const mu = 3, lambda = 12, startX = w * 0.15;
            ESHelpers.text(ctx, `μ = ${mu}`, startX, h * 0.25, '#00A', 'bold 20px Roboto');
            for (let i = 0; i < mu; i++) ESHelpers.circle(ctx, startX + 50 + i * 40, h * 0.25 - 5, 15, '#00A');
            ESHelpers.text(ctx, `λ = ${lambda}`, startX, h * 0.55, '#D00', 'bold 20px Roboto');
            for (let i = 0; i < lambda; i++) { const row = Math.floor(i / 6), col = i % 6; ESHelpers.circle(ctx, startX + 50 + col * 35, h * 0.55 - 5 + row * 35, 12, '#D00'); }
            ESHelpers.text(ctx, 'WYMÓG: λ ≥ μ', w / 2 - 60, h * 0.85, '#000', 'bold 18px Roboto');
            ESHelpers.text(ctx, `(zalecane: λ ≈ 7μ = ${7 * mu})`, w / 2 - 80, h * 0.92, '#666', '14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['(μ,λ) WYMÓG', 'λ ≥ μ', 'NADMIAROWOŚĆ']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s18_smierc(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const parents = []; for (let i = 0; i < 4; i++) parents.push({ x: w * 0.15 + i * 60, y: h * 0.3, alive: true, fadeOut: 0 });
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            if (frame === 120) parents.forEach(p => { p.alive = false; p.fadeOut = 0; });
            parents.forEach((p, i) => { if (!p.alive) { p.fadeOut = Math.min(1, p.fadeOut + 0.02); ctx.globalAlpha = 1 - p.fadeOut; } ESHelpers.circle(ctx, p.x, p.y, 18, p.alive ? '#00A' : '#888');
                if (!p.alive && p.fadeOut > 0.3) { ESHelpers.text(ctx, '💀', p.x - 10, p.y + 6, '#000', '16px Roboto'); } }); ctx.globalAlpha = 1;
            const msgY = h * 0.6; if (frame < 120) ESHelpers.text(ctx, 'GENERACJA t: rodzice żyją', w / 2 - 110, msgY, '#00A', 'bold 16px Roboto'); else ESHelpers.text(ctx, 'GENERACJA t+1: rodzice ELIMINOWANI', w / 2 - 140, msgY, '#D00', 'bold 16px Roboto');
            ESHelpers.text(ctx, 'Brak elitaryzmu → świeża krew', w / 2 - 110, h - 30, '#000', '14px Roboto');
            if (frame > 300) { frame = 0; parents.forEach(p => { p.alive = true; p.fadeOut = 0; }); }
            ESHelpers.drawHUD(ctx, w, h, ['(μ,λ) KROK 2', 'ŚMIERĆ RODZICÓW', 'RESET']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s19_selekcja(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const mu = 3, lambda = 12; const children = []; for (let i = 0; i < lambda; i++) children.push({ fitness: Math.random(), selected: false });
        children.sort((a, b) => a.fitness - b.fitness); for (let i = 0; i < mu; i++) children[i].selected = true;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const barW = 40, gap = 8, startX = (w - lambda * (barW + gap)) / 2;
            children.forEach((c, i) => { const x = startX + i * (barW + gap), barH = c.fitness * h * 0.5 + 30, col = c.selected ? '#0A0' : '#DDD';
                ctx.fillStyle = col; ctx.fillRect(x, h * 0.7 - barH, barW, barH);
                if (c.selected) ESHelpers.text(ctx, '★', x + barW / 2 - 8, h * 0.7 - barH - 15, '#FFD700', 'bold 18px Roboto'); });
            const cutX = startX + mu * (barW + gap) - gap / 2; ctx.setLineDash([8, 4]); ctx.strokeStyle = '#D00'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cutX, h * 0.1); ctx.lineTo(cutX, h * 0.75); ctx.stroke(); ctx.setLineDash([]);
            ESHelpers.text(ctx, `TOP μ=${mu}`, cutX - 80, h * 0.1, '#0A0', 'bold 16px Roboto'); ESHelpers.text(ctx, 'ELIMINACJA', cutX + 10, h * 0.1, '#D00', 'bold 16px Roboto');
            ESHelpers.text(ctx, 'Selekcja TYLKO z dzieci (λ)', w / 2 - 110, h - 25, '#000', 'bold 14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['(μ,λ) KROK 3', 'SELEKCJA', `TOP ${mu} z ${lambda}`]);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s20_dynamika(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const localOptX = w * 0.3, globalOptX = w * 0.75, optY = h / 2;
        const pop = []; for (let i = 0; i < 6; i++) pop.push({ x: localOptX + ESHelpers.randNorm(0, 30), y: optY + ESHelpers.randNorm(0, 30), escaping: false });
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            ESHelpers.drawIsolines(ctx, localOptX, optY, 80, 20, '#FEE'); ESHelpers.circle(ctx, localOptX, optY, 6, '#FA0'); ESHelpers.text(ctx, 'LOCAL', localOptX - 25, optY + 25, '#FA0', 'bold 12px Roboto');
            ESHelpers.drawIsolines(ctx, globalOptX, optY, 100, 20, '#DFD'); ESHelpers.circle(ctx, globalOptX, optY, 8, '#0A0'); ESHelpers.text(ctx, 'GLOBAL', globalOptX - 30, optY + 30, '#0A0', 'bold 12px Roboto');
            const phase = (frame % 300) / 300;
            pop.forEach((p, i) => { if (phase < 0.3) { p.x = localOptX + Math.cos(frame * 0.02 + i) * 30; p.y = optY + Math.sin(frame * 0.02 + i) * 30; } else if (phase < 0.6) { p.x += (globalOptX - p.x) * 0.02 + ESHelpers.randNorm(0, 2); p.y += (optY - p.y) * 0.02 + ESHelpers.randNorm(0, 2); } else { p.x = globalOptX + Math.cos(frame * 0.03 + i) * 20; p.y = optY + Math.sin(frame * 0.03 + i) * 20; }
                ESHelpers.circle(ctx, p.x, p.y, 8, '#D00'); });
            if (phase < 0.3) ESHelpers.text(ctx, '① Utknięcie lokalne', w / 2 - 80, h - 40, '#FA0', 'bold 16px Roboto'); else if (phase < 0.6) ESHelpers.text(ctx, '② UCIECZKA! (brak elity)', w / 2 - 90, h - 40, '#00A', 'bold 16px Roboto'); else ESHelpers.text(ctx, '③ Globalne optimum!', w / 2 - 80, h - 40, '#0A0', 'bold 16px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['(μ,λ) ZALETA', 'UCIECZKA', 'DYNAMIKA']);
            return requestAnimationFrame(draw);
        }
        return draw();
    }
};
if (typeof module !== 'undefined') module.exports = AnimMuComma;