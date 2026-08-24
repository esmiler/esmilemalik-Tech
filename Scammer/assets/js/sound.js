/* The Sound Branch — progressive enhancement only.
   Pages work fully without JS; this adds the nav drawer, the brief-form
   mail composer, and the footer year. */
(function () {
  'use strict';

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

  /* Brief / enquiry forms.
     No backend yet, so a submit composes a pre-filled email rather than
     failing silently. Replace with a real endpoint when one exists. */
  Array.prototype.forEach.call(document.querySelectorAll('[data-mailform]'), function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var warranty = form.querySelector('[data-warranty]');
      var status = form.querySelector('[data-form-status]');
      if (warranty && !warranty.checked) {
        if (status) status.textContent = 'Please confirm you own or have the right to submit the words you are sending.';
        warranty.focus();
        return;
      }

      var data = new FormData(form);
      var lines = [];
      data.forEach(function (value, key) {
        if (key === 'message' || key === 'story' || key === 'warranty') return;
        var v = value.toString().trim();
        if (v) lines.push(key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' ') + ': ' + v);
      });
      ['story', 'message'].forEach(function (k) {
        var v = (data.get(k) || '').toString().trim();
        if (v) lines.push('', v);
      });
      if (warranty) lines.push('', 'Ownership confirmed: yes');

      var href = 'mailto:' + form.dataset.mailform +
        '?subject=' + encodeURIComponent(form.dataset.subject || 'Sound enquiry') +
        '&body=' + encodeURIComponent(lines.join('\n'));

      if (status) {
        status.textContent = 'Opening your mail app with the brief pre-filled… if nothing happens, email ' + form.dataset.mailform + ' directly.';
      }
      window.location.href = href;
    });
  });

  /* ---- day / night toggle ----
     Three states: no stored choice follows the system, an explicit choice wins
     in both directions and persists. */
  var themeBtn = document.querySelector('[data-theme-toggle]');
  if (themeBtn) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');

    function effective() {
      var attr = document.documentElement.getAttribute('data-theme');
      if (attr === 'light' || attr === 'dark') return attr;
      return mq.matches ? 'dark' : 'light';
    }

    function label() {
      var next = effective() === 'dark' ? 'light' : 'dark';
      var text = next === 'dark' ? 'Switch to night' : 'Switch to day';
      themeBtn.setAttribute('aria-label', text);
      themeBtn.setAttribute('title', text);
    }

    themeBtn.addEventListener('click', function () {
      var next = effective() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      label();
    });

    /* if the visitor never chose, keep following the system */
    if (mq.addEventListener) mq.addEventListener('change', label);
    label();
  }

  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();
