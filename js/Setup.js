var App = {
	Models: {},
	Collections: {},
    Views: {},
    Controllers: {},
    init: function() {
		window.mainMenuView = new App.Views.MainMenuView();
        window.searchView = new App.Views.SearchView();
		window.personView = new App.Views.PersonView();
        // new App.Controllers.MainAppController();		
    }
};

// localStorage.setItem('people', {"4d3c8535-9e4e-1922-c83f-a00452994b05":{"FirstName":"Frodo","LastName":"Baggins","Birthdate":"2011-04-16","id":"4d3c8535-9e4e-1922-c83f-a00452994b05"},"ae8be729-4246-111c-e9df-661db5d2ecbc":{"FirstName":"Jill","LastName":"Wetcoff","Birthdate":"Now","id":"ae8be729-4246-111c-e9df-661db5d2ecbc"},"d1373943-a280-c6cd-35bf-eb7c742d7b4b":{"FirstName":"Test","LastName":"Two","Birthdate":"2011-04-20","id":"d1373943-a280-c6cd-35bf-eb7c742d7b4b"},"034c5fb9-54bd-4784-c4f1-7f3099c8dac7":{"FirstName":"To","LastName":"Bagers","Birthdate":"2011-04-19","id":"034c5fb9-54bd-4784-c4f1-7f3099c8dac7"},"025e53f8-f20e-571b-729e-13f1fe81fe28":{"FirstName":"Finn","LastName":"Webag","Birthdate":"2011-04-25","id":"025e53f8-f20e-571b-729e-13f1fe81fe28"},"0a173f6b-3894-987a-49f4-eb178626ea33":{"FirstName":"Tim","LastName":"Begger","Birthdate":"2011-04-20","id":"0a173f6b-3894-987a-49f4-eb178626ea33"},"9b20b846-4c37-9a82-aa50-31f85ecb2d73":{"FirstName":"Frank","LastName":"Johnson","Birthdate":"2011-04-18","id":"9b20b846-4c37-9a82-aa50-31f85ecb2d73"},"89a4cde7-b163-e5c1-3039-58fc5a905742":{"FirstName":"Fill","LastName":"Johnston","Birthdate":"2011-04-19","id":"89a4cde7-b163-e5c1-3039-58fc5a905742"}});
