(function($){
  $.fn.placeholder = function(){
	function nativeSupport() {
	  var i = document.createElement('input');
	  return 'placeholder' in i;
	}
	if (!nativeSupport()) {
	  $(this).focus(function(){
		if($(this).val() != $(this).attr("placeholder")) return;
		$(this).val("");
	  }).removeClass('placeholder').blur(function(){
		if($(this).val() !== '') return;
	    $(this).val($(this).attr("placeholder"));
	  }).addClass('placeholder');
	}
  };
  $(function() {
    $('textarea, input').placeholder();
  });
})(jQuery);
