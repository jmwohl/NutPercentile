App.Views.MeasurementView = Backbone.View.extend({
	el: $("#measurements"),
	
	events: {
		"click #new_measurement_btn": "addMeasurement",
		"change input": "changedValue"
	},
	
	initialize: function() {
		_.bindAll(this, "render", "initMeasurement");
	},
	
	/**
	*	Render the measurement and stats view
	*
	*/
	render: function(settings) {
		if(settings) {
			this.$("#stats_title").text(settings.get('s_reference'));
		}
		var self = this;
		var inputs = this.$("input");
		var selects = this.$("select");
		if(this.model) {
			inputs.each(function() {
				if(self.model.get($(this).attr('name')) !== undefined) {
					if($(this).attr('type') == 'text') {
						// fill text fields
						$(this).val(self.model.get($(this).attr('name')));
					} else if($(this).attr('type') == 'checkbox') {
						// checkboxes
						if(self.model.get($(this).attr('name')) == 'on') {
							$(this).attr('checked', 'checked');
						} else {
							// alert('uncheck '+$(this).attr('name'));
							$(this).removeAttr('checked');
						}
					} else if($(this).attr('type') == 'radio') {
						// radio buttons
						if($(this).val() == self.model.get($(this).attr('name'))) {
							$(this).attr('checked', 'checked');
						} else {
							$(this).removeAttr('checked');
						}
					}
				}
			});			
		}
		return this;
	},
	
	changedValue: function(e) {
		var data = {};
		data[e.currentTarget.name]=e.currentTarget.value;
		this.model.save(data);
	},
	
	/* 
	*	Because we want the PersonView to store the MeasurementCollection, we'll pass this event along
	*	and deal with it in there.
	*
	*/
	addMeasurement: function(e) {
		e.preventDefault();
		this.trigger('addMeasurement');
	},
	
	/*
	*	Initialize a new measurement.  Make fields editable, clear fields, set focus to date field.
	*/
	initMeasurement: function() {
		// alert("MeasurementView: initMeasurement();");
		this.$('#col_left input').removeAttr('disabled');
		this.$('input').val("");
		this.$('input').first().focus();
		this.render();
	},
	
	/*
	*	Reset the measurement view: remove model data, re-render.
	*/
	reset: function() {
		alert("MeasurementView: reset();");
	}
	
});