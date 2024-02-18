$(function () {
    $(".bicycles-slider, .slider__items").slick({
        arrows: false,
        dots: true,
        fade: true,
        autoplay: true,
        autoplaySpeed: 2000
    })

    $(".menu, .bicycles__column").on("click","a", function (event) {
		event.preventDefault();

		const id  = $(this).attr('href'),
		    top = $(id).offset().top;
		
		$('body,html').animate({scrollTop: top}, 1500);
	});
})