App.Models.Settings = Backbone.Model.extend({
	localStorage: new Store("settings"),
	
	defaults: {
		s_facility: "My Clinic Name",
		s_language: "en",
		s_weight_units: "Pounds",
		s_height_units: "Inches",
		s_reference: "CDC 2000",
		s_hide_head: "",
		s_hide_arm: "",
		s_results_display_std: "on",
		s_results_display_z: "",
		s_results_display_stat: "",
		s_screen_display: "Standard"
	},
	
	initialize: function(options) {
		
	},
	
	resetToDefaults: function() {
		for(var key in this.defaults) {
			var item = {};
			item[key] = this.defaults[key];
			this.set(item);
		}
		this.save();
	}
});