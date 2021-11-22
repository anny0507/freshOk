$(function () {

  $('.promo__list').slick({
    infinite: false
  });

  $('.button__catalog').on('click', function () {
    $('.button__catalog').toggleClass('active');
  })

  var mixer = mixitup('.product__list');

});