const device = {
  type: null,
  init: function () {
    device.type =
      window.innerWidth > 1280 ? "desktop" : window.innerWidth > 768 ? "tablet" : "mobile";
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
  init: function () {
    gnb.header = document.querySelector(".bi__header");
    gnb.nav = document.querySelector(".bi__nav");
    gnb.tabs = document.querySelector(".bi__tabs");
    gnb.pageType = document.querySelector("body").dataset.type || null;
    gnb.btnMenu = document.querySelector(".bi__menu");
    gnb.btnClose = document.querySelector(".nav__close");
    gnb.menu = document.querySelector(".nav__menu");
    gnb.menuItem = document.querySelectorAll(".menu__item");
    gnb.menuItemBtn = document.querySelectorAll(".item__button");
    gnb.menuItemList = document.querySelectorAll(".item__list");

    if (gnb.pageType === "main") {
      this.tabsOff();
    }

    gnb.btnMenu.addEventListener("click", e => {
      let target = e.currentTarget;
      target.classList.toggle("active");
      gnb.open();
    });

    gnb.btnClose.addEventListener("click", e => {
      gnb.close();
      gnb.menuItem.style.visibility = "hidden";
      gnb.menuItem.style.transform = "translateY(3.125vw)";
      gnb.menuItem.style.opacity = 0;
    });

    gnb.menuItemBtn.forEach(button => {
      button.addEventListener("mouseenter", e => {
        let target = e.currentTarget;
        gnb.menuItem.forEach(item => item.classList.remove("active"));
        target.parentNode.classList.add("active");
      });
    });

    makeElemFadeUp(gnb.menuItem, 0.8, 30);

    gnb.menuItemList.forEach((list, index) => {
      const items = list.querySelectorAll("a");

      items.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
      });
    });
  },
  open: function () {
    gnb.nav.classList.add("active");
    // const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    // gnb.nav.style.paddingRight = `${scrollBarWidth}px`;
    gnb.scrollLock("lock");
  },
  close: function () {
    gnb.menuItem.forEach(item => item.classList.remove("active"));
    gnb.nav.classList.remove("active");
    gnb.scrollLock("unlock");
  },
  headerInvert: function (pos) {
    let isOverNav = gnb.header.offsetHeight <= pos;
    isOverNav ? gnb.header.classList.add("invert") : gnb.header.classList.remove("invert");
  },
  scrollLock: function (islock) {
    islock === "lock"
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  },
  tabsOff: function () {
    gnb.tabs.remove();
    gnb.header.style.border = "0 none";
  },
};

window.addEventListener("scroll", function () {
  let pos = window.scrollY;
  if (gnb.pageType !== "detail") return;
  gnb.headerInvert(pos);
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
    dialObj.dial = document.querySelector(".dial__wrap");
    if (dialObj.dial === null) return;

    dialObj.bg = dialObj.dial.style.background;
    dialObj.size = dialObj.dial.offsetWidth;
    dialObj.btns = document.querySelectorAll(".dial__wrap button");
    dialObj.btnsTotal = dialObj.btns.length;
    dialObj.Descs = document.querySelectorAll(".dial__desc .dial-item");
    dialObj.btnsInnerDistance =
      device.type === "desktop" ? 100 : device.type === "tablet" ? 60 : 40;

    this.resp();

    dialObj.btns.forEach((button, index) => {
      button.addEventListener("click", e => {
        let target = e.currentTarget;
        let idx = index;

        dialObj.btns.forEach(btn => btn.classList.remove("active"));
        target.classList.add("active");
        this.matchDescs(idx);
      });
    });
  },
  matchDescs: function (idx) {
    console.log(idx);
    dialObj.Descs.forEach(desc => desc.classList.remove("active"));
    dialObj.Descs[idx].classList.add("active");
    this.pagenation(idx);
  },
  pagenation: function (idx) {
    if (idx < 10) {
      document.querySelector(".pagenation .current").innerHTML = "0" + (idx + 1);
    } else {
      document.querySelector(".pagenation .current").innerHTML = idx + 1;
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
    // console.log(standard.toFixed(4) * 1);
  },
};

// go to top
function goToTop() {
  $("html, body").animate({ scrollTop: 0 }, 800);
  return false;
}

//window.addEventListener("scroll", function () {
//  let pos = window.scrollY;
//  if (gnb.pageType != null || gnb.pageType == "detail") {
//    gnb.headerInvert(pos);
//  }
//});

// Tab menu click event
function tabsFunc(params) {
  const tabMenus = document.querySelectorAll(".tab__menu button");
  tabMenus.forEach(menu => {
    menu.addEventListener("click", function () {
      const targetIndex = Array.from(tabMenus).indexOf(this);
      const targetItem = document.querySelector(
        `.tab__contents .item:nth-child(${targetIndex + 1})`,
      );
      const tabContents = document.querySelectorAll(".tab__contents .item");

      tabMenus.forEach(menu => menu.classList.remove("active"));
      tabContents.forEach(item => item.classList.remove("active"));

      this.classList.add("active");
      targetItem.classList.add("active");
    });
  });
}

// swiper
var swiperInstance = null;

function initSwiper(elem, options) {
  if (swiperInstance === null) {
    const element = document.querySelector(elem);
    element.classList.add("swiper");
    console.log(element.children[0].children);
    element.children[0].classList.add("swiper-wrapper");
    [].forEach.call(element.children[0].children, item => {
      item.classList.add("swiper-slide");
    });

    _options = options || {
      slidesPerView: 1,
      loop: false,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        type: "progressbar",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 6, //브라우저가 768보다 클 때
          spaceBetween: 0,
        },
      },
    };
    console.log(_options);
    swiperInstance = new Swiper(".swiper", _options);
  }
}

function destroySwiper(elem) {
  if (swiperInstance === null) return;
  swiperInstance.destroy();
  swiperInstance = null;

  const element = document.querySelector(elem);
  element.classList.remove("swiper");
  console.log(element.children[0].children);
  element.children[0].classList.remove("swiper-wrapper");
  [].forEach.call(element.children[0].children, item => {
    item.classList.remove("swiper-slide");
  });
}

function aniText() {
  const elements = document.querySelectorAll(".ani-text");
  elements.forEach(function (text) {
    text.innerHTML = text.textContent.replace(/\S/g, "<i>$&</i>");
    console.log(text.innerHTML);

    const items = text.querySelectorAll("i");
    items.forEach(function (item, index) {
      item.classList.add("num" + index);
      let delay = index / 14 + 0.8;
      item.style.animationDelay = delay + "s";
    });
  });
}

// 다중부모 하위 태그 delay 부여함수
function makeArrFadeUp(list, item) {
  const _list = list;
  _list.forEach((list, index) => {
    const _items = list.querySelectorAll(item);
    console.log(_items);

    _items.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.2}s`;
    });
  });
}

// 단일부모 하위 태그 delay 부여함수
function makeElemFadeUp(items, addDelay) {
  items.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2 + addDelay || 0}s`;
  });
}

////////////////////////////

window.addEventListener("DOMContentLoaded", function () {
  device.init();
  gnb.init();
  if (gnb.pageType === "detail" && dialObj.dial === null) dialObj.init();
  tabsFunc();
  aniText();
});

window.addEventListener("resize", function () {
  device.init();
  dialObj.init();
  if (device.type === "tablet" || device.type === "mobile") {
    gnb.tabs.style.display = "none";
  } else {
    gnb.tabs.style.display = "block";
  }
});
