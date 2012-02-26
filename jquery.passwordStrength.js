(function($){
  var PasswordStrength = function(options, element) {
    var el   = $(element);
    var self = this;
  	options  = $.extend({
      container: '#password_strength',
      classes: {
        weak: 'password_weak',
        medium: 'password_medium',
        strong: 'password_strong'
      },
      messages: {
        weak: "Weak Password",
        medium: "Not so bad",
        strong: "Great Password"
      }
    }, options || {});

    self.countChars = function(passwordText) {
      var countResult = {
        size: passwordText.length,
        letters: 0,
        numbers: 0,
        otherChars: 0
      }
      for(var i=0;i<countResult.size;i++) {
        var curChar = passwordText[i];
        if (/[0-9]/.exec(curChar)) {
          countResult.numbers += 1;
        } else if (/[A-Za-z]/.exec(curChar)) {
          countResult.letters += 1;
        } else {
          countResult.otherChars += 1;
        }
      }
      return countResult;
    }

    self.removeAllClasses = function(curContainer) {
      curContainer.removeClass(options.classes.weak).removeClass(options.classes.medium).removeClass(options.classes.strong);
    }

	self.isCommon = function(password) {
	  var common = ['password','123456','12345678','qwerty','abc123','monkey','1234567','letmein','trustno1','dragon','baseball','111111','iloveyou','master','sunshine','ashley','bailey','passw0rd','shadow','123123','654321','superman','qazwsx','michael','football'];
	  return (common.indexOf(password) >= 0);
	}

    el.keyup(function(d){
      var countResult = self.countChars($(this).attr("value"));
      var curContainer = $(options.container);
	  var commonPass = isCommon($(this).attr("value"));

      self.removeAllClasses(curContainer);
      with(countResult) {
        if (!commonPass && size >= 8 && otherChars >= 1) {
          curContainer.addClass(options.classes.strong);
          curContainer.text(options.messages.strong);
        } else if (!commonPass && size >= 5 && letters >= 2 && numbers >= 2) {
          curContainer.addClass(options.classes.medium);
          curContainer.text(options.messages.medium);
        } else {
          curContainer.addClass(options.classes.weak);
          curContainer.text(options.messages.weak);
        }
      }
    });
  }

	$.fn.passwordStrength = function(options) {
		return this.each(function() {
			var element = $(this);
			var passwordStrength = new PasswordStrength(options, element);
			element.data('passwordStrength', passwordStrength);
		});
  }
})(jQuery);
