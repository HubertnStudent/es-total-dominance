// ES_SLIDES: Parallel ES (52-54)
const AnimParallel = {
    s52_wyspy(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const islands = [{ x: w * 0.2, y: h * 0.3, best: Math.random() * 100 }, { x: w * 0.8, y: h * 0.3, best: Math.random() * 100 }, { x: w * 0.5, y: h * 0.7, best: Math.random() * 100 }];
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, w, h);
            islands.forEach((isl, idx) => { ctx.beginPath(); ctx.arc(isl.x, isl.y, 50, 0, Math.PI * 2); ctx.fillStyle = `rgba(${50 + idx * 80}, 100, 200, 0.3)`; ctx.fill(); ctx.strokeStyle = '#FFF'; ctx.lineWidth = 2; ctx.stroke();
                for (let i = 0; i < 8; i++) { const angle = (frame * 0.02 + i / 8) * Math.PI * 2, r = 30 + Math.sin(frame * 0.1 + i) * 10, px = isl.x + Math.cos(angle) * r, py = isl.y + Math.sin(angle) * r; ESHelpers.circle(ctx, px, py, 4, '#FFF'); }
                ESHelpers.text(ctx, `Wyspa ${idx + 1}`, isl.x - 25, isl.y + 70, '#FFF', 'bold 12px Roboto'); ESHelpers.text(ctx, `f=${isl.best.toFixed(1)}`, isl.x - 20, isl.y + 85, '#0F0', '11px Roboto');
                isl.best = Math.max(0, isl.best - 0.1 + ESHelpers.randNorm(0, 0.5)); });
            ctx.setLineDash([5, 5]); islands.forEach((a, i) => islands.slice(i + 1).forEach(b => ESHelpers.line(ctx, a.x, a.y, b.x, b.y, 'rgba(255,255,255,0.2)', 1))); ctx.setLineDash([]);
            ESHelpers.text(ctx, 'Równoległa ewolucja na izolowanych wyspach', w / 2 - 140, h - 20, '#FFF', 'bold 12px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['ISLAND MODEL', 'RÓWNOLEGŁOŚĆ', 'IZOLACJA']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s53_migracja(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0; const islands = [{ x: w * 0.2, y: h / 2 }, { x: w * 0.5, y: h / 2 }, { x: w * 0.8, y: h / 2 }]; const migrants = [];
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, w, h);
            islands.forEach((isl, idx) => { ctx.beginPath(); ctx.arc(isl.x, isl.y, 45, 0, Math.PI * 2); ctx.fillStyle = 'rgba(100, 150, 200, 0.4)'; ctx.fill(); ctx.strokeStyle = '#FFF'; ctx.lineWidth = 2; ctx.stroke(); ESHelpers.text(ctx, `W${idx + 1}`, isl.x - 10, isl.y + 5, '#FFF', 'bold 16px Roboto'); });
            if (frame % 60 === 0) { const from = Math.floor(Math.random() * 3); let to = (from + 1 + Math.floor(Math.random() * 2)) % 3; migrants.push({ fromIdx: from, toIdx: to, progress: 0 }); }
            migrants.forEach(m => { const from = islands[m.fromIdx], to = islands[m.toIdx]; m.progress += 0.02; const px = from.x + (to.x - from.x) * m.progress, py = from.y + (to.y - from.y) * m.progress - Math.sin(m.progress * Math.PI) * 30; ESHelpers.circle(ctx, px, py, 6, '#0F0'); ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.quadraticCurveTo((from.x + to.x) / 2, from.y - 40, px, py); ctx.strokeStyle = 'rgba(0,255,0,0.3)'; ctx.lineWidth = 2; ctx.stroke(); });
            for (let i = migrants.length - 1; i >= 0; i--) if (migrants[i].progress >= 1) migrants.splice(i, 1);
            ESHelpers.text(ctx, '🧬 Migracja = wymiana genów', w / 2 - 90, h - 20, '#FFF', 'bold 14px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['MIGRACJA', 'WYMIANA', 'DYWERSYFIKACJA']);
            return requestAnimationFrame(draw);
        }
        return draw();
    },
    s54_topologia(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup;
        let frame = 0;
        function draw() {
            ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, w, h);
            const topologies = [{ name: 'RING', nodes: 4, cx: w * 0.25, cy: h * 0.5, edges: [[0, 1], [1, 2], [2, 3], [3, 0]] }, { name: 'STAR', nodes: 5, cx: w * 0.5, cy: h * 0.5, edges: [[0, 1], [0, 2], [0, 3], [0, 4]] }, { name: 'FULL', nodes: 4, cx: w * 0.75, cy: h * 0.5, edges: [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]] }];
            topologies.forEach(topo => { const nodePos = [], radius = 40; for (let i = 0; i < topo.nodes; i++) { if (topo.name === 'STAR' && i === 0) nodePos.push({ x: topo.cx, y: topo.cy }); else { const angle = (i / (topo.name === 'STAR' ? topo.nodes - 1 : topo.nodes)) * Math.PI * 2 - Math.PI / 2; nodePos.push({ x: topo.cx + Math.cos(angle) * radius, y: topo.cy + Math.sin(angle) * radius }); } }
                topo.edges.forEach(([a, b]) => { const pulse = Math.sin(frame * 0.05 + a) * 0.3 + 0.7; ESHelpers.line(ctx, nodePos[a].x, nodePos[a].y, nodePos[b].x, nodePos[b].y, `rgba(0,255,0,${pulse})`, 2); });
                nodePos.forEach(pos => ESHelpers.circle(ctx, pos.x, pos.y, 8, '#FFF')); ESHelpers.text(ctx, topo.name, topo.cx - 20, topo.cy + 70, '#FFF', 'bold 12px Roboto'); });
            ESHelpers.text(ctx, 'Topologia określa wzorzec migracji', w / 2 - 110, h - 20, '#FFF', 'bold 12px Roboto');
            ESHelpers.drawHUD(ctx, w, h, ['TOPOLOGIA', 'RING/STAR/FULL', 'MIGRACJA']);
            return requestAnimationFrame(draw);
        }
        return draw();
    }
};
if (typeof module !== 'undefined') module.exports = AnimParallel;