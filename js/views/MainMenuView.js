App.Views.MainMenuView = Backbone.View.extend({
	el: $("#MainMenu"),
	
	events: {
		"click .add-person": "addNewPerson",
		"click .search": "toggleSearch"
	},
	
	initialize: function() {
		_.bindAll(this, "toggleSearch");
		// this.bind('click', this.toggleSearch);
	},
	
	// Add a new person record.
	addNewPerson: function() {
		// alert('test');
		this.trigger("initAddPerson");
	},
	
	// Toggle search view
	toggleSearch: function() {
		this.trigger("toggleSearch");
	}
});