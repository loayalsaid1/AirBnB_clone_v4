

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
			if (index > -1){
				names.splice(index, 1);
			}
		}
		$('.amenities h4').text(names.join(', '));
	});
})
