// ES_SLIDES: Examples (28-32)
const AnimExamples = {
    s28_sfera(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0, pointX = w * 0.15, pointY = h * 0.8;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            ESHelpers.drawIsolines(ctx, w / 2, h / 2, 200, 30, '#E0E0E0'); ESHelpers.circle(ctx, w / 2, h / 2, 8, '#0A0'); ESHelpers.text(ctx, 'MIN', w / 2 + 15, h / 2 + 5, '#0A0', 'bold 12px Roboto');
            pointX += (w / 2 - pointX) * 0.01; pointY += (h / 2 - pointY) * 0.01;
            if (frame % 10 === 0) { ctx.globalAlpha = 0.2; ESHelpers.circle(ctx, pointX, pointY, 5, '#00A'); ctx.globalAlpha = 1; }
            ESHelpers.circle(ctx, pointX, pointY, 10, '#D00');
            if (Math.abs(pointX - w / 2) < 5) { pointX = Math.random() * w * 0.3 + w * 0.1; pointY = Math.random() * h * 0.3 + h * 0.5; }
            ESHelpers.text(ctx, 'f(x) = Σxᵢ² (unimodalna)', w / 2 - 90, h - 20, '#000', '14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['SFERA', 'UNIMODALNA', 'ŁATWA']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s29_rastrigin(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) { const cx = w * 0.2 + i * w * 0.15, cy = h * 0.2 + j * h * 0.15, isGlobal = i === 2 && j === 2;
                ctx.beginPath(); ctx.arc(cx, cy, 25, 0, Math.PI * 2); ctx.strokeStyle = isGlobal ? '#0A0' : '#DDD'; ctx.lineWidth = isGlobal ? 3 : 1; ctx.stroke();
                if (isGlobal) ESHelpers.circle(ctx, cx, cy, 6, '#0A0'); else ESHelpers.circle(ctx, cx, cy, 4, '#FA0'); }
            const searchX = w * 0.2 + ((frame * 0.5) % (w * 0.6)), searchY = h * 0.2 + Math.sin(frame * 0.1) * h * 0.3 + h * 0.3; ESHelpers.circle(ctx, searchX, searchY, 8, '#D00');
            ESHelpers.circle(ctx, 30, h - 60, 5, '#FA0'); ESHelpers.text(ctx, 'Lokalne min.', 45, h - 55, '#FA0', '12px Roboto');
            ESHelpers.circle(ctx, 30, h - 35, 6, '#0A0'); ESHelpers.text(ctx, 'Globalne min.', 45, h - 30, '#0A0', '12px Roboto');
            ESHelpers.text(ctx, 'f(x) = An + Σ[xᵢ² - A·cos(2πxᵢ)]', w / 2 - 120, h - 10, '#000', '12px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['RASTRIGIN', 'WIELOMODALNA', '25 MINIMÓW']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s30_zbieznosc(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const plotX = w * 0.15, plotW = w * 0.7, plotY = h * 0.8, plotH = h * 0.6;
            ESHelpers.line(ctx, plotX, plotY - plotH, plotX, plotY, '#000', 2); ESHelpers.line(ctx, plotX, plotY, plotX + plotW, plotY, '#000', 2);
            ESHelpers.text(ctx, 'log(f)', plotX - 50, plotY - plotH / 2, '#000', '12px Roboto'); ESHelpers.text(ctx, 'Generacja', plotX + plotW / 2 - 30, plotY + 25, '#000', '12px Roboto');
            const progress = Math.min(1, frame / 200); ctx.beginPath(); ctx.moveTo(plotX, plotY - plotH + 20);
            for (let i = 0; i <= 100 * progress; i++) { const t = i / 100, x = plotX + t * plotW, y = plotY - plotH + 20 + (1 - Math.exp(-t * 3)) * (plotH - 40); ctx.lineTo(x, y); }
            ctx.strokeStyle = '#D00'; ctx.lineWidth = 3; ctx.stroke();
            const currX = plotX + progress * plotW, currY = plotY - plotH + 20 + (1 - Math.exp(-progress * 3)) * (plotH - 40); ESHelpers.circle(ctx, currX, currY, 6, '#D00');
            if (frame > 300) frame = 0;
            ESHelpers.drawHUD(ctx, w, h, ['ZBIEŻNOŚĆ', 'WYKRES LOG', 'EKSPONENCJALNA']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s31_porownanie(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const col1X = w * 0.15, col2X = w * 0.55, colW = w * 0.3;
            ctx.fillStyle = 'rgba(0,0,200,0.1)'; ctx.fillRect(col1X, h * 0.15, colW, h * 0.7); ESHelpers.text(ctx, '(μ+λ)', col1X + colW / 2 - 25, h * 0.1, '#00A', 'bold 20px Roboto');
            ESHelpers.text(ctx, '✓ Elitaryzm', col1X + 10, h * 0.25, '#0A0', '14px Roboto'); ESHelpers.text(ctx, '✓ Stabilność', col1X + 10, h * 0.35, '#0A0', '14px Roboto');
            ESHelpers.text(ctx, '✗ Stagnacja', col1X + 10, h * 0.5, '#D00', '14px Roboto'); ESHelpers.text(ctx, '✗ Lokalne opt.', col1X + 10, h * 0.6, '#D00', '14px Roboto');
            ctx.fillStyle = 'rgba(200,0,0,0.1)'; ctx.fillRect(col2X, h * 0.15, colW, h * 0.7); ESHelpers.text(ctx, '(μ,λ)', col2X + colW / 2 - 20, h * 0.1, '#D00', 'bold 20px Roboto');
            ESHelpers.text(ctx, '✓ Dynamika', col2X + 10, h * 0.25, '#0A0', '14px Roboto'); ESHelpers.text(ctx, '✓ Ucieczka', col2X + 10, h * 0.35, '#0A0', '14px Roboto');
            ESHelpers.text(ctx, '✗ Może cofnąć', col2X + 10, h * 0.5, '#D00', '14px Roboto'); ESHelpers.text(ctx, '✗ λ >> μ', col2X + 10, h * 0.6, '#D00', '14px Roboto');
            ESHelpers.text(ctx, 'VS', w / 2 - 15, h / 2, '#000', 'bold 24px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['PORÓWNANIE', 'PLUS vs COMMA', 'TRADE-OFF']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s32_status(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const items = [{ text: '(1+1) ES', done: true }, { text: 'Reguła 1/5', done: true }, { text: '(μ+λ) ES', done: true }, { text: '(μ,λ) ES', done: true }, { text: 'Rekombinacja', done: true }, { text: 'Ograniczenia', done: true }];
            items.forEach((item, i) => { const y = h * 0.15 + i * 50, checkX = w * 0.2; ctx.strokeStyle = item.done ? '#0A0' : '#AAA'; ctx.lineWidth = 2; ctx.strokeRect(checkX, y, 25, 25);
                if (item.done) { ctx.fillStyle = '#0A0'; ctx.font = 'bold 20px Roboto'; ctx.fillText('✓', checkX + 4, y + 21); }
                ctx.fillStyle = item.done ? '#000' : '#AAA'; ctx.font = '16px Roboto'; ctx.fillText(item.text, checkX + 40, y + 18); });
            const progress = items.filter(i => i.done).length / items.length, barY = h * 0.85;
            ctx.fillStyle = '#EEE'; ctx.fillRect(w * 0.2, barY, w * 0.6, 20); ctx.fillStyle = '#0A0'; ctx.fillRect(w * 0.2, barY, w * 0.6 * progress, 20);
            ESHelpers.text(ctx, `${Math.round(progress * 100)}% PODSTAW`, w / 2 - 60, barY + 40, '#000', 'bold 16px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['CHECKPOINT', 'PODSTAWY ✓', 'DALEJ →']);
            return requestAnimationFrame(draw);
        }
        return draw();
    }
};
if (typeof module !== 'undefined') module.exports = AnimExamples;