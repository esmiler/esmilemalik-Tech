/* esmilemalik.tech — progressive enhancement only.
   Every page works with JS disabled; this layer adds the nav drawer,
   the two-path chooser, and the contact form's mail composer. */
(function () {
  'use strict';

  /* ---- mobile nav ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- two-path chooser ----
     Without JS both panels render open, so nothing is hidden from a
     crawler or a reader. With JS, the cards act as tabs. */
  var chooser = document.querySelector('[data-chooser]');
  if (chooser) {
    var cards = Array.prototype.slice.call(chooser.querySelectorAll('[data-path]'));
    var panels = Array.prototype.slice.call(document.querySelectorAll('[data-panel]'));

    function select(name, focusPanel) {
      cards.forEach(function (c) {
        c.setAttribute('aria-selected', String(c.dataset.path === name));
      });
      panels.forEach(function (p) {
        p.hidden = p.dataset.panel !== name;
      });
      if (focusPanel) {
        var live = document.querySelector('[data-panel="' + name + '"]');
        if (live) live.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    cards.forEach(function (c) {
      c.addEventListener('click', function () { select(c.dataset.path, true); });
      c.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          var i = cards.indexOf(c);
          var next = cards[(i + (e.key === 'ArrowRight' ? 1 : cards.length - 1)) % cards.length];
          next.focus();
          select(next.dataset.path, false);
        }
      });
    });

    select(cards[0].dataset.path, false);
  }

  /* ---- contact form ----
     No backend yet, so the form composes a pre-filled email instead of
     silently failing. Swap the handler for a real endpoint when one exists. */
  var form = document.querySelector('[data-mailform]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var lines = [];
      ['name', 'email', 'org', 'interest', 'sector', 'timeline'].forEach(function (k) {
        var v = (data.get(k) || '').toString().trim();
        if (v) lines.push(k.charAt(0).toUpperCase() + k.slice(1) + ': ' + v);
      });
      var msg = (data.get('message') || '').toString().trim();
      if (msg) lines.push('', msg);

      var subject = 'Enquiry — ' + ((data.get('interest') || 'esmilemalik.tech').toString());
      var href = 'mailto:' + form.dataset.mailform +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));

      var status = form.querySelector('[data-form-status]');
      if (status) {
        status.textContent = 'Opening your mail app with the message pre-filled… if nothing happens, email ' + form.dataset.mailform + ' directly.';
      }
      window.location.href = href;
    });
  }

  /* ---- day / night toggle ----
     Three states: no stored choice follows the system; an explicit choice wins
     in both directions and persists. */
  var themeBtn = document.querySelector('[data-theme-toggle]');
  if (themeBtn) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');

    function effectiveTheme() {
      var attr = document.documentElement.getAttribute('data-theme');
      if (attr === 'light' || attr === 'dark') return attr;
      return mq.matches ? 'dark' : 'light';
    }

    function syncLabel() {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      var text = next === 'dark' ? 'Switch to night' : 'Switch to day';
      themeBtn.setAttribute('aria-label', text);
      themeBtn.setAttribute('title', text);
    }

    themeBtn.addEventListener('click', function () {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncLabel();
    });

    if (mq.addEventListener) mq.addEventListener('change', syncLabel);
    syncLabel();
  }

  /* ---- footer year ---- */
  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();
