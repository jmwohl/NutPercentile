var App = {
	Models: {},
	Collections: {},
    Views: {},
    Controllers: {},
    init: function() {
		window.mainMenuView = new App.Views.MainMenuView();
        window.searchView = new App.Views.SearchView();
		window.personView = new App.Views.PersonView();
        new App.Controllers.MainAppController();
        Backbone.history.start();
    }
};
