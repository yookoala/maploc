
/**
 * A very light weight jQuery extension
 * to selection location from map
 */

(function ($) {

  $.fn.maploc = function (options, params) {

    // apply defaults to options
    options = $.extend({
      mapOptions: {},
    }, options);

    return this.each(function () {

      // main DOM object to use
      var wrapper = this;

      // bind fields
      var $lat = $('#' + $(wrapper).data('lat'));
      var $lng = $('#' + $(wrapper).data('lng'));
      var initCenter = new google.maps.LatLng(
        parseFloat($lat.val()), parseFloat($lng.val()));

      // map variables
      var mapOptions = $.extend({
        center: initCenter,
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }, options.mapOptions);

      // Initialize the Google Map
      var map = new google.maps.Map(wrapper, mapOptions);
      var marker = new google.maps.Marker({
        map:       map,
        position:  initCenter,
        draggable: true,
      });

      // set marker location and data binding to given latLng
      var setLoc = function (latLng) {
        console.log('setLoc', latLng);
        marker.setPosition(latLng);
        $lat.val(latLng.lat());
        $lng.val(latLng.lng());
      }

      // set marker location on map right click
      google.maps.event.addListener(map, 'rightclick', function(e) {
        setLoc(e.latLng);
      });

      // set marker location on marker drag end event
      google.maps.event.addListener(marker, "dragstart", function (event) {
        marker.setAnimation(3); // raise
      });
      google.maps.event.addListener(marker, 'dragend', function(e) {
        setLoc(e.latLng);
        marker.setAnimation(4); // fall
      });

    });
  }

})(jQuery);
