(function(jQuery){
  jQuery.extend(jQuery.expr[':'], {
  	next: function(a){
  	  var fold = jQuery(window).width() + jQuery(window).scrollLeft();
      return fold <= (jQuery(a).offset().left + jQuery(a).width());
  	},
  	prev: function(a){
  	  var left = jQuery(window).scrollLeft();
      return left >= jQuery(a).offset().left;
  	}
  });
    
  jQuery.fn.scrollTo = function(options, callback){    
    var settings = {
      'speed' : 300
    };
    if ( options ) { 
      jQuery.extend( settings, options );
    }
    var offset = jQuery(this).offset();
    var scroll = offset.left-((jQuery(window).width()/2)-(jQuery(this).width()/2));
    if(scroll < 0 ){
      scroll = 0;
    }
    if (window.opera) {
      scrollElement = 'html';
    } else {
      scrollElement = 'html, body';
    }
    jQuery(scrollElement).animate({scrollLeft: scroll}, 300, callback);
    return this;
  }
    
})(jQuery);

jQuery(document).ready(function(){
  container.init();
  if(navigator.userAgent.match(/iPad/i) != null){
    container.touch_scroll();
  }
  
  jQuery(document).keyup(function(e){
    if(e.keyCode == '37'){
      e.preventDefault();
      container.prev();
    }
    if(e.keyCode == '39'){
      e.preventDefault();
      container.next();
    }
  });
  
  jQuery('button.next').click(function(){
    container.next();
    return false;
  });
  
  jQuery('button.prev').click(function(){
    container.prev();
    return false;
  });
  
  jQuery(window).scroll(function(){
    container.reset_buttons();
  });
});

var container = {
  scroll_speed: 300,
  init: function(){
    var window_width = jQuery(window).width(), container_width = 0, article_array, closest;
    jQuery('.container').children().each(function(index){
      var incl_margin = true;
      if(parseInt(jQuery(this).css('margin-left')) < 0 || parseInt(jQuery(this).css('margin-right')) < 0){
        var incl_margin = false;
      }
      var width = jQuery(this).outerWidth(incl_margin);
      container_width += width;
      jQuery(this).attr('data-index', index).attr('data-width', width);
      // iPad only
      if(navigator.userAgent.match(/iPad/i) != null){
        if(jQuery(this).find('.panel').height() < jQuery(this).find('.content').height()){
          jQuery(this).addClass('scrollable');
        }
      }
    });
    jQuery('.container').css({'width' : container_width+'px'});
    container.reset_buttons();
    if (window_width < container_width) {
    	jQuery('body').addClass('js');
    }
  },
  next: function(){
    if(jQuery('article:next:first').length != 0){
      jQuery('article:next:first').scrollTo({speed: container.scroll_speed}, function(){
        container.reset_buttons();
      });
    }
    return false;
  },
  prev: function(){
    if(jQuery('article:prev:last').length != 0){
      jQuery('article:prev:last').scrollTo({speed: container.scroll_speed}, function(){
        container.reset_buttons();
      });
    }
    return false;
  },
  reset_buttons: function(){
    if(jQuery(window).scrollLeft() === 0){
      jQuery('button.prev').addClass('disabled');
    } else {
      jQuery('button.prev').removeClass('disabled');
    }
    if(jQuery(window).scrollLeft()+jQuery(window).width() == jQuery('.container').outerWidth()){
      jQuery('button.next').addClass('disabled');
      
    } else {
      jQuery('button.next').removeClass('disabled');
    }
  }
 }
