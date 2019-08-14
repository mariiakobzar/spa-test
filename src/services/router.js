import Index from '../components/index';
import About from '../components/about';
import Shop from '../components/shop';
import Forum from '../components/forum';
import Contact from '../components/contact';
import Product from '../components/product';

/* global jQuery */

const Router = {
  '/': Index(),
  '/shop': Shop(),
  '/shop/product': Product(),
  '/about': About(),
  '/forum': Forum(),
  '/contact': Contact(),
};

const contentDiv = document.getElementById('app');
const homeLinks = document.getElementsByClassName('home-link');
const aboutLinks = document.getElementsByClassName('about-link');
const shopLinks = document.getElementsByClassName('shop-link');
const forumLinks = document.getElementsByClassName('forum-link');
const contactLinks = document.getElementsByClassName('contact-link');

function onNavItemClick(pathName) {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  contentDiv.innerHTML = Router[pathName];
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

window.onpopstate = () => {
  contentDiv.innerHTML = Router[window.location.pathname];
};

contentDiv.innerHTML = Router[window.location.pathname];

const $j = jQuery.noConflict();

$j('main').on('click', '.item', function (e) {
  const td = e.target.closest('.item--hover');
  if (!td) {
    window.sessionStorage.setItem('id', $j(this).data('id'));
    window.history.pushState({}, '/shop/product', `${window.location.origin}/shop/product`);
    contentDiv.innerHTML = Product();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
});

Array.from(homeLinks).forEach((el) => {
  el.addEventListener('click', () => {
    onNavItemClick('/');
  }, false);
});

Array.from(shopLinks).forEach((el) => {
  el.addEventListener('click', () => {
    onNavItemClick('/shop');
  }, false);
});

Array.from(aboutLinks).forEach((el) => {
  el.addEventListener('click', () => {
    onNavItemClick('/about');
  }, false);
});

Array.from(forumLinks).forEach((el) => {
  el.addEventListener('click', () => {
    onNavItemClick('/forum');
  }, false);
});

Array.from(contactLinks).forEach((el) => {
  el.addEventListener('click', () => {
    onNavItemClick('/contact');
  }, false);
});

export default Router;
