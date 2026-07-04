// 公共 Header 注入器 - 3 种变体：home / detail / cases
(function() {
  const variant = document.body.dataset.headerVariant || 'home';

  const isHome = variant === 'home';
  const isDetail = variant === 'detail';

  const height = isHome ? 'h-20' : 'h-16';
  const logoSize = isHome ? 'w-10 h-10' : 'w-8 h-8';
  const textSize = isHome ? 'text-2xl' : 'text-xl';
  const imgShadow = 'drop-shadow-[0_0_10px_rgba(0,136,255,0.4)]';
  const logoHover = isHome ? 'group-hover:drop-shadow-[0_0_20px_rgba(0,136,255,0.6)] transition-all duration-300' : '';

  const backLink = isDetail
    ? '<a href="cases.html" class="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>返回案例列表</a>'
    : '<a href="/" class="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>返回首页</a>';

  const navHtml = isHome
    ? `<nav class="hidden md:flex items-center gap-8">
        <a href="#hero" class="text-sm font-medium text-gray-300 hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-accent-blue after:transition-all hover:after:w-full">首页</a>
        <a href="#services" class="text-sm font-medium text-gray-300 hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-accent-blue after:transition-all hover:after:w-full">核心服务</a>
        <a href="#portfolio" class="text-sm font-medium text-gray-300 hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-accent-blue after:transition-all hover:after:w-full">项目案例</a>
        <a href="#workflow" class="text-sm font-medium text-gray-300 hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-accent-blue after:transition-all hover:after:w-full">我们的优势</a>
        <a href="#contact" class="text-sm font-medium text-gray-300 hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-accent-blue after:transition-all hover:after:w-full">联系我们</a>
      </nav>`
    : backLink;

  const transition = isHome ? 'transition-all duration-300' : '';

  const header = document.createElement('header');
  header.className = `fixed top-0 left-0 right-0 z-50 bg-[#000000]/60 backdrop-blur-md border-b border-white/5 ${transition}`;
  header.innerHTML = `
    <div class="container mx-auto px-4 ${height} flex items-center justify-between">
      <a href="${isHome ? '#' : '/'}" class="flex items-center gap-3 group">
        <img src="/logo.png" alt="云芽引擎 Logo" class="${logoSize} object-contain ${imgShadow} ${logoHover}" />
        <span class="${textSize} font-bold tracking-widest text-white${isHome ? ' drop-shadow-md' : ''}">云芽引擎</span>
      </a>
      ${navHtml}
    </div>
  `;
  document.body.prepend(header);
})();
