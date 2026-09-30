document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const mobileToggle = header.querySelector('[data-mobile-menu-toggle]');
  const mobileNav = header.querySelector('[data-mobile-nav]');
  const mobileClose = header.querySelector('[data-mobile-menu-close]');
  const overlay = header.querySelector('[data-header-overlay]');
  const megaItems = [...header.querySelectorAll('[data-mega-item]')];

  const closeMegaMenus = () => {
    megaItems.forEach((item) => {
      item.classList.remove('is-open');
      const trigger = item.querySelector('[data-mega-trigger]');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  };

  const closeMobileNav = () => {
    if (!mobileNav || !mobileToggle) return;
    mobileNav.classList.remove('is-open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-is-open');
  };

  const openMobileNav = () => {
    if (!mobileNav || !mobileToggle) return;
    closeMegaMenus();
    mobileNav.classList.add('is-open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-is-open');
  };

  mobileToggle?.addEventListener('click', () => {
    if (mobileNav?.classList.contains('is-open')) closeMobileNav();
    else openMobileNav();
  });

  mobileClose?.addEventListener('click', closeMobileNav);
  overlay?.addEventListener('click', () => {
    closeMegaMenus();
    closeMobileNav();
  });

  megaItems.forEach((item) => {
    const trigger = item.querySelector('[data-mega-trigger]');
    trigger?.addEventListener('click', (event) => {
      event.preventDefault();
      const shouldOpen = !item.classList.contains('is-open');
      closeMegaMenus();
      if (shouldOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 990) {
        closeMegaMenus();
        item.classList.add('is-open');
        trigger?.setAttribute('aria-expanded', 'true');
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMegaMenus();
      closeMobileNav();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 990) closeMobileNav();
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('[data-mega-item]') && !event.target.closest('.desktop-nav')) closeMegaMenus();
  });

  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!form.matches('.quick-add-form')) return;
    event.preventDefault();
    fetch(form.action, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body: new URLSearchParams(new FormData(form)).toString()
    })
      .then((response) => response.json())
      .then((cart) => {
        const count = document.querySelector('[data-cart-count]');
        if (count && cart.item_count != null) count.textContent = cart.item_count;
      })
      .catch(() => form.submit());
  });
});
