// Free Home Printables — 2 free downloads a day, per visitor.
// Soft limit: counted in this browser only (localStorage, resets each day).
// A visitor who clears their browser data can download again — that is
// the best a plain static site can do without a server.
(function () {
  var LIMIT = 2;

  function todayKey() {
    var d = new Date();
    return 'fhp-downloads-' + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  function count() {
    try {
      return parseInt(localStorage.getItem(todayKey()) || '0', 10) || 0;
    } catch (e) {
      return 0;
    }
  }

  function bump() {
    try {
      localStorage.setItem(todayKey(), String(count() + 1));
    } catch (e) {}
  }

  document.addEventListener('click', function (ev) {
    var target = ev.target;
    var a = null;
    if (target && target.closest) {
      a = target.closest('a[href*="downloads/"]');
    }
    if (!a) return;
    if (count() >= LIMIT) {
      ev.preventDefault();
      alert('You have had your 2 free downloads for today. Please come back tomorrow for more.');
      return;
    }
    bump();
  });
})();
