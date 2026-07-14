/* 成緒官網 v2 母片 JS：主題切換＋頂欄捲動描邊（子頁共用） */
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('v2theme');
  btn && btn.addEventListener('click', function () {
    var cur = root.getAttribute('data-theme');
    var next = cur ? (cur === 'dark' ? 'light' : 'dark')
                   : (matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark');
    root.setAttribute('data-theme', next);
  });
  var top = document.getElementById('v2top');
  if (top) {
    var onScroll = function () { top.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll(); addEventListener('scroll', onScroll, { passive: true });
  }
})();
