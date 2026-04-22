const device = {
  type: null,
  init: function () {
    device.type =
      window.innerWidth > 1280 ? 'desktop' : window.innerWidth > 768 ? 'tablet' : 'mobile';
  },
};

const gnb = {
  header: null,
  tabs: null,
  nav: null,
  pageType: null,
  btnMenu: null,
  btnClose: null,
  menu: null,
  menuItem: null,
  menuItemBtn: null,
  menuItemList: null,
  lastScrollY: 0,
  scrollDelta: 6,
  init: function () {
    gnb.header = document.querySelector('.bi__header');
    gnb.nav = document.querySelector('.bi__nav');
    gnb.tabs = document.querySelector('.bi__tabs');
    gnb.pageType = document.querySelector('body').dataset.type || null;
    gnb.btnMenu = document.querySelector('.bi__menu');
    gnb.btnClose = document.querySelector('.nav__close');
    gnb.menu = document.querySelector('.nav__menu');
    gnb.menuItem = document.querySelectorAll('.menu__item');
    gnb.menuItemBtn = document.querySelectorAll('.item__button');
    gnb.menuItemList = document.querySelectorAll('.item__list');
    gnb.lastScrollY = window.scrollY;

    if (gnb.pageType === 'detail') {
      document.querySelector('main').classList.add('hide-before');
    } else {
      document.querySelector('main').classList.remove('hide-before');
    }

    gnb.btnMenu.addEventListener('click', (e) => {
      let target = e.currentTarget;
      target.classList.toggle('active');
      gnb.open();
    });

    gnb.btnClose.addEventListener('click', (e) => {
      gnb.close();
    });

    gnb.menuItemBtn.forEach((button) => {
      button.addEventListener('mouseenter', (e) => {
        let target = e.currentTarget;
        gnb.menuItem.forEach((item) => item.classList.remove('active'));
        target.parentNode.classList.add('active');
      });
    });

    gnb.menuItemList.forEach((list, index) => {
      const items = list.querySelectorAll('a');

      items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
      });
    });
  },
  open: function () {
    gnb.nav.classList.add('active');
    // const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    // gnb.nav.style.paddingRight = `${scrollBarWidth}px`;
    gnb.scrollLock('lock');
  },
  close: function () {
    gnb.menuItem.forEach((item) => item.classList.remove('active'));
    gnb.nav.classList.remove('active');
    gnb.scrollLock('unlock');
  },
  headerInvert: function (pos) {
    const headerHeight = gnb.header.offsetHeight + 300;

    if (pos > headerHeight) {
      gnb.header.classList.add('fix_header');
    } else {
      gnb.header.classList.remove('fix_header');
    }
  },
  headerDirection: function (pos) {
    if (!gnb.header || gnb.nav.classList.contains('active')) return;

    if (pos <= 0) {
      gnb.header.classList.remove('is-scroll-hidden');
      gnb.lastScrollY = 0;
      return;
    }

    if (pos > gnb.lastScrollY + gnb.scrollDelta) {
      gnb.header.classList.add('is-scroll-hidden');
    } else if (pos < gnb.lastScrollY - gnb.scrollDelta) {
      gnb.header.classList.remove('is-scroll-hidden');
    }

    gnb.lastScrollY = pos;
  },
  scrollLock: function (islock) {
    islock === 'lock'
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  },
  tabsOff: function () {
    gnb.tabs.remove();
    gnb.header.style.border = '0 none';
  },
};

window.addEventListener('scroll', function () {
  let pos = window.scrollY;
  const isIndexPage = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');
  if (gnb.pageType !== 'detail' && !isIndexPage) return;
  gnb.headerInvert(pos);
  gnb.headerDirection(pos);
});

// dial function
const dialObj = {
  dial: null,
  bg: null,
  size: null,
  btns: null,
  btnsTotal: null,
  btnsDistance: null,
  btnsInnerDistance: null,
  Descs: null,
  init: function () {
    dialObj.dial = document.querySelector('.dial__wrap');
    if (dialObj.dial === null) return;

    dialObj.bg = dialObj.dial.style.background;
    dialObj.size = dialObj.dial.offsetWidth;
    dialObj.btns = document.querySelectorAll('.dial__wrap button');
    dialObj.btnsTotal = dialObj.btns.length;
    dialObj.Descs = document.querySelectorAll('.dial__desc .dial-item');
    dialObj.btnsInnerDistance =
      device.type === 'desktop' ? 100 : device.type === 'tablet' ? 60 : 40;

    this.resp();

    dialObj.btns.forEach((button, index) => {
      button.addEventListener('click', (e) => {
        let target = e.currentTarget;
        let idx = index;

        dialObj.btns.forEach((btn) => btn.classList.remove('active'));
        target.classList.add('active');
        this.matchDescs(idx);
      });
    });
  },
  matchDescs: function (idx) {
    dialObj.Descs.forEach((desc) => desc.classList.remove('active'));
    dialObj.Descs[idx].classList.add('active');
    this.pagenation(idx);
  },
  pagenation: function (idx) {
    if (idx < 10) {
      document.querySelector('.pagenation .current').innerHTML = '0' + (idx + 1);
    } else {
      document.querySelector('.pagenation .current').innerHTML = idx + 1;
    }
  },
  resp: function () {
    let standard = 270;
    let interval = (360 / dialObj.btnsTotal).toFixed(4) * 1;
    dialObj.btnsDistance = dialObj.size / 2;

    dialObj.btns.forEach((btn, idx) => {
      let transformTemp = `translate(-50%, -50%) rotate(${standard.toFixed(4)}deg) translate(${
        dialObj.btnsDistance
      }px) rotate(-${standard.toFixed(4)}deg)`;
      let transformTemp2 = `translate(-50%, -50%) rotate(${standard.toFixed(4)}deg) translate(${
        dialObj.btnsInnerDistance
      }px) rotate(-${standard.toFixed(4)}deg)`;
      standard < 360 ? (standard += interval) : (standard += interval - 360);
      btn.style.transform = transformTemp;
      btn.childNodes[1].style.transform = transformTemp2;
    });
  },
};

// go to top
function goToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return false;
}

window.addEventListener('scroll', function () {
  let pos = window.scrollY;
  // gnb.headerInvert(pos);
});

// Tab menu click event
function tabsFunc(params) {
  const tabMenus = document.querySelectorAll('.tab__menu button');
  tabMenus.forEach((menu) => {
    menu.addEventListener('click', function () {
      const targetIndex = Array.from(tabMenus).indexOf(this);
      const targetItem = document.querySelector(
        `.tab__contents .item:nth-child(${targetIndex + 1})`,
      );
      const tabContents = document.querySelectorAll('.tab__contents .item');

      tabMenus.forEach((menu) => menu.classList.remove('active'));
      tabContents.forEach((item) => item.classList.remove('active'));

      this.classList.add('active');
      targetItem.classList.add('active');
    });
  });
}

// swiper
var swiperInstance = null;

function initSwiper(elem, options) {
  if (swiperInstance === null) {
    const element = document.querySelector(elem);
    element.classList.add('swiper');

    element.children[0].classList.add('swiper-wrapper');
    [].forEach.call(element.children[0].children, (item) => {
      item.classList.add('swiper-slide');
    });

    _options = options || {
      slidesPerView: 1,
      loop: false,
      spaceBetween: 10,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'progressbar',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 6, //브라우저가 768보다 클 때
          spaceBetween: 0,
        },
      },
    };

    swiperInstance = new Swiper('.swiper', _options);
  }
}

function destroySwiper(elem) {
  if (swiperInstance === null) return;
  swiperInstance.destroy();
  swiperInstance = null;

  const element = document.querySelector(elem);
  element.classList.remove('swiper');

  element.children[0].classList.remove('swiper-wrapper');
  [].forEach.call(element.children[0].children, (item) => {
    item.classList.remove('swiper-slide');
  });
}

function aniText() {
  const elements = document.querySelectorAll('.ani-text');
  elements.forEach(function (text) {
    text.innerHTML = text.textContent.replace(/\S/g, '<i>$&</i>');

    const items = text.querySelectorAll('i');
    items.forEach(function (item, index) {
      item.classList.add('num' + index);
      let delay = index / 14 + 0.8;
      item.style.animationDelay = delay + 's';
    });
  });
}

// header와 같이 다른 파일(html)을 불러올 때 이벤트리스너로 하면 DOM이 구성되기 전에 init이 실행되어 함수로 관리
function initCommon() {
  device.init();
  gnb.init();
  if (gnb.pageType === 'detail' && dialObj.dial === null) dialObj.init();
  tabsFunc();
  aniText();

  // ------- 데스크톱 상단 GNB 메가메뉴 구성 -------
  const tabs = document.querySelector('.bi__tabs');
  const headerEl = document.querySelector('.bi__header');
  const tabsEl = document.querySelector('.bi__tabs');
  const tabsWidth = tabsEl ? tabsEl.offsetWidth : 0;

  if (tabs) {
    if (!tabs.querySelector('.mega-menu')) {
      const mega = document.createElement('div');
      mega.className = 'mega-menu';

      const inner = document.createElement('div');
      inner.className = 'mega-menu__inner';
      mega.appendChild(inner);

      const topItems = tabs.querySelectorAll('.bi__tabs > ul > li');
      topItems.forEach((li) => {
        const submenu = li.querySelector('.submenu');
        const col = document.createElement('div');
        col.className = 'mega-menu__col';

        if (submenu) {
          // 서브메뉴 있는 경우 - 기존 방식
          const listClone = submenu.cloneNode(true);
          listClone.classList.remove('submenu');
          listClone.classList.add('mega-menu__list');
          col.appendChild(listClone);
        } else {
          // 서브메뉴 없는 경우 - 1depth a태그를 단독 아이템으로
          const topLink = li.querySelector('a');
          if (!topLink) return;

          const singleList = document.createElement('ul');
          singleList.className = 'mega-menu__list';

          const singleItem = document.createElement('li');
          const linkClone = topLink.cloneNode(true);
          singleItem.appendChild(linkClone);
          singleList.appendChild(singleItem);
          col.appendChild(singleList);
        }

        inner.appendChild(col);
      });

      tabs.appendChild(mega);

      const megaMenu = tabs.querySelector('.mega-menu');
      megaMenu.style.width = tabsWidth + 'px';
    }
  }
  document.querySelectorAll('.bi__tabs > ul > li > a').forEach((link) => {
    link.addEventListener('mouseenter', () => {
      document.body.classList.add('mega-open');
    });
  });

  // 헤더 영역에서 마우스가 완전히 벗어나면 메가메뉴 닫기
  if (headerEl) {
    headerEl.addEventListener('mouseleave', () => {
      document.body.classList.remove('mega-open');
    });
  }

  // 헤더 외부 클릭 시 메가메뉴 닫기
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.bi__header')) {
      document.body.classList.remove('mega-open');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const loadHTML = (selector, url, callback) => {
    fetch(url)
      .then((res) => res.text())
      .then((html) => {
        document.querySelector(selector).innerHTML = html;
        if (callback) callback();
      });
  };

  loadHTML('#header-include', '/pages/include/header.html', initCommon);
  loadHTML('#footer-include', '/pages/include/footer.html');
  loadHTML('#floating-menu-include', '/pages/include/floating-menu.html');
  window.addEventListener('resize', function () {
    device.init();
    dialObj.init();
    if (device.type === 'mobile') {
      gnb.tabs.style.display = 'none';
    } else {
      gnb.tabs.style.display = 'block';
      updateMegaMenuWidth();

      var tabs = document.querySelector('.bi__tabs');
      if (tabs) {
        var tabsWidth = tabs.offsetWidth;
        var megaMenu = tabs.querySelector('.mega-menu');
        if (megaMenu) {
          megaMenu.style.width = tabsWidth + 'px';
        }
      }
    }
  });
});

// 메가메뉴 너비 갱신 함수
function updateMegaMenuWidth() {
  var tabs = document.querySelector('.bi__tabs');
  if (!tabs) return;

  var tabsWidth = tabs.offsetWidth;

  // 0px 방어
  if (tabsWidth === 0) {
    requestAnimationFrame(updateMegaMenuWidth); // 렌더링 후 재시도
    return;
  }

  var megaMenu = tabs.querySelector('.mega-menu');
  if (megaMenu) {
    megaMenu.style.width = tabsWidth + 'px';
  }
}
