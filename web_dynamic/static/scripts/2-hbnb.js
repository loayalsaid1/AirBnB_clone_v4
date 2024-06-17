$(document).ready(function () {
  const amenities_object = new Object();
  const names = [];

  $('.amenities input[type="checkbox"]').change(function () {
    if (this.checked) {
      amenities_object[$(this).data('id')] = $(this).data('name');
      names.push($(this).data('name'));
    } else {
      delete amenities_object[$(this).data('id')];
      const index = names.indexOf($(this).data('name'));
      if (index > -1) {
        names.splice(index, 1);
      }
    }
    $('.amenities h4').text(names.join(', '));
  });

  $.get('http://localhost:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
});
