$(function () {

  $('.hot__list').slick({
    infinite: false,
    prevArrow: "<button type='button' class='hot__btn hot__btn--prev'><span class='sr-only'>Предыдущее предложение</span><svg class='hot__prev'><use xlink: href='../images/sprite.svg#icon-arrow-left'></use></svg></button>",

    nextArrow: "<button type='button' class='hot__btn hot__btn--next'><span class='sr-only'>Следующее предложение</span><svg class='hot__prev'><use xlink: href='../images/sprite.svg#icon-arrow-right'></use></svg></svg></button>"

  });

  $('.brend__list').slick({
    arrows: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    variableWidth: true,
    
  });

  $('.menu__catalog').on('click', function () {
    $('.menu__catalog').toggleClass('active');
  })

  $(".star").rateYo({    
    maxValue: 5,
    numStars: 1,
    starSvg: '<svg><use xlink:href="images/sprite.svg#star"></use></svg>',
    normalFill: '#C1C1C1',
    ratedFill: '#FFB800',
    starWidth: '16px'
  });
  

  var filterProduct = document.querySelector('[data-ref="filter-product"]');
  var filterPromo = document.querySelector('[data-ref="filter-promo"]');

  var config = {
    controls: {
      scope: 'local'
    }
  };

  var mixer1 = mixitup(filterProduct, config);
  var mixer2 = mixitup(filterPromo, config);

  /* var mixer = mixitup('.product__list'); */
  
});