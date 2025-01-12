// Initialize Lenis
const lenis = new Lenis({
    autoRaf: true,
  });
  
  // Listen for the scroll event and log the event data
  lenis.on('scroll', (e) => {
    console.log(e);
  });

  
const $lazyImgs = document.querySelector('img.js-lazy');
$lazyImgs.forEach(function(el) {
  el.Attribute(
    // https://png-pixel.com/ 需要統一做載入前的初預覽圖
    'src',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII='
  )
})

const lazyLoad = new LazyLoad({
  elements_selector: '.js-lazy',
  // 設定距離可視區(視窗)底部多遠觸發
  thresholder: 500,
  callback_loaded: function(){
  // 避免圖片載入之後，aos 進場動畫偵測跑掉
  // 因為有可能圖片載入前載入後的佔位不同高
  AOS.refresh();
  }
})

/* ----------------------------------- */
/* ------ Custom ------ */
/* ----------------------------------- */
const $nav = document.querySelector('.c-nav');
const $burger = document.querySelector('.o-burger');
let isNavOpened = false;

function toggleNav() {
  if(!isNavOpened) {
    lenis.stop();
    $nav.classList.add = ('is-opened');
    $burger.classList.add = ('is-opened');
    isNavOpened = true;
  } else {
    lenis.start();
    $nav.classList.remove = ('is-opened');
    $burger.classList.remove = ('is-opened');
    isNavOpened = false;
  }
}

// 解決 nav 打開時，又把視窗拉大到 nav 消失
// 會因為 lenis.stop(); 造成無法滾動
// 假設 md 才變漢堡選單，要把斷點改成 992px
window.matchMedia('(min-width: 1400px)').addEventListener('change', function(event) {
  // isNavOpened true 才有執行動作的必要
  if (isNavOpened) {
    if (event.matches) lenis.start();
    else lenis.stop();
  }
})

//增加 背景 scroll 時 變色

const $homeNews = document.querySelector('.l-home-news');
const $body = document.body;
window.addEventListener('scroll', function() {
  // getBoundingClientRect().top 偵測元素距離視窗頂部的數值
  const newsTop = $homeNews.getBoundingClientRect().top;
  const end = newsTop + $homeNews.offsetHeight / 2 //到一半變色
  if(newsTop <= 100 && end >= 0) {
    $body.classList.add('is-news-active');
  } else {
    $body.classList.remove('is-news-active');
  }
});




