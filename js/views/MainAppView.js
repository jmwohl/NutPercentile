App.Views.MainAppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#container"),

    // Our template for the line of statistics at the bottom of the app.
    // personTemplate: _.template($('#person-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
		"click .help_btn": "toggleHelp",
		"click .settings_btn": "toggleSettings"
	},

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
		
		// set the collection to be the person collection
		this.collection = new App.Collections.PersonCollection;
		
		// set up the settings model
		this.settings = new App.Models.Settings;
		
		// get the stored settings
		this.settings.fetch({
			success: function() {
				alert("settings fetched");
			},
			error: function() {
				alert("could NOT fetch settings");
			}
		});
		
		this.collection.fetch({
			success: function() {
				// alert('success');
			},
			error: function() {
				// alert('failure');
			}
		});
		// this.$('input').first().focus();
		_.bindAll(this, 'addAll', 'addOne');
		//this.input    = this.$("#new-todo");
		
		window.settingsView = new App.Views.SettingsView({model: this.settings});
		window.mainMenuView = new App.Views.MainMenuView;
		window.personView = new App.Views.PersonView({collection: this.collection});
		window.searchView = new App.Views.SearchView({collection: this.collection});
		
		mainMenuView.bind('toggle:search', searchView.toggleSearch);
		mainMenuView.bind('init:new_person', personView.initAddPerson);
		
    },

    // Re-rendering the App means updating the person list.
    render: function() {
		alert("re-rendered");
	},
	
	// Toggle help panel?
	toggleHelp: function() {
		alert('@TODO: toggle HELP panel');
	},
	
	// Toggle settings panel
	toggleSettings: function() {
		this.$('#settings').slideToggle();
	},

    // Add a single person item to the list by creating a view for it, and
    // appending its element to the `<table>`.
    addOne: function(person) {
		// alert("adding "+person.get("FirstName"));
		var view = new TableRowView({model: person, templateID: "person-row-template"});
		this.$("#PeopleList").append(view.render().el);
    },
    
    // Add all items in the **PeopleList** collection at once.
    addAll: function() {
		// alert("add all");
		PeopleList.each(this.addOne);
    },
    
    // // Generate the attributes for a new Todo item.
	newAttributes: function() {
		// alert(this.$('input#FirstName').val());
		return {
			FirstName: this.$('input#FirstName').val(),
			LastName: this.$('input#LastName').val(),
			Birthdate: this.$('input#Birthdate').val(),
		};
	},
    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
		if (e.keyCode != 13) return;
		var newPerson = PeopleList.create(this.newAttributes());
		// this.addOne(newPerson);
		this.$('input').first().focus();
		this.$('input').val('');
    },

	addNewPerson: function(e) {
		alert('Add New Person');
	}
  });
