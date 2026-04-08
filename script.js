(() => {
  const topbar = document.querySelector('[data-topbar]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');

  if (!topbar) return;

  const setScrolled = () => {
    const scrolled = (window.scrollY || document.documentElement.scrollTop || 0) > 6;
    topbar.classList.toggle('is-scrolled', scrolled);
  };

  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });

  if (navToggle && navLinks) {
    const setExpanded = (expanded) => {
      navToggle.setAttribute('aria-expanded', String(expanded));
      topbar.classList.toggle('is-open', expanded);
    };

    setExpanded(false);

    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      setExpanded(!expanded);
    });

    // Close after clicking a link (mobile).
    navLinks.addEventListener('click', (e) => {
      const a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      setExpanded(false);
    });

    // Close on Escape.
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setExpanded(false);
    });

    // Close when leaving mobile breakpoint (avoid "stuck open" state).
    const mql = window.matchMedia('(max-width: 720px)');
    const onChange = () => {
      if (!mql.matches) setExpanded(false);
    };
    if (mql.addEventListener) mql.addEventListener('change', onChange);
    else mql.addListener(onChange);
  }
})();
