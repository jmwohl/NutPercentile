App.Views.SettingsView = Backbone.View.extend({
	el: $("#settings"),
	
	events: {
		// "change input": "changedValue",
		// 		"change select": "changedValue"
		"click #s_save_btn": "saveSettings",
		"click #s_defaults_btn": "setToDefaults"
	},
	
	initialize: function() {
		
	},
	
	render: function() {
		
	},
	
	changedValue: function(e) {
		var data = {};
		data[e.currentTarget.name]=e.currentTarget.value;
		this.model.save(data);
	},
	
	saveSettings: function(e) {
		e.preventDefault();
		alert('saving settings');
	},
	
	setToDefaults: function(e) {
		e.preventDefault();
		alert('setting defaults');
	}
	
});