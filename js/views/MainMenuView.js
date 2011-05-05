App.Views.MainMenuView = Backbone.View.extend({
	el: $("#main_menu"),
	
	events: {
		"click .new_person_btn": "addNewPerson",
		"click .search_btn": "toggleSearch"
	},
	
	initialize: function() {
		_.bindAll(this, "toggleSearch", "addNewPerson");
		// this.bind('click', this.toggleSearch);
	},
	
	// Add a new person record.
	addNewPerson: function(e) {
		e.preventDefault();
		// alert("MainMenuView.addNewPerson");
		this.trigger("init:new_person");
	},
	
	// Toggle search view
	toggleSearch: function(e) {
		e.preventDefault();
		this.trigger("toggle:search");
	}
});