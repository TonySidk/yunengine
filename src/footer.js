// 公共 Footer 注入器 - 2 种变体：home / simple
(function() {
  const variant = document.body.dataset.footerVariant || 'simple';
  const isHome = variant === 'home';

  const footer = document.createElement('footer');
  if (isHome) footer.id = 'contact';

  const simpleHtml = `
    <div class="container mx-auto px-6 relative z-10">
      <div class="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-lg font-display font-bold tracking-widest text-white">云芽引擎<span class="text-accent-blue">.</span></div>
        <div class="text-gray-500 text-sm">&copy; 2026 云芽引擎. 保留所有权利。 <span id="busuanzi_container_site_uv" class="text-gray-600">| 👁 <span id="busuanzi_value_site_uv"></span> 次访问</span></div>
      </div>
    </div>`;

  const fullHtml = `
    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-5xl mx-auto text-center mb-24 fade-in-up">
        <h2 class="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight">
          一个想法，一个微信，<br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-white">聊清楚。</span>
        </h2>
        <p class="text-lg md:text-xl text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed">
          不用填表，不用等回电——加微信把需求发过来，<br class="hidden sm:block" />24 小时内给你一份可落地的方案。
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button id="btnWechat" class="px-8 py-4 bg-gradient-to-r from-accent-blue to-accent-purple text-white font-semibold rounded-full flex items-center gap-2 group hover:scale-105 active:scale-95 transition-transform hover:shadow-[0_0_25px_rgba(0,136,255,0.4)]">
            <i class="fa-brands fa-weixin text-lg"></i>
            微信聊聊
            <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 mt-24">
        <div class="md:col-span-1">
          <a href="#" class="text-2xl font-bold flex items-center mb-4">
            <img src="/logo.png" alt="云芽引擎" class="w-10 h-10 rounded-lg mr-3 object-contain drop-shadow-[0_0_10px_rgba(0,136,255,0.4)]" />
            <span class="text-white tracking-widest">云芽引擎</span>
          </a>
          <p class="text-gray-400 text-sm mb-6 leading-relaxed">专业承接网站开发、APP开发、小程序开发、定制化软件系统开发</p>
          <div class="flex space-x-3">
            <span class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent-blue/20 hover:text-accent-blue transition-all duration-300 transform hover:scale-110 cursor-default">
              <i class="fa-brands fa-weixin"></i>
            </span>
            <span class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent-purple/20 hover:text-accent-purple transition-all duration-300 transform hover:scale-110 cursor-default">
              <i class="fa-brands fa-github"></i>
            </span>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-white mb-4">联系方式</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <i class="fa-solid fa-phone mt-1 mr-3 text-accent-blue"></i>
              <div><span class="text-gray-300 text-sm">电话/微信</span><p class="text-gray-400 text-sm">15656927018</p></div>
            </li>
            <li class="flex items-start">
              <i class="fa-solid fa-envelope mt-1 mr-3 text-accent-purple"></i>
              <div><span class="text-gray-300 text-sm">邮箱</span><p class="text-gray-400 text-sm">business@yunengine.cn</p></div>
            </li>
            <li class="flex items-start">
              <i class="fa-solid fa-location-dot mt-1 mr-3 text-accent-green"></i>
              <div><span class="text-gray-300 text-sm">地址</span><p class="text-gray-400 text-sm">安徽 · 合肥</p></div>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-white mb-4">服务项目</h3>
          <ul class="space-y-3">
            <li class="flex items-center text-gray-400"><i class="fa-solid fa-globe mr-3 text-accent-blue/70"></i><span>网站开发</span></li>
            <li class="flex items-center text-gray-400"><i class="fa-solid fa-mobile-screen mr-3 text-accent-purple/70"></i><span>小程序开发</span></li>
            <li class="flex items-center text-gray-400"><i class="fa-solid fa-tablet-screen-button mr-3 text-accent-green/70"></i><span>APP开发</span></li>
            <li class="flex items-center text-gray-400"><i class="fa-solid fa-code mr-3 text-accent-blue/70"></i><span>定制开发</span></li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-white mb-4">快速链接</h3>
          <ul class="space-y-3">
            <li><a href="#hero" class="flex items-center text-gray-400 hover:text-accent-blue transition-colors group"><i class="fa-solid fa-home mr-3 text-accent-blue/70"></i><span>首页</span></a></li>
            <li><a href="#services" class="flex items-center text-gray-400 hover:text-accent-green transition-colors group"><i class="fa-solid fa-laptop-code mr-3 text-accent-green/70"></i><span>核心服务</span></a></li>
            <li><a href="#portfolio" class="flex items-center text-gray-400 hover:text-accent-purple transition-colors group"><i class="fa-solid fa-briefcase mr-3 text-accent-purple/70"></i><span>案例展示</span></a></li>
            <li><a href="#workflow" class="flex items-center text-gray-400 hover:text-accent-blue transition-colors group"><i class="fa-solid fa-star mr-3 text-accent-blue/70"></i><span>我们的优势</span></a></li>
          </ul>
        </div>
      </div>

      <div class="pt-8 border-t border-white/10">
        <p class="text-gray-500 text-sm text-center">
          &copy; 2026 云芽引擎 (YunEngine). 保留所有权利。yunengine.cn <span id="busuanzi_container_site_uv">| 👁 <span id="busuanzi_value_site_uv"></span> 次访问</span>
        </p>
      </div>
    </div>`;

  footer.className = isHome ? 'pt-32 pb-12 relative overflow-hidden' : 'pt-16 pb-8 relative overflow-hidden';
  footer.innerHTML = isHome ? fullHtml : simpleHtml;
  document.body.appendChild(footer);

  // 不蒜子访问统计
  requestAnimationFrame(() => {
    const bs = document.createElement('script');
    bs.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    document.head.appendChild(bs);
  });
})();
