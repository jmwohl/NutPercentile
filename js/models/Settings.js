App.Models.Settings = Backbone.Model.extend({
	localStorage: new Store("settings"),
	
	defaults: {
		s_facility: "My Clinic Name",
		s_language: "en",
		s_weight_units: "Pounds",
		s_height_units: "Inches",
		s_reference: "cdc2000",
		s_hide_head: "",
		s_hide_arm: "",
		s_results_display_std: "selected",
		s_results_display_z: "",
		s_results_display_stats: "",
		s_screen_display: "Standard"
	},
	
	initialize: function () {
		
    }
});