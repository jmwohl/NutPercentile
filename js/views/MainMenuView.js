App.Views.MainMenuView = Backbone.View.extend({
	el: $("#MainMenu"),
	
	// Delegated events for creating new items, and clearing completed ones.
    events: {
		"click .add-person": "addNewPerson",
		"click .search": "toggleSearch"
	},
	
	initialize: function() {
		_.bindAll(this, "toggleSearch");
	},
	
	// Add a new person record.
	addNewPerson: function() {
		this.trigger("initAddPerson");
	},
	
	// Toggle search view
	toggleSearch: function() {
		this.trigger("toggleSearch");
	}
});