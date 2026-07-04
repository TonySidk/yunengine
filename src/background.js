// 公共背景注入器 - 减少 5 个 HTML 文件间的重复代码
(function() {
  const variant = document.body.dataset.bgVariant || 'subdued';
  const isMain = variant === 'main';

  const bg = document.createElement('div');
  bg.className = 'fixed inset-0 z-[-1] overflow-hidden bg-[#000000]';
  bg.innerHTML = `
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-slate-900 via-[#000000] to-[#000000] z-0"></div>
    <div class="absolute inset-0 ${isMain ? 'opacity-100' : 'opacity-60'} z-10 mix-blend-screen filter ${isMain ? 'blur-[80px]' : 'blur-[100px]'}">
      <div class="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full ${isMain ? 'bg-cyan-600/60' : 'bg-cyan-600/40'} animate-blob1"></div>
      <div class="absolute top-[20%] right-[-10%] w-[50%] h-[70%] rounded-full ${isMain ? 'bg-violet-600/60' : 'bg-violet-600/40'} animate-blob2"></div>
      <div class="absolute bottom-[-20%] left-[20%] w-[70%] h-[50%] rounded-full ${isMain ? 'bg-emerald-600/50' : 'bg-emerald-600/30'} animate-blob3"></div>
      <div class="absolute bottom-[-10%] right-[10%] w-[50%] h-[60%] rounded-full ${isMain ? 'bg-blue-700/60' : 'bg-blue-700/40'} animate-blob4"></div>
    </div>
    <div class="absolute inset-0 opacity-[0.04] mix-blend-overlay z-20 pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');"></div>
  `;
  document.body.prepend(bg);
})();
