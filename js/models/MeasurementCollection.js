App.Collections.MeasurementCollection = Backbone.Collection.extend({
	model: App.Models.Measurement,
	localStorage: new Store("measurements"),
	
	forPerson: function(personID) {
		var personMeasurements = this.filter(function(measurement) {
			return measurement.get('p_id') === personID;
		});
		return personMeasurements;
	}
});