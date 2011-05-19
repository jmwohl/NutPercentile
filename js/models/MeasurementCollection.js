App.Collections.MeasurementCollection = Backbone.Collection.extend({
	model: App.Models.Measurement,
	localStorage: new Store("measurements"),
	
	/*
	*	Return the measurements associated with a single Person
	*	@TODO: Sort results by date here?
	*/
	forPerson: function(personID) {
		var personMeasurements = this.filter(function(measurement) {
			return measurement.get('p_id') === personID;
		});
		var sortedMeasurements = _.sortBy(personMeasurements, function(meas) {
			// var now_ts = new Date().getTime();
			return parseInt(meas.get('m_date_ts'));
		})
		return sortedMeasurements;
	}
});