/* 成緒官網 · 全站共用置頂 header（母片）
   用法：每頁 </body> 前加 <script src="/assets/site.js"></script>
   會注入統一 sticky header，並隱藏各頁原本不一致的 header（header.top / .cs-bar）。
   改這一支 → 全站 header 一起變。 */
(function () {
  var NAV = [
    { t: '服務', href: '/#services', cls: 'm-hide' },
    { t: '為什麼是成緒', href: '/#why', cls: 'm-hide' },
    { t: 'AI 應用知識', href: '/ai/', match: '/ai' },
    { t: '預約診斷', href: '/#contact', cls: 'cta' }
  ];

  var CSS = [
    /* 隱藏各頁原本的舊 header（保留 DOM、只是不顯示），改由本母片統一 */
    'header.top,.cs-bar{display:none!important}',
    '#cs-top{position:sticky;top:0;z-index:1000;background:#fff;border-bottom:1px solid #ece7df;box-shadow:0 1px 6px rgba(0,0,0,.04)}',
    '#cs-top .cst-wrap{max-width:1120px;margin:0 auto;padding:10px 24px;display:flex;align-items:center;gap:20px}',
    '#cs-top .cst-logo{display:block;flex:0 0 auto}',
    '#cs-top .cst-logo img{height:40px;width:auto;display:block}',
    '#cs-top nav{margin-left:auto;display:flex;align-items:center;gap:22px}',
    '#cs-top nav a{color:#3a3633;text-decoration:none;font-size:15px;font-weight:600;white-space:nowrap;transition:color .15s}',
    '#cs-top nav a:hover{color:#F58250}',
    '#cs-top nav a.cur{color:#F58250}',
    '#cs-top nav a.cta{background:#F58250;color:#fff;padding:8px 16px;border-radius:8px}',
    '#cs-top nav a.cta:hover{opacity:.9;color:#fff}',
    '@media(max-width:640px){#cs-top .cst-wrap{padding:8px 14px;gap:10px}#cs-top .cst-logo img{height:32px}#cs-top nav{gap:13px}#cs-top nav a{font-size:13.5px}#cs-top nav a.m-hide{display:none}#cs-top nav a.cta{padding:6px 12px}}'
  ].join('');

  function addIcon(rel, href, sizes) {
    if (document.querySelector('link[rel="' + rel + '"]')) return;
    var l = document.createElement('link'); l.rel = rel; l.href = href;
    if (sizes) l.setAttribute('sizes', sizes);
    document.head.appendChild(l);
  }

  function init() {
    if (document.getElementById('cs-top')) return;
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

    var path = location.pathname;
    var links = NAV.map(function (n) {
      var cur = n.match && path.indexOf(n.match) === 0 ? ' cur' : '';
      var cls = (n.cls ? n.cls : '') + cur;
      return '<a href="' + n.href + '"' + (cls.trim() ? ' class="' + cls.trim() + '"' : '') + '>' + n.t + '</a>';
    }).join('');

    var h = document.createElement('header');
    h.id = 'cs-top';
    h.innerHTML = '<div class="cst-wrap">' +
      '<a class="cst-logo" href="/" aria-label="成緒行銷 首頁">' +
      '<img src="/assets/cs-logo.png" alt="成緒行銷 CHENG SYU"></a>' +
      '<nav aria-label="主選單">' + links + '</nav></div>';
    document.body.insertBefore(h, document.body.firstChild);

    /* 補齊 icon（apple-touch＋高解析），Google/裝置抓得到 */
    addIcon('apple-touch-icon', '/assets/apple-touch-icon.png');
    addIcon('icon', '/assets/favicon-192.png', '192x192');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
