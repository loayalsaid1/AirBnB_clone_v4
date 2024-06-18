$(document).ready(function () {
  const objects = {
    amenities: [],
    states: [],
    cities: []
  };

  const amenitiesNames = [];

  $('.amenities input[type="checkbox"]').change(function () {
    if (this.checked) {
      objects.amenities.push($(this).data('id'));
      amenitiesNames.push($(this).data('name'));
    } else {
      let index = amenitiesNames.indexOf($(this).data('name'));
      if (index > -1) {
        objects.amenities.splice(index, 1);
        amenitiesNames.splice(index, 1);
      }
    }
    $('.amenities h4').text(amenitiesNames.join(', '));
  });

  const statesCitiesNames = [];

  $('.locations input[type="checkbox"]').change(function () {
    const id = $(this).data('id');
    const name = $(this).data('name');
    const type = $(this).data('type');

    if (this.checked) {
      statesCitiesNames.push(name);
      if (type === 'state') {
        objects.states.push(id);
      } else {
        objects.cities.push(id);
      }
    } else {
      let index;
      if (type === 'state') {
        index = objects.states.indexOf(id);
        if (index > -1) {
          objects.states.splice(index, 1);
        }
        index = statesCitiesNames.indexOf(name);
        if (index > -1) {
          statesCitiesNames.splice(index, 1);
        }
      } else {
        index = objects.cities.indexOf(id);
        if (index > -1) {
          objects.cities.splice(index, 1);
        }
        index = statesCitiesNames.indexOf(name);
        if (index > -1) {
          statesCitiesNames.splice(index, 1);
        }
      }
    }
    $('.locations h4').text(statesCitiesNames.join(', '));
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
      data: JSON.stringify(objects),
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
