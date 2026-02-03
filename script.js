// 滚动时给 header 添加背景
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Index of work：点击显示作品页，Close 关闭
(function () {
  const navWork = document.getElementById('nav-work');
  const mainHome = document.getElementById('main-home');
  const workPanel = document.getElementById('work');
  const workClose = document.getElementById('work-close');

  if (!navWork || !mainHome || !workPanel || !workClose) return;

  function openWork(e) {
    if (e) e.preventDefault();
    mainHome.classList.add('is-hidden');
    mainHome.setAttribute('aria-hidden', 'true');
    workPanel.hidden = false;
    workPanel.classList.add('is-open');
    workPanel.setAttribute('aria-hidden', 'false');
    navWork.setAttribute('aria-expanded', 'true');
    navWork.classList.add('active');
    window.scrollTo(0, 0);
    if (history.pushState) history.pushState(null, '', '#work');
  }

  function closeWork() {
    mainHome.classList.remove('is-hidden');
    mainHome.setAttribute('aria-hidden', 'false');
    workPanel.hidden = true;
    workPanel.classList.remove('is-open');
    workPanel.setAttribute('aria-hidden', 'true');
    navWork.setAttribute('aria-expanded', 'false');
    navWork.classList.remove('active');
    if (history.pushState) history.pushState(null, '', document.location.pathname || '/');
  }

  navWork.addEventListener('click', openWork);
  workClose.addEventListener('click', closeWork);

  // 地址栏 #work 时直接打开作品页
  if (window.location.hash === '#work') {
    openWork();
  }
  window.addEventListener('hashchange', function () {
    if (window.location.hash === '#work') openWork();
    else closeWork();
  });

  window.addEventListener('popstate', function () {
    if (window.location.hash !== '#work') closeWork();
  });

  // 点击 logo 时若在作品页则关闭
  const logo = document.querySelector('.site-header .logo');
  if (logo) {
    logo.addEventListener('click', function (e) {
      if (workPanel.classList.contains('is-open')) {
        e.preventDefault();
        closeWork();
      }
    });
  }
})();

// 作品详情全屏浮层：点击作品打开浮层，内容在浮层内展示
(function () {
  const overlay = document.getElementById('work-overlay');
  const overlayBackdrop = document.getElementById('work-overlay-backdrop');
  const overlayContent = document.getElementById('work-overlay-content');
  const overlayClose = document.getElementById('work-overlay-close');
  const indexItems = document.querySelectorAll('.index-item');

  if (!overlay || !overlayContent) return;

  function openOverlay(item) {
    const noEl = item.querySelector('.index-no.eyebrow');
    const number = noEl ? noEl.textContent.trim() : '';
    const imgEl = item.querySelector('.index-media img');
    const imgSrc = imgEl ? imgEl.getAttribute('src') : '';
    const imageHtml = imgSrc
      ? '<div class="work-overlay-image" style="--ratio: 3/4;"><img src="' + imgSrc + '" alt=""></div>'
      : '<div class="work-overlay-image work-overlay-image--placeholder" style="--ratio: 3/4;"></div>';
    overlayContent.innerHTML =
      '<div class="work-overlay-layout">' +
        imageHtml +
        '<div class="work-overlay-body">' +
          '<p class="work-overlay-title">AAA</p>' +
          
          '<p class="work-overlay-title work-overlay-title--sub"> aaa </p>' +

          '<p class="work-overlay-placeholder">New brand identity and packaging for this company set up in 1880 to produce the best vegetable preserves ever. We worked on a new positioning focused on the gourmet channel both nationally and internationally, which has reinforced the company as a benchmark for innovation and wisdom.</p>' +
        '</div>' +
      '</div>';
    overlay.hidden = false;
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('open--modal');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () {
      overlay.classList.add('is-open');
    });
  }

  function closeOverlay() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () {
      document.body.classList.remove('open--modal');
      overlay.setAttribute('aria-hidden', 'true');
      overlay.hidden = true;
    }, 450);
  }

  indexItems.forEach(function (el) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openOverlay(el);
    });
  });

  if (overlayBackdrop) overlayBackdrop.addEventListener('click', closeOverlay);
  if (overlayClose) overlayClose.addEventListener('click', closeOverlay);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeOverlay();
  });
})();
