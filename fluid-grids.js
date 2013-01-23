
/**
 * FluidGrids Generator
 * @copyright 2013 James Hall and Harry Roberts
 * @license MIT 
 */
var FluidGrids = function() {
	/**
	 * Private properties
	 */

	var round = function(value, precision) {

		// Multiply number by amount we want our round precision to be
		var power = Math.pow(10, precision);
		var number = power * value;

		return Math.round(number) / power;

	};

	var getVal = function(selector) {
		return parseInt($(selector).val(), 10);
	};

	var calculate = function() {

		var data = {
			totalCols: getVal('#total-cols'),
			colWidth: getVal('#col-width'),
			gutterWidth: getVal('#gutter-width')
		};

		data.totalWidth  = data.totalCols * (data.colWidth + data.gutterWidth);	
		data.fluidGutterWidth = round((data.gutterWidth / data.totalWidth) * 100, 3);

		var template = swig.compile($('#css-template').html());

		var cols = [];
		for (i = 1; i <= data.totalCols; i++) {
			
			var cssWidth = round(
				((((i * data.colWidth) + (i * data.gutterWidth)) - data.gutterWidth) / data.totalWidth) * 100, 3
			);

			cols.push(cssWidth);
		}

		data.cols = cols;
		var output = template(data);
		$('textarea').val(output);
	};

	/**
	 * Public functions
	 */
	return {
		init: function() {
			// Attach event handlers
			$('#total-cols, #col-width, #gutter-width').change(function() {
				calculate();
			});

			calculate();
		}
	};
}();


$(document).ready(function() {
	FluidGrids.init();
});

