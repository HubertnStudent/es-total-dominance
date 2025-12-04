// ES_SLIDES: Recombination (Slides 23-25, 37-39)
const AnimRecomb = {
    s23_dyskretna(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const parentA = [1.2, -0.8, 2.1, 0.5], parentB = [0.3, 1.5, -0.2, 1.8]; let child = [...parentA], choices = [0, 0, 0, 0];
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const boxW = 60, boxH = 40, startX = w * 0.2;
            ESHelpers.text(ctx, 'RODZIC A', startX, h * 0.2, '#00A', 'bold 16px Roboto');
            parentA.forEach((v, i) => { ctx.fillStyle = '#00A'; ctx.fillRect(startX + i * (boxW + 10), h * 0.25, boxW, boxH); ESHelpers.text(ctx, v.toFixed(1), startX + i * (boxW + 10) + 15, h * 0.25 + 28, '#FFF', 'bold 14px Roboto'); });
            ESHelpers.text(ctx, 'RODZIC B', startX, h * 0.45, '#D00', 'bold 16px Roboto');
            parentB.forEach((v, i) => { ctx.fillStyle = '#D00'; ctx.fillRect(startX + i * (boxW + 10), h * 0.5, boxW, boxH); ESHelpers.text(ctx, v.toFixed(1), startX + i * (boxW + 10) + 15, h * 0.5 + 28, '#FFF', 'bold 14px Roboto'); });
            if (frame % 60 === 0) { for (let i = 0; i < 4; i++) { choices[i] = Math.random() > 0.5 ? 1 : 0; child[i] = choices[i] === 0 ? parentA[i] : parentB[i]; } }
            ESHelpers.text(ctx, 'DZIECKO', startX, h * 0.7, '#0A0', 'bold 16px Roboto');
            child.forEach((v, i) => { const col = choices[i] === 0 ? '#00A' : '#D00'; ctx.fillStyle = col; ctx.fillRect(startX + i * (boxW + 10), h * 0.75, boxW, boxH); ESHelpers.text(ctx, v.toFixed(1), startX + i * (boxW + 10) + 15, h * 0.75 + 28, '#FFF', 'bold 14px Roboto');
                const arrowY = choices[i] === 0 ? h * 0.25 + boxH : h * 0.5 + boxH; ctx.beginPath(); ctx.moveTo(startX + i * (boxW + 10) + boxW / 2, arrowY); ctx.lineTo(startX + i * (boxW + 10) + boxW / 2, h * 0.75 - 5); ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.stroke(); });
            ESHelpers.text(ctx, 'Każdy gen: losowo A lub B', w / 2 - 100, h - 20, '#666', '14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['KRZYŻOWANIE', 'DYSKRETNE', 'ALBO A ALBO B']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s24_posrednia(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const cA = { x: w * 0.25, y: h * 0.4 }, cB = { x: w * 0.75, y: h * 0.4 }, cChild = { x: (cA.x + cB.x) / 2, y: h * 0.7 };
            ESHelpers.circle(ctx, cA.x, cA.y, 40, '#00A'); ESHelpers.text(ctx, 'A', cA.x - 8, cA.y + 8, '#FFF', 'bold 20px Roboto');
            ESHelpers.circle(ctx, cB.x, cB.y, 40, '#D00'); ESHelpers.text(ctx, 'B', cB.x - 8, cB.y + 8, '#FFF', 'bold 20px Roboto');
            ESHelpers.line(ctx, cA.x, cA.y + 40, cChild.x, cChild.y - 30, '#00A', 2); ESHelpers.line(ctx, cB.x, cB.y + 40, cChild.x, cChild.y - 30, '#D00', 2);
            ESHelpers.circle(ctx, cChild.x, cChild.y, 35, '#70A'); ESHelpers.text(ctx, '(A+B)/2', cChild.x - 30, cChild.y + 8, '#FFF', 'bold 14px Roboto');
            ESHelpers.text(ctx, 'x_child = (x_A + x_B) / 2', w / 2 - 100, h - 40, '#000', 'bold 18px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['KRZYŻOWANIE', 'POŚREDNIE', 'ŚREDNIA']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s25_sens(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const centerX = w / 2, centerY = h / 2; ctx.globalAlpha = 0.3;
            for (let i = 0; i < 20; i++) { const angle = i * Math.PI * 2 / 20, r = 100 + Math.sin(frame * 0.02 + i) * 20; ESHelpers.circle(ctx, centerX + Math.cos(angle) * r, centerY + Math.sin(angle) * r, 10, '#D00'); }
            const shrink = 0.5 + Math.sin(frame * 0.03) * 0.2;
            for (let i = 0; i < 20; i++) { const angle = i * Math.PI * 2 / 20, r = 50 * shrink; ESHelpers.circle(ctx, centerX + Math.cos(angle) * r, centerY + Math.sin(angle) * r, 8, '#0A0'); }
            ctx.globalAlpha = 1; ESHelpers.circle(ctx, centerX, centerY, 5, '#000');
            ESHelpers.text(ctx, 'BEZ REKOMBINACJI', w * 0.1, h * 0.15, '#D00', 'bold 14px Roboto'); ESHelpers.text(ctx, 'Z REKOMBINACJĄ', w * 0.6, h * 0.85, '#0A0', 'bold 14px Roboto');
            ESHelpers.text(ctx, 'Rekombinacja redukuje wariancję błędów', w / 2 - 150, h - 20, '#000', '14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['SENS REKOMBIN.', 'REDUKCJA SZUMU', 'NAPRAWA BŁĘDÓW']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s37_globalna(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const numParents = 5;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const parentPositions = []; for (let i = 0; i < numParents; i++) { const angle = i * Math.PI * 2 / numParents - Math.PI / 2; parentPositions.push({ x: w / 2 + Math.cos(angle) * 120, y: h * 0.4 + Math.sin(angle) * 80 }); }
            parentPositions.forEach((p, i) => { ESHelpers.circle(ctx, p.x, p.y, 25, '#00A'); ESHelpers.text(ctx, `P${i + 1}`, p.x - 10, p.y + 5, '#FFF', 'bold 12px Roboto'); });
            const childX = w / 2, childY = h * 0.75;
            parentPositions.forEach((p, i) => { const phase = (frame * 0.02 + i * 0.5) % 1; ctx.beginPath(); ctx.moveTo(p.x, p.y + 25); ctx.lineTo(childX, childY - 20); ctx.strokeStyle = `rgba(0,0,200,${0.3 + Math.sin(phase * Math.PI) * 0.3})`; ctx.lineWidth = 2; ctx.stroke(); });
            ESHelpers.circle(ctx, childX, childY, 30, '#D00'); ESHelpers.text(ctx, 'CHILD', childX - 22, childY + 5, '#FFF', 'bold 12px Roboto');
            ESHelpers.text(ctx, 'Globalna: geny od WIELU rodziców', w / 2 - 130, h - 20, '#000', 'bold 14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['REK. GLOBALNA', `${numParents} RODZICÓW`, '→ 1 DZIECKO']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s38_lokalna(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            ESHelpers.circle(ctx, w * 0.3, h * 0.35, 35, '#00A'); ESHelpers.text(ctx, 'P1', w * 0.3 - 10, h * 0.35 + 8, '#FFF', 'bold 16px Roboto');
            ESHelpers.circle(ctx, w * 0.7, h * 0.35, 35, '#00A'); ESHelpers.text(ctx, 'P2', w * 0.7 - 10, h * 0.35 + 8, '#FFF', 'bold 16px Roboto');
            ESHelpers.text(ctx, '❤', w / 2 - 10, h * 0.35 + 8, '#D00', '24px Roboto');
            ESHelpers.circle(ctx, w / 2, h * 0.7, 30, '#D00'); ESHelpers.text(ctx, 'C', w / 2 - 8, h * 0.7 + 8, '#FFF', 'bold 16px Roboto');
            ESHelpers.line(ctx, w * 0.3, h * 0.35 + 35, w / 2, h * 0.7 - 30, '#00A', 2); ESHelpers.line(ctx, w * 0.7, h * 0.35 + 35, w / 2, h * 0.7 - 30, '#00A', 2);
            ESHelpers.text(ctx, 'Lokalna: klasycznie 2 rodzice', w / 2 - 110, h - 20, '#000', 'bold 14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['REK. LOKALNA', '2 RODZICÓW', 'KLASYCZNA']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s39_usrednianie(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h);
            const cx = w / 2, cy = h / 2, spread = 100 + Math.sin(frame * 0.03) * 50;
            for (let i = 0; i < 12; i++) { const angle = i * Math.PI * 2 / 12, x = cx + Math.cos(angle + frame * 0.01) * spread, y = cy + Math.sin(angle + frame * 0.01) * spread; ESHelpers.circle(ctx, x, y, 8, '#D00'); }
            ESHelpers.circleStroke(ctx, cx, cy, 15, '#0A0', 3); ESHelpers.circle(ctx, cx, cy, 8, '#0A0');
            ESHelpers.text(ctx, '← Centroid stabilny', cx + 25, cy + 5, '#0A0', 'bold 14px Roboto'); ESHelpers.text(ctx, 'Uśrednianie redukuje wariancję', w / 2 - 120, h - 20, '#000', '14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['EFEKT ŚREDNIEJ', 'STABILNOŚĆ', 'MNIEJSZY SZUM']);
            return requestAnimationFrame(draw);
        }
        return draw();
    }
};
if (typeof module !== 'undefined') module.exports = AnimRecomb;