import './services/router';
import './assets/styles/styles.scss';
import WOW from './assets/js/wow.min';

new WOW().init();

/* global jQuery */

(($) => {
  $(document).ready(() => {
    const maxWidth = window.matchMedia('(max-width: 480px)');

    function checkWidth(width) {
      if (width.matches) {
        $('.burger').removeClass('visually-hidden').css('position', 'relative');
      } else {
        $('.burger').addClass('visually-hidden').css('position', 'fixed');
      }
    }

    checkWidth(maxWidth);
    maxWidth.addListener(checkWidth);

    $('.burger').click(() => {
      $('.burger-menu').toggleClass('visually-hidden');
      $('.burger').toggleClass('burger--open');
    });

    $('.burger-menu__item').click(() => {
      $('.burger-menu').toggleClass('visually-hidden');
      $('.burger').toggleClass('burger--open');
    });

    $('main').on('click', '.filter-head', function () {
      $(this).next().toggleClass('visually-hidden');
      $(this).children('.plus').toggleClass('active');
    });

    function updateView(slider) {
      let startVal = parseInt($(slider).find('.bar').data('start'), 10);
      let endVal = parseInt($(slider).find('.bar').data('end'), 10);
      if (startVal > endVal) {
        endVal = startVal;
      }
      startVal = startVal || 0;
      endVal = endVal || 100;
      const values = [];
      for (let i = startVal; i <= endVal; i += 1) {
        values.push(i);
      }
      const l = $(slider).find('.lp').attr('data-pos');
      const r = $(slider).find('.rp').attr('data-pos');
      const x = $(slider).outerWidth() * l;
      const w = (r - l) * $(slider).outerWidth();
      $(slider).find('.bar').css({
        left: `${x}px`,
        width: `${w}px`,
      });
      let index = Math.round(values.length * l);
      if (index >= values.length) {
        index = values.length - 1;
      }
      $(slider).find('.lp').html(`<span>${values[index]}</span>`);
      index = Math.round(values.length * r);
      if (index >= values.length) {
        index = values.length - 1;
      }
      $(slider).find('.rp').html(`<span>${values[index]}</span>`);
    }

    $('main').on('click', '.filter-head-slider', () => {
      let drag = false;

      $('.slider').each((i, e) => {
        updateView(e);
      });
      $('.slider>.bar>.lp,.slider>.bar>.rp').bind('mousedown', function () {
        drag = $(this);
      });
      $(document).bind('mousemove', (e) => {
        if (!drag) return;
        let x = (e.pageX - $(drag).outerWidth() / 2 - $(drag)
          .parent()
          .parent()
          .offset()
          .left) / $(drag)
          .parent()
          .parent()
          .outerWidth();
        if (x < 0) x = 0;
        if (x > 1) x = 1;
        const rp = $(drag).parent().find('.rp');
        const lp = $(drag).parent().find('.lp');
        if ($(drag).hasClass('lp') && x > $(rp).attr('data-pos')) {
          $(rp).attr('data-pos', x);
        }
        if ($(drag).hasClass('rp') && x < $(lp).attr('data-pos')) {
          $(lp).attr('data-pos', x);
        }
        $(drag).attr('data-pos', x);
        updateView($(drag).parent().parent());
      });
      $(document).bind('mouseup', () => {
        drag = false;
        const lp = Math.round($('.lp').attr('data-pos') * 100);
        const rp = Math.round($('.rp').attr('data-pos') * 100);

        $('.item').filter(function () {
          return !(($(this).data('price').substr(1) > lp) && ($(this).data('price').substr(1) < rp));
        }).removeClass('active-price')
          .hide();

        $('.item').filter(function () {
          return (($(this).data('price').substr(1) > lp) && ($(this).data('price').substr(1) < rp));
        }).addClass('active-price')
          .filter('.active-filter')
          .show();

        if ($('.filter-color').children('.active-color-btn')[0]) {
          $('.active-filter').not('.active-color').hide();
        }
      });
    });

    $('.basket-content').click(() => {
      $('.cart').toggleClass('visually-hidden');
      $('.cart-btn').toggleClass('active');
      $('.cart-card').toggleClass('active');
    });

    $('.cart-btn').click(() => {
      $('.cart-btn').toggleClass('active');
      setTimeout(() => {
        $('.cart-card').toggleClass('active');
      }, 400);
      setTimeout(() => {
        $('.cart').toggleClass('visually-hidden');
      }, 850);
    });

    function addToCard(srcImg, name, quantity, price) {
      const item = $(`<div class="card-item">
      <div class="card-item__image">
        <img src="${srcImg}" alt="">
      </div>
      <div class="card-item-info">
        <h6 class="card-item-info__name">${name}</h6>
        <p class="card-item-info__q">QTY: ${quantity}</p>
        <p class="card-item-info__price">${price}</p>
        <i class="far fa-times-circle"></i>
      </div>
    </div>`);
      $('.cart-card__body').append(item);
      $('.q-view').addClass('visually-hidden');
      $('.basket__count').text($('.cart-card__body').children().length - 1);
    }

    $('.basket__count').text($('.cart-card__body').children().length - 1);

    $('.q-view #add-btn').click(() => {
      const srcImg = $('.q-view-card__img img').attr('src');
      const name = $('.q-view-card-info__title').text();
      const quantity = $('#input-quantity').val();
      const price = $('.q-view-card-info__price').text();
      addToCard(srcImg, name, quantity, price);
    });

    $('main').on('click', '#add-btn', () => {
      const srcImg = $('.product-image__img img').attr('src');
      const name = $('.product-info__title').text();
      const quantity = $('#input-quantity').val();
      const price = $('.product-info__price').text();
      addToCard(srcImg, name, quantity, price);
    });

    $('.cart-card__body').on('click', '.card-item-info i', function () {
      $(this).parent().parent().remove();
      $('.basket__count').text($('.cart-card__body').children().length - 1);
    });

    function openQuickView() {
      const srcImg = $(this).siblings('img').attr('src');
      const title = $(this).parent().parent().data('name');
      const price = $(this).parent().parent().data('price');
      const id = $(this).parent().parent().data('id');

      $('.q-view').removeClass('visually-hidden');
      $('.q-view-card__img img').attr('src', srcImg);
      $('.q-view-card-info__title').text(title);
      $('.q-view-card-info__price').text(price);
      $('.q-view-card-info__id span').text(id);
    }

    $('main').on('click', '.item--hover', openQuickView);

    $('.q-view').on('click', (e) => {
      if (e.target === $('#close-btn-q')[0] || e.target === $('.q-view')[0]) {
        $('.q-view').addClass('visually-hidden');
      }
    });

    function sortByNewest() {
      const items = $('.products-container .item');
      const arItems = $.makeArray(items);
      arItems.sort((a, b) => {
        const f = a;
        const s = b;
        return parseInt($(f).data('id'), 10) - parseInt($(s).data('id'), 10);
      });
      $(arItems).appendTo('.products-container');
    }

    function sortByPriceFromLow() {
      const items = $('.products-container .item');
      const arItems = $.makeArray(items);
      arItems.sort((a, b) => {
        const f = a;
        const s = b;
        return parseFloat($(f).data('price').substr(1), 10) - parseFloat($(s).data('price').substr(1), 10);
      });
      $(arItems).appendTo('.products-container');
    }

    function sortByPriceFromHigh() {
      const items = $('.products-container .item');
      const arItems = $.makeArray(items);
      arItems.sort((a, b) => {
        const f = a;
        const s = b;
        return parseFloat($(s).data('price').substr(1), 10) - parseFloat($(f).data('price').substr(1), 10);
      });
      $(arItems).appendTo('.products-container');
    }

    function sortByNameFromA() {
      const items = $('.products-container .item');
      const arItems = $.makeArray(items);
      arItems.sort((a, b) => {
        let f = a;
        let s = b;
        [f] = [$(f).data('name').split(' ')[0]];
        [s] = [$(s).data('name').split(' ')[0]];
        if (f < s) {
          return -1;
        }
        if (f > s) {
          return 1;
        }
        return 0;
      });
      $(arItems).appendTo('.products-container');
    }

    function sortByNameFromZ() {
      const items = $('.products-container .item');
      const arItems = $.makeArray(items);
      arItems.sort((a, b) => {
        let f = a;
        let s = b;
        [f] = [$(a).data('name').split(' ')[0]];
        [s] = [$(b).data('name').split(' ')[0]];
        if (f > s) {
          return -1;
        }
        if (f < s) {
          return 1;
        }
        return 0;
      });
      $(arItems).appendTo('.products-container');
    }

    function checkOption() {
      switch ($('#select-sort option:selected').text()) {
        case 'Newest':
          sortByNewest();
          break;
        case 'Price (low to high)':
          sortByPriceFromLow();
          break;
        case 'Price (high to low)':
          sortByPriceFromHigh();
          break;
        case 'Name A-Z':
          sortByNameFromA();
          break;
        case 'Name Z-A':
          sortByNameFromZ();
          break;
        default:
          break;
      }
    }

    $('main').on('change', '#select-sort', checkOption);

    function getAll() {
      if ($('.filter-color').children('.active-color-btn')[0]) {
        $('.item').addClass('active-filter').filter('.active-color').filter('.active-price')
          .show();
      } else {
        $('.item').addClass('active-filter').filter('.active-price').show();
      }
    }

    function getAllTypeFilter(filterName) {
      if ($('.filter-color').children('.active-color-btn')[0]) {
        $(`.item[data-type = "${filterName}"]`).addClass('active-filter').filter('.active-price').filter('.active-color')
          .show();
      } else {
        $(`.item[data-type = "${filterName}"]`).addClass('active-filter').filter('.active-price').show();
      }
      $(`.item[data-type != "${filterName}"]`).removeClass('active-filter').hide();
    }

    function getAllTagFilter(filterName) {
      if ($('.filter-color').children('.active-color-btn')[0]) {
        $(`.item[data-tag = "${filterName}"]`).addClass('active-filter').filter('.active-color').filter('.active-price')
          .show();
        $(`.item[data-tag != "${filterName}"]`).removeClass('active-filter').hide();
      } else {
        $(`.item[data-tag = "${filterName}"]`).addClass('active-filter').filter('.active-price').show();
        $(`.item[data-tag != "${filterName}"]`).removeClass('active-filter').hide();
      }
    }

    function fiterCollection() {
      $('.filter-collection a').removeClass('active-collection-btn');
      $(this).addClass('active-collection-btn');
      switch ($(this).attr('class').split(' ')[0]) {
        case 'allProducts':
          getAll();
          break;
        case 'allBras':
          getAllTypeFilter('bra');
          break;
        case 'allTops':
          getAllTypeFilter('top');
          break;
        case 'allLeggins':
          getAllTypeFilter('leggings');
          break;
        case 'allJackets':
          getAllTypeFilter('jacket');
          break;
        case 'allSports':
          getAllTypeFilter('shorts');
          break;
        case 'allNew':
          getAllTagFilter('New Arrival');
          break;
        case 'allBest':
          getAllTagFilter('Best Seller');
          break;
        default:
          break;
      }
    }

    $('main').on('click', '.filter-collection a', fiterCollection);

    function getAllByColor(colorName) {
      $(`.${colorName}`).toggleClass('active-color-btn');
      const allCurrentColor = $(`[data-color = "${colorName}"]`).toggleClass('active-color');
      allCurrentColor.filter('.active-filter').filter('.active-price').show();
      if ($('.filter-color').children('.active-color-btn')[0]) {
        $('.active-filter').not('.active-color').hide();
      } else {
        $('.active-filter').filter('.active-price').show();
      }
    }

    function filterColor() {
      switch ($(this).attr('class').split(' ')[0]) {
        case 'blue':
          getAllByColor('blue');
          break;
        case 'pink':
          getAllByColor('pink');
          break;
        case 'green':
          getAllByColor('green');
          break;
        case 'gray':
          getAllByColor('gray');
          break;
        case 'orange':
          getAllByColor('orange');
          break;
        case 'red':
          getAllByColor('red');
          break;
        case 'purple':
          getAllByColor('purple');
          break;
        default:
          break;
      }
    }

    $('main').on('click', '.filter-color button', filterColor);

    $('main').on('click', '.filter__title .far', () => {
      $('.filter').hide();
    });

    $('main').on('click', '.filter-btn', () => {
      $('.filter').show();
    });
  });
})(jQuery);
