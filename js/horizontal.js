!(function($) {
  'use strict';

  var $slider = $('.scroll-slider'),
      $slides = $('.scroll-slide'),
      $sliderWrapper = $('.scroll-wrapper'),
      $firstSlide = $slides.first();

  var settings = {},
      scrollController = null,
      scrollTimeline = null,
      scrollScene = null;

  window.initializeHorizontalScroll = function() {
    settings = {
      slider: '.scroll-slider',
      sliderWrapper: '.scroll-wrapper',
      slides: '.scroll-slide',
      slideWidth: null,
      slideHeight: null,
    };

    setDimensions();

    $(window).on('resize', function() {
      clearTimeout(this.resizing);
      this.resizing = setTimeout(setDimensions, 250); 
    });
  };

  function setDimensions() {
    settings.slideWidth = $firstSlide.width();
    settings.sliderWidth = Math.ceil((settings.slideWidth * $slides.length));

    $sliderWrapper.width(settings.sliderWidth);

    setScene();
  }

  function setScene() {
    var xDist = -$slides.width() * ($slides.length - 1);
    scrollTimeline = new TimelineMax().to($sliderWrapper, 2, { x: xDist, ease: Power2.easeInOut });

    if (!scrollController) {
      scrollController = new ScrollMagic.Controller();
    }

    if (!scrollScene) {
      scrollScene = new ScrollMagic.Scene({
        triggerElement: settings.slider,
        triggerHook: "onLeave",
        duration: settings.sliderWidth
      })
      .setPin(settings.slider)
      .setTween(scrollTimeline)
      .addTo(scrollController);
    } else {
      scrollScene.refresh();
    }

    console.log("ScrollMagic initialized and scenes set up successfully.");
  }

})(jQuery);
