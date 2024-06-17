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

  const url = 'http://localhost:5001/api/v1/places_search/';

  $.ajax({
    url: url,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      data.forEach(place => {
        const artcl = `
        <article>
				<div class="title_box">
					<h2>${place.name}</h2>
					<div class="price_by_night">\$${place.price_by_night}</div>
				</div>
				<div class="information">
					<div class="max_guest">${ place.max_guest } Guests</div>
					<div class="number_rooms">${place.number_rooms} Bedrooms</div>
					<div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
				</div>
				<div class="description">
					${place.description}
				</div>
			</article>
        `;
        $('section.places').append(artcl);
      });
    },
    error: function (error) {
      console.error('error');
    }
  });

  $('.filters button').click(() => {
    $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({amenities: Object.keys(amenities_object)}),
      success: function (data) {
        $('section.places').html('')
        data.forEach(place => {
          const filtered_amenities = `
          <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">\$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${ place.max_guest } Guests</div>
            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>
          `;
          $('section.places').append(filtered_amenities);
        });
      },
      error: function (error) {
        console.error('error');
      }
    });
  });

});
