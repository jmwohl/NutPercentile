$(function() {
	window.MeasurementCollection = Backbone.Collection.extend({
		model: Measurement,
		localStorage: new Store("measurements")
	});
});