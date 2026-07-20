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
