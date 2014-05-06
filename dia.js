

var DIA = (function(exports) {

	var overlay, modal, modalText, modalClose, confirmButtons, promptInput;

	var close = function() {
		overlay.hide();
		modal.hide();
		if (confirmButtons) {
			confirmButtons.remove();
			confirmButtons = null;
		}
		if (promptInput) {
			promptInput.remove();
			promptInput = null;
		}
	};

	var show = function() {
		overlay.show();
		modal.show();
	};

	var alert = function(msg) {
		modalText.text(msg);
		show();
	};

	var confirm = function(msg, callback, buttons, isPrompt) {
		if (!buttons) buttons = {OK:true, Cancel:false};
		html = '<div class="dia-buttons">';
		for (var key in buttons) {
			html += '<div class="dia-button" data-value="' + buttons[key] + '">' + key + '</div>';
		}
		html += '</div>';
		modal.append(html);
		confirmButtons = $('#dia-modal .dia-buttons');
		$('#dia-modal .dia-button').on('click', function() {
			if (isPrompt) callback(promptInput.val());
			else callback($(this).data('value'));
			close();
		});
		alert(msg);
	};

	var prompt = function(msg, callback, placeholder, buttons) {
		modal.append('<input class="dia-input" ' + ((placeholder) ? 'placeholder="' + placeholder + '"' : '') + ' />');
		promptInput = $('#dia-modal .dia-input');
		confirm(msg, callback, buttons, true);
	};

	var init = function() {
		var html = '<div id="dia-overlay"></div>';
		$('body').append(html);
		overlay = $('#dia-overlay');
		overlay.hide();
		html = '<div id="dia-modal"><div class="dia-close">x</div><div class="dia-text"></div></div>';
		$('body').append(html);
		modal = $('#dia-modal');
		modal.hide();
		modalText = $('#dia-modal .dia-text');
		modalClose = $('#dia-modal .dia-close');
		modalClose.on('click', close);
	};

	(function() {
		var link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('href', 'dia.css');
		document.getElementsByTagName('head')[0].appendChild(link);
		if (jQuery) {
			init();
			return;
		}
		console.log('loading jQuery');
		var script = document.createElement('script');
		script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js';
		document.getElementsByTagName('head')[0].appendChild(script);
		var checkReady = function(callback) {
			if (jQuery) callback(jQuery);
			else setTimeout(function() { checkReady(callback); }, 100);
		};
		checkReady(function($) {
			init();
		});
	}());

	exports.alert = alert;
	exports.confirm = confirm;
	exports.prompt = prompt;

	return exports;
}(DIA || {}));
