App.Views.HistoryView = Backbone.View.extend({
	el: $("#growth_chart"),
	
	initialize: function() {
		_.bindAll(this, 'render', 'addOne');
		this._measViews = [];
	},
	
	render: function() {
		// Re-rendering the search view means updating the search results table with the results list
		this.$(".search_results .table-row").remove();
		if(this.collection.length) {
			this.collection.forEach(this.addOne);
		}
	},

	addOne: function(measurement) {
		// alert(person.get('p_ln'));
		var view = new App.Views.TableRowView({model: measurement, templateID: "measurement-row-template"});
		this._measViews.push(view);
		//view.bind('select:meas_row', personView.loadMeasurement);
		//view.bind('select:meas_row', this.toggleSearch);
		measurement.bind('change', this.render);
		this.$(".search_results").append(view.render().el);
	},
});