;(function($) {

	lp_init = function (block_wrapper) {

		var $win = $(window),
			$doc = $(document),
			$html = $(document.documentElement),
			isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

		block_wrapper.find('table').wrap('<div class="table-wrapper"></div>');

		block_wrapper.find('svg defs').each(function(){
			if ($(this).html()=='') {$(this).addClass('no-color')}
		});

		block_wrapper.find('[data-api-type=popup-form]').on('click', function(e) {
			var $this = $(this);

		   if (myo.show) {

				myo.show({
					json: $this.data('api-url'),
					onContentLoad: function (w) {
						s3LP.initForms($(this.bodyDiv));
					}
				});
			} else if (myo.open) {
				myo.open({
					json: $this.data('api-url'),
					onLoad: function (w) {
						s3LP.initForms($(this.bodyDiv));
					}
				});
			}

			e.preventDefault();
		});

		setTimeout(function(){
			var nav = block_wrapper.find('.menuDesktop__menuTop li a, .top-menu-two li a, .top-menu-five li a'),
				k = true,
				hash;

				nav.click(function() {
          if ($('html, body').is(':animated')) return false;
					hash = $(this).attr('href');
					if ($(hash).length) {
						k = false;

						nav.removeAttr('class');
						$(this).addClass('active');

						$('html, body').animate({
							scrollTop : $(hash).offset().top - nav.parents('.menu_wrapper_wr').height()
						}, 600, function() {
							setTimeout(function() {k = true}, 100);
						});
					}
					return false;
				});

				$(window).scroll(function() {
					if (k) {
						for (var i = 0; i < nav.length; i++) {
							hash = nav.eq(i).attr('href');
                            hash = hash.split('?')[0];
							if (hash.split('#').length > 1 && $(hash).length) {
								if ($(this).scrollTop() >= $(hash).offset().top - nav.parents('.menu_wrapper_wr').height()) {
									nav.removeAttr('class');
									nav.eq(i).addClass('active');
								};
							};
						};
					};
				});
		}, 300);

                block_wrapper.find('.gallery-inline').lightGallery({
			selector: '.item .pic a',
			thumbnail: false,
			download: false
		});

		function setEqualHeight(columns) {
		    var tallestcolumn = 0;
		    columns.removeAttr('style');
		    columns.each(function(){
		        currentHeight = $(this).height();
		            if(currentHeight > tallestcolumn) {
		                tallestcolumn = currentHeight;
		            }
		        }
		    );
		    columns.height(tallestcolumn);
		};

		resizeController([980, Infinity], function() {
		    setTimeout(function(){
		        setEqualHeight($(".tariffs_wrapper .tariff .text"));
		        setEqualHeight($(".tariffs_wrapper .tariff .title"));
		        setEqualHeight($(".tariffs_wrapper .tariff .price_wr .pr_title"));
		        setEqualHeight($(".tariffs_wrapper .tariff .price_wr"));
		    }, 300);
		});

                block_wrapper.on('click','.accordion .item .title', function(){
	            $(this).toggleClass('opened');
	            $(this).next().slideToggle();
                });

       resizeController([1024, Infinity], function() {
	       	setTimeout(function(){
	   			var top1 = $(document).scrollTop(),
			    panel = block_wrapper.find('.menu_wrapper.active'),
		      	fixedMenu = block_wrapper.find(".menu_wrapper_wr"),
		      	fixedMenufix = block_wrapper.find(".menu_wrapper_wr.active");

                        fixedMenufix.css('height', '49');

		      	if ($(window).scrollTop() == 0) {
		      		panel.addClass('fixed');
		      	}

				if (fixedMenu.length) {
				    $(window).scroll(function() {
				    	top1 = $(document).scrollTop();

						if (top1 >= fixedMenu.offset().top) {
					     	panel.addClass('fixed');
				        } else {
				             panel.removeClass('fixed');
				        };
				    });
				};
			},700);
		});

       setTimeout(function(){
            block_wrapper.find('.tariffs_wrapper .tariff .text').equalHeightResponsive();
		    block_wrapper.find('.tariffs_wrapper .tariff .title').equalHeightResponsive();
		    block_wrapper.find('.tariffs_wrapper .tariff .price_wr .pr_title').equalHeightResponsive();
            block_wrapper.find('.tariffs_wrapper .tariff .price_wr').equalHeightResponsive();
            block_wrapper.find('.clients_slider .cl_item').equalHeightResponsive();
        },150);

		block_wrapper.find('.burger_button').on('click', function(menu){
			block_wrapper.find('.menuDesktop').addClass('animit opened');
			$('html').addClass('overFlow');
		});

		block_wrapper.find('.menu_close').on('click', function(menu){
			block_wrapper.find('.menuDesktop').removeClass('opened');
			$('html').removeClass('overFlow');
		});

		$(document).on('click touchstart', function(menu){
		    if( $(menu.target).closest('.burger_button').length || $(menu.target).closest('.menuDesktop').length)
		      return;
		    block_wrapper.find('.menuDesktop').removeClass('opened');
			$('html').removeClass('overFlow');
		});

		block_wrapper.find('.top-menu-two').oneLineMenu();

		block_wrapper.find('.top-menu-five').oneLineMenu({
			minWidth: 740
		});


        block_wrapper.find('.menuDesktop__menuTop').oneLineMenu({
	    	left: -160,
            minWidth  : 1023
		});

        if (block_wrapper.find('.menuDesktop__menuTop li').length < 1) {
            block_wrapper.find(".menu_wrapper_wr").hide();
            block_wrapper.find(".burger_button").hide();
        } else {
            block_wrapper.find(".menu_wrapper_wr").show();
            block_wrapper.find(".burger_button").show();
        };

		block_wrapper.find('.dropdown-wrap').prepend('<span></span><span></span><span></span>');

		$(window).resize(function() {
			block_wrapper.find('.dropdown-wrap').prepend('<span></span><span></span><span></span>');
		});

		$(function(){
			block_wrapper.find('.time').timer({
				format_in : '%d.%M.%y %h:%m',
				format_out:'<div class="timePart">%d<span>дни</span></div><span class="colon">:</span><div class="timePart">%h<span>часы</span></div><span class="colon">:</span><div class="timePart">%m<span>минуты</span></div><span class="colon">:</span><div class="timePart">%s<span>секунды</span></div>',
				onEnd: function() {
					$(this).hide();
	                block_wrapper.find(".topBlock__countdownBlock .timeBlock").hide();
				}
			});
		});

		$(function(){
			block_wrapper.find('.timer2').timer({
				format_in : '%d.%M.%y %h:%m',
				format_out:'<div class="timePart">%d<span>дни</span></div><span class="colon">:</span><div class="timePart">%h<span>часы</span></div><span class="colon">:</span><div class="timePart">%m<span>минуты</span></div><span class="colon">:</span><div class="timePart">%s<span>секунды</span></div>',
				onEnd: function() {
					$(this).hide();
	                block_wrapper.find(".bot_timer_title").hide();
				}
			});
		});

		/* TARIFFS SLIDER */

		resizeController([0, 979], function() {
			if (block_wrapper.find('.tariffs .tariff').length>1){
			    block_wrapper.find('.tariffs').owlCarousel({
			        loop: true,
			        margin: 20,
			        nav: true,
			        dots: true,
			        smartSpeed: 600,
			        center:true,
			        items: 3,
			        autoWidth:true,
			        autoplay:true,
			        autoHeight : false,
			        responsive:{
					    0:{
					    	margin: 7
					    },

					    380:{
					    	margin: 20
					    }
					  }
			    });
			};
		});

		resizeController([980, Infinity], function() {
			block_wrapper.find('.tariffs').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
			block_wrapper.find('.tariffs').find('.owl-stage-outer').children().unwrap();
		});

		/* CLIENTS SLIDER */

		if (block_wrapper.find('.clients_slider .cl_item').length>=1){
		    block_wrapper.find('.clients_slider').owlCarousel({
		        loop: true,
		        margin: 0,
		        nav: true,
		        dots: false,
		        smartSpeed: 600,
		        autoplay:true,
		        autoHeight : false,
		        responsive:{
				    0:{
				    	items: 1
				    },

				    480:{
				    	items: 2
				    },
				    700:{
				    	items: 3
				    },
				    980:{
				    	items: 4
				    }
				}
		    });
		};

		/* REVIEWS SLIDER */

		if (block_wrapper.find('.rev_slider .rev_slide').length>1){
		    block_wrapper.find('.rev_slider').owlCarousel({
		        loop: false,
		        margin: 0,
		        nav: true,
		        dots: true,
		        smartSpeed: 600,
		        autoplay: false,
		        autoHeight : false,
		        responsive:{
				    0:{
				    	items: 1
				    }
				}
		    });
		};

		/* REVIEWS SLIDER */

		if (block_wrapper.find('.team_slider .t_slide').length>=1){
		    block_wrapper.find('.team_slider').owlCarousel({
		        loop: true,
		        margin: 0,
		        nav: false,
		        dots: true,
		        items: 4,
		        smartSpeed: 600,
		        autoplay:true,
		        autoHeight : false,
		        responsive:{
				    0:{
				    	items: 1
				    },

				    480:{
				    	items: 2
				    },
				    640:{
				    	items: 3
				    },
				    980:{
				    	items: 4
				    }
				}
		    });
		};

		/* SERTIFICATES SLIDER */

		resizeController([0, 979], function() {
			if (block_wrapper.find('.sert_block .sert').length>=1){
			    block_wrapper.find('.sert_block').owlCarousel({
			        loop: false,
			        nav: true,
			        dots: true,
			        smartSpeed: 600,
			        autoplay:true,
			        autoHeight : true,
			        responsive:{
					    0:{
					    	margin: 17,
					    	items: 3,
					    	autoWidth: true,
					    	center: true
					    },

					    480:{
					    	items: 2,
					    	margin: 15,
					    	autoWidth: false,
					    	center: false
					    },

					    640:{
					    	items: 3,
					    	margin: 16
					    },

					    768:{
					    	items: 4
					    }
					  },
					onInitialized : function() {
						block_wrapper.find('.sert_wrap').lightGallery({
							selector: '.owl-item > div > a',
							thumbnail: false,
							download: false
						});
					}
			    });
			};
		});

		resizeController([980, Infinity], function() {
			block_wrapper.find('.sert_block').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
			block_wrapper.find('.sert_block').find('.owl-stage-outer').children().unwrap();

            block_wrapper.find('.sert_wrap').lightGallery({
			    selector: 'div > a',
			    thumbnail: false,
					download: false
			});
		});

		/* GALLERY SLIDER */

		resizeController([0, 767], function() {

			block_wrapper.find('.gallery_but.inner').remove();

			if (block_wrapper.find('.gallery_block .gallery_pic').length>=1){
			    block_wrapper.find('.gallery_block').owlCarousel({
			        loop: true,
			        nav: true,
			        dots: true,
			        autoWidth: true,
			        smartSpeed: 600,
			        items: 3,
			        autoplay:true,
			        autoHeight : true,
			        center: true,
			        responsive:{
					    0:{
					    	margin: 10
					    },

					    480:{
					    	margin: 16
					    }
					},
					onInitialized : function() {
						block_wrapper.find('.gallery_block').lightGallery({
							selector: '.owl-item > div > a',
							thumbnail: false,
							download: false
						});
					}
			    });
			};
		});

		resizeController([768, Infinity], function() {
			block_wrapper.find('.gallery_block').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
			block_wrapper.find('.gallery_block').find('.owl-stage-outer').children().unwrap();

			block_wrapper.find('.gallery_block').lightGallery({
				selector: 'div.gallery_pic > a',
				thumbnail: false,
				download: false
			});
		});
	}

	function coords(str) {
		return str.split(',');
	}

	function init(options) {
		options.center = coords(options.center);

		$.each(options.data, function(key, item) {
			item.coords = coords(item.coords);
		});

		if (options.type == 'google') {

			google.maps.event.addDomListener(window, 'load', function() {

				var map = new google.maps.Map(document.getElementById(options.id), {
					zoom: 15,
					scrollwheel: false,
					center: new google.maps.LatLng(options.center[0], options.center[1])
				});

				$.each(options.data, function(key, item) {

					var marker = new google.maps.Marker({
						position: new google.maps.LatLng(item.coords[0], item.coords[1]),
						map: map,
						title: item.name
					});

					var infowindow = new google.maps.InfoWindow({
						content: '<div class="baloon-content">' +
									'<h3 style="margin: 0; padding-bottom: 3px;">' + item.name + '</h3>' +
									item.desc +
								 '</div>'
					});

					google.maps.event.addListener(marker, 'click', function() {
						infowindow.open(map, marker);
					});

				});
			});

		} else {

			ymaps.ready(function() {

				var map = new ymaps.Map(options.id, {
					center: options.center,
					zoom: options.zoom,
					behaviors: ['drag', 'rightMouseButtonMagnifier'],
				});

				map.controls.add(
					new ymaps.control.ZoomControl()
				);

				var MyBalloonContentLayoutClass = ymaps.templateLayoutFactory.createClass(
					'<div class="baloon-content" style="padding: 0 10px;">' +
						'<h3 style="margin: 0;">$[properties.name]</h3>' +
						'<p>$[properties.desc]</p>' +
					'</div>'
				);

				var myCollection = new ymaps.GeoObjectCollection();

				$.each(options.data, function(key, item) {
					myCollection.add(new ymaps.Placemark(
						item.coords,
						item,
						{balloonContentLayout: MyBalloonContentLayoutClass}
					));
				});

				map.geoObjects.add(myCollection);

			});
		}
	}

	window.mjsMap = init;

})(jQuery);