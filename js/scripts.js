(function ($) {
	$(document).ready(function () {
		"use strict";
		// HERO FADE
		var div = $('.header');
		$(window).on('scroll', function () {
			var st = $(this).scrollTop();
			div.css({ 'opacity': (1 - st / 500) });
		});

		var divs = $('.page-header');
		$(window).on('scroll', function () {
			var st = $(this).scrollTop();
			divs.css({ 'opacity': (1 - st / 400) });
		});


		// PARALLAX LAYERS
		$('#parallax').parallax({
			invertX: true,
			invertY: true,
			scalarX: 10,
			frictionY: .1
		});


		$('.navigation-menu ul li a').on('click', function (e) {
			e.preventDefault();
			var goTo = this.getAttribute("href");
			$("body").removeClass('overflow');
			$(".navigation-menu").removeClass('open');
			$('.sandwich-btn').toggleClass("open");
			setTimeout(function () {
				window.location = goTo;
			}, 1000);
		});


		$(window).scroll(function () {
			var windowTop = Math.max($('body').scrollTop(), $('html').scrollTop());
			$('section').each(function (index) {
				if (windowTop > ($(this).position().top - 100)) {
					if ($(this).hasClass('white')) {
						$('.sandwich-nav').css('filter', 'invert(1)');
					}
					else {
						$('.sandwich-nav').css('filter', 'invert(0)');
					}
				}
			});
		}).scroll();

		// SANDWICH BUTTON
		$('.sandwich-btn').on('click', function (e) {
			if ($(".navigation-menu").hasClass("open")) {
				$("body").removeClass('overflow');
				$(".navigation-menu").removeClass('open');
				$('.navigation-menu .black-layer').css('transition-delay', '0.4s');
				// $('.navigation-menu .green-layer').css('transition-delay', '0.8s');
			} else {
				$(".navigation-menu").addClass('open');
				$("body").addClass('overflow');
				$('.navigation-menu .black-layer').css('transition-delay', '0.4s');
				$('.navigation-menu .green-layer').css('transition-delay', '0s');
			}
			$(this).toggleClass("open");
		});

		// SMOOTH SCROLL
		$('.case-details .case-navbar ul li a').bind('click', function (event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1000, 'easeInOutExpo');
			event.preventDefault();
		});

	});	

	// PRELOADER
	var width = 100,
		perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
		EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
		time = parseInt((EstimatedTime / 1000) % 60, 10) * 100;

	$(".loadbar").animate({
		width: width + "%"
	}, time);

	function animateValue(id, start, end, duration) {

		var range = end - start,
			current = start,
			increment = end > start ? 1 : -1,
			stepTime = Math.abs(Math.floor(duration / range)),
			obj = $(id);

		var timer = setInterval(function () {
			current += increment;
			$(obj).text(current + "%");
			if (current == end) {
				clearInterval(timer);
			}
		}, stepTime);
	}

	setTimeout(function () {
		$("body").addClass("page-loaded");
	}, time);

	// DATA BACKGROUND IMAGE
	var pageSection = $(".bg-image");
	pageSection.each(function (indx) {
		if ($(this).attr("data-background")) {
			$(this).css("background-image", "url(" + $(this).data("background") + ")");
		}
	});

	// WOW ANIMATION 
	var wow = new WOW(
		{
			animateClass: 'animated',
			offset: 50
		}
	);
	wow.init();

	// MASONRY
	var $container = $('.works ul').imagesLoaded(function () {
		$container.isotope({
			itemSelector: '.works ul li',
			layoutMode: 'masonry'
		});
	});

	// ISOTOPE FILTER
	var $container = $('.works ul');
	$container.isotope({
		filter: '*',
		animationOptions: {
			duration: 750,
			easing: 'linear',
			queue: false
		}
	});

	$('.works-filter li a').on('click', function (e) {
		$('.works-filter li a.current').removeClass('current');
		$(this).addClass('current');

		var selector = $(this).attr('data-filter');
		$container.isotope({
			filter: selector,
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
			}
		});
		return false;
	});
})(jQuery);