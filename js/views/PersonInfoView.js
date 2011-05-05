App.Views.PersonInfoView = Backbone.View.extend({
	el: $("#info"),
	
	events: {
		"change input": "changedValue"
	},
	
	initialize: function() {
		this.template = _.template($("#person-info-template").html());
	},
	
	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		this.$('input').removeAttr('disabled');
		this.$('input').first().focus();
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