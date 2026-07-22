// ---------- Mobile nav (hamburger) -------------------------------------
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  function closeMenu() {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close the menu after tapping a link
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMenu();
  });
})();

// ---------- Video lightbox ---------------------------------------------
(function () {
  var modal = document.getElementById('vidModal');
  if (!modal) return; // only present on pages with a video
  var frame = modal.querySelector('.vid-frame');
  var closeBtn = modal.querySelector('.vid-close');

  function open(id) {
    frame.innerHTML = '<iframe src="https://www.youtube.com/embed/' + id +
      '?autoplay=1&rel=0" title="Video" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    modal.classList.remove('open');
    frame.innerHTML = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-video]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      open(el.getAttribute('data-video'));
    });
  });
  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();

// ---------- Table of contents scroll-spy -------------------------------
(function () {
  var toc = document.querySelector('.toc');
  if (!toc) return; // only present on blog posts

  var links = Array.prototype.slice.call(toc.querySelectorAll('a'));
  var sections = links
    .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
    .filter(Boolean);
  if (!sections.length) return;

  function setActive(id) {
    links.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + id);
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(function (s) { observer.observe(s); });
})();
