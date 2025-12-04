// ES_SLIDES_ENGINE - Navigation and animation dispatcher
(function () {
    'use strict';
    let currentSlide = 1, animId = null; const TOTAL_SLIDES = 60;
    const ANIM_MAP = {
        1: () => AnimIntro.s1_historia('canvas-1'), 2: () => AnimIntro.s2_floats('canvas-2'),
        3: () => Anim1p1.s3_init('canvas-3'), 4: () => Anim1p1.s4_mutacja('canvas-4'), 5: () => Anim1p1.s5_ocena('canvas-5'), 6: () => Anim1p1.s6_selekcja('canvas-6'), 7: () => Anim1p1.s7_petla('canvas-7'),
        8: () => AnimOneFifth.s8_regula('canvas-8'),
        9: () => AnimMuPlus.s9_populacja('canvas-9'), 10: () => AnimMuPlus.s10_reprodukcja('canvas-10'), 11: () => AnimMuPlus.s11_pula('canvas-11'), 12: () => AnimMuPlus.s12_sortowanie('canvas-12'), 13: () => AnimMuPlus.s13_odciecie('canvas-13'), 14: () => AnimMuPlus.s14_stagnacja('canvas-14'), 15: () => AnimMuPlus.s15_podsumowanie('canvas-15'),
        16: () => AnimMuComma.s16_starzenie('canvas-16'), 17: () => AnimMuComma.s17_nadmiarowosc('canvas-17'), 18: () => AnimMuComma.s18_smierc('canvas-18'), 19: () => AnimMuComma.s19_selekcja('canvas-19'), 20: () => AnimMuComma.s20_dynamika('canvas-20'),
        21: () => AnimAdvanced.s21_genotyp('canvas-21'), 22: () => AnimAdvanced.s22_lognormal('canvas-22'),
        23: () => AnimRecomb.s23_dyskretna('canvas-23'), 24: () => AnimRecomb.s24_posrednia('canvas-24'), 25: () => AnimRecomb.s25_sens('canvas-25'),
        26: () => AnimConstraints.s26_kara('canvas-26'), 27: () => AnimConstraints.s27_naprawa('canvas-27'),
        28: () => AnimExamples.s28_sfera('canvas-28'), 29: () => AnimExamples.s29_rastrigin('canvas-29'), 30: () => AnimExamples.s30_zbieznosc('canvas-30'), 31: () => AnimExamples.s31_porownanie('canvas-31'), 32: () => AnimExamples.s32_status('canvas-32'),
        33: () => AnimMutation.s33_gauss2d('canvas-33'), 34: () => AnimMutation.s34_korelacja('canvas-34'), 35: () => AnimMutation.s35_przyklad711('canvas-35'), 36: () => AnimMutation.s36_samoadaptacja('canvas-36'),
        37: () => AnimRecomb.s37_globalna('canvas-37'), 38: () => AnimRecomb.s38_lokalna('canvas-38'), 39: () => AnimRecomb.s39_usrednianie('canvas-39'),
        40: () => AnimStrategy.s40_eksploracja('canvas-40'), 41: () => AnimStrategy.s41_eksploatacja('canvas-41'), 42: () => AnimStrategy.s42_pulapki('canvas-42'), 43: () => AnimStrategy.s43_restart('canvas-43'),
        44: () => AnimCMA.s44_wstep('canvas-44'), 45: () => AnimCMA.s45_macierz('canvas-45'), 46: () => AnimCMA.s46_sciezka('canvas-46'),
        47: () => AnimMO.s47_wstep('canvas-47'), 48: () => AnimMO.s48_dominacja('canvas-48'), 49: () => AnimMO.s49_front('canvas-49'),
        50: () => AnimApps.s50_aero('canvas-50'), 51: () => AnimApps.s51_robot('canvas-51'),
        52: () => AnimParallel.s52_wyspy('canvas-52'), 53: () => AnimParallel.s53_migracja('canvas-53'), 54: () => AnimParallel.s54_topologia('canvas-54'),
        55: () => AnimMetrics.s55_koszt('canvas-55'), 56: () => AnimMetrics.s56_odpornosc('canvas-56'),
        57: () => AnimFuture.s57_hybrydy('canvas-57'), 58: () => AnimFuture.s58_neuro('canvas-58'), 59: () => AnimFuture.s59_podsumowanie('canvas-59'), 60: () => AnimFuture.s60_koniec('canvas-60')
    };
    function fallbackAnim(canvasId) {
        const setup = ESHelpers.setupCanvas(canvasId); if (!setup) return null; const { ctx, w, h } = setup; let frame = 0;
        function draw() { ESHelpers.clear(ctx, w, h); frame++; ctx.fillStyle = '#fafafa'; ctx.fillRect(0, 0, w, h); const t = frame * 0.01; for (let i = 0; i < 5; i++) { const x = w / 2 + Math.cos(t + i) * 100, y = h / 2 + Math.sin(t + i) * 100; ESHelpers.circle(ctx, x, y, 20 - i * 3, `hsl(${(frame + i * 50) % 360}, 70%, 50%)`); } ESHelpers.text(ctx, 'Animacja w przygotowaniu...', w / 2 - 100, h - 30, '#666', '14px Roboto'); return requestAnimationFrame(draw); }
        return draw();
    }
    function changeSlide(n) {
        if (n < 1) n = TOTAL_SLIDES; if (n > TOTAL_SLIDES) n = 1; currentSlide = n;
        if (animId) { cancelAnimationFrame(animId); animId = null; }
        document.querySelectorAll('.slide-container').forEach(s => s.classList.remove('active'));
        const targetSlide = document.getElementById('slide-' + n); if (targetSlide) targetSlide.classList.add('active');
        const currentCounter = document.getElementById('currentSlide'); if (currentCounter) currentCounter.textContent = n;
        const progressBar = document.getElementById('progressBar'); if (progressBar) progressBar.style.width = ((n / TOTAL_SLIDES) * 100) + '%';
        const prevBtn = document.getElementById('prevBtn'), nextBtn = document.getElementById('nextBtn'); if (prevBtn) prevBtn.disabled = (n === 1); if (nextBtn) nextBtn.disabled = (n === TOTAL_SLIDES);
        requestAnimationFrame(() => { requestAnimationFrame(() => { runAnimation(n); }); });
        window.location.hash = '#' + n;
    }
    function runAnimation(n) {
        const animFn = ANIM_MAP[n], canvasId = 'canvas-' + n;
        if (animFn && typeof animFn === 'function') { try { animId = animFn(); } catch (e) { console.warn(`Animation for slide ${n} failed:`, e); animId = fallbackAnim(canvasId); } }
        else { animId = fallbackAnim(canvasId); }
    }
    function handleKeyboard(e) {
        switch (e.key) {
            case 'ArrowRight': case ' ': case 'PageDown': changeSlide(currentSlide + 1); e.preventDefault(); break;
            case 'ArrowLeft': case 'PageUp': changeSlide(currentSlide - 1); e.preventDefault(); break;
            case 'Home': changeSlide(1); e.preventDefault(); break;
            case 'End': changeSlide(TOTAL_SLIDES); e.preventDefault(); break;
        }
        const num = parseInt(e.key); if (!isNaN(num)) changeSlide(num === 0 ? 10 : num);
    }
    let touchStartX = 0;
    function handleTouchStart(e) { touchStartX = e.touches[0].clientX; }
    function handleTouchEnd(e) { const diff = touchStartX - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) { if (diff > 0) changeSlide(currentSlide + 1); else changeSlide(currentSlide - 1); } }
    function init() {
        const hash = window.location.hash.replace('#', ''), initialSlide = parseInt(hash) || 1;
        document.addEventListener('keydown', handleKeyboard); document.addEventListener('touchstart', handleTouchStart, { passive: true }); document.addEventListener('touchend', handleTouchEnd, { passive: true });
        changeSlide(initialSlide); console.log('ES_SLIDES_ENGINE initialized. Total slides:', TOTAL_SLIDES);
    }
    window.ES_Engine = { changeSlide, getCurrentSlide: () => currentSlide, getTotalSlides: () => TOTAL_SLIDES, init };
    window.nextSlide = () => changeSlide(currentSlide + 1); window.prevSlide = () => changeSlide(currentSlide - 1); window.goToSlide = (n) => changeSlide(n); window.ESEngine = window.ES_Engine;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();