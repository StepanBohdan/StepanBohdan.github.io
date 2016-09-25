var s3LP = {
	init: function(options) {
		if (options){
			this.is_cms = options.is_cms ? true : false;
		}
		this.initForms();

		lp_init($('body'));
	},
	initForms: function(parent) {
		var self = this;
		if (!parent) parent = document;
		if (!$(parent).is('[data-api-url][data-api-type=form]')) {
			parent = $(parent).find('[data-api-url][data-api-type=form]');
		}

		$(parent).each(function() {
			var obj = $(this);
			var form = obj.is("form") ? obj : obj.find("form");

			if (self.is_cms) {
				form.attr('title', JS_LP_FORM_NOTE).tooltip();
				form.submit(function() {
					return false;
				});
			} else {
				form.submit(function() {
					$.post(obj.data('api-url'), form.serialize(), function(response) {
						if (response.result.html) {
							var replacement = $(response.result.html.replace(/[\r\n]/g, '').replace(/<script[^>]*>.*?<\/script>/g, ''));
							if (!$(replacement).is('[data-api-url][data-api-type=form]')) {
								replacement = $(replacement).find('[data-api-url][data-api-type=form]');
							}
							obj.replaceWith(replacement);

                                                        $('input[data-datepicker]').val(' ');

							$('input[data-datepicker="calendar"]').datepicker({
								dateFormat: "dd.mm.yy"
							});
							
							$('input[data-datepicker="calendar-from"').datepicker({
								dateFormat: "dd.mm.yy",
								onClose: function( selectedDate ) {
								
									var $this = $(this),
										otherInput = $(this).parents('.field-value').find('input[data-datepicker="calendar-to"]'),
										valueInput = $(this).parents('.field-value').find('.init-calendar-interval1');
										
									otherInput.datepicker( "option", "minDate", selectedDate );
									
									if (otherInput.val() !="") {
										valueInput.val(selectedDate + ' -- ' + otherInput.val());
									}
									
								}
							});
							$('input[data-datepicker="calendar-to"').datepicker({
								dateFormat: "dd.mm.yy",
								onClose: function( selectedDate ) {
									var $this = $(this),
										otherInput = $(this).parents('.field-value').find('input[data-datepicker="calendar-from"]'),
										valueInput = $(this).parents('.field-value').find('.init-calendar-interval1');
										
									otherInput.datepicker( "option", "maxDate", selectedDate );
									
									if (otherInput.val() !="") {
										valueInput.val(otherInput.val() + ' -- ' + selectedDate);
									}
									
								}
							});

							var $captcha = replacement.find('input[name=_cn]');
							if ($captcha.length) {
								$.getScript('http://captcha.oml.ru/static/captcha.js?2', function() {
									var $d = replacement.find("[id^=s3_captcha_cn]");
									mgCaptcha.draw("/my/s3/captcha/get.php", ($d.length ? $d.get(0) : null));
								});
							}
							self.initForms(replacement);
						}
					});
					return false;
				});
			}
		})
	}
}