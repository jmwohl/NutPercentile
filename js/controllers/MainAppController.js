App.Controllers.MainAppController = Backbone.Controller.extend({
	routes: {
        "":                         "index",
        "new":                      "newPerson",
		"person/:id": 				"editPerson",
		"search": 					"showSearch"
    },

	initialize: function() {
		var personCollection = new App.Collections.PersonCollection();
        personCollection.fetch({
            success: function() {
				alert("personCollection Loaded!");
				// window.mainMenuView = new App.Views.MainMenuView();
				//                 window.searchView = new App.Views.SearchView({ collection: personCollection });
				// 			window.personView = new App.Views.PersonView();
				mainMenuView.bind('toggleSearch', searchView.test);
            },
            error: function() {
				alert('personCollection failed to laod');
                new Error({ message: "Error loading documents." });
            }
        });
	},

    index: function() {
        
    },

    newPerson: function() {
        new App.Views.Edit({ model: new Person() });
    },
	
	showSearch: function() {
	}
});
