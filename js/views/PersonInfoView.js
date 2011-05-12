App.Views.PersonInfoView = Backbone.View.extend({
	el: $("#info"),
	
	events: {
		"change input": "changedValue"
	},
	
	initialize: function() {
		_.bindAll(this, 'render');
		
		this.template = _.template($("#person-info-template").html());
		
	},
	
	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		this.$('input').removeAttr('disabled');
		this.$('input').first().focus();
		
		// Add UI stuff
		// var dob = $('#p_dob_field');
		// 		alert('dob: '+dob.val());
		// 		dob.datepicker();
		return this;
	},
	
	changedValue: function(e) {
		var data = {};
		data[e.currentTarget.name]=e.currentTarget.value;
		this.model.save(data);
	},
	
	clearCurrent: function() {
		
	}
	
});