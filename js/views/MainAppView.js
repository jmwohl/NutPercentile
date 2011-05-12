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
		// bind 'this' to appropriate methods
		_.bindAll(this, 'render', 'initializeSettings', 'resetSettings');
		
		
		// set the collection to be the person collection
		this.collection = new App.Collections.PersonCollection;
			
		this.collection.fetch({
			success: function() {
				// alert('success');
			},
			error: function() {
				alert('failure');
			}
		});
		
		// collection				
		// this.initializeSettings();
		
		// model
		this.initSettings();
		
		
		
		// _.bindAll(this, 'addAll', 'addOne');
		
		
		window.mainMenuView = new App.Views.MainMenuView;
		window.personView = new App.Views.PersonView({collection: this.collection});
		window.searchView = new App.Views.SearchView({collection: this.collection});
		
		
		// VIEW EVENT BINDINGS
		mainMenuView.bind('toggle:search', searchView.toggleSearch);
		mainMenuView.bind('init:new_person', personView.initAddPerson);
		
		// MODEL & COLLECTION EVENT BINDINGS
		
    },

	/*
	*	Initialize the settings model and settings view.
	*
	*/
	initSettings: function() {
		var self = this;
		this.settings = new App.Models.Settings({id: "S101"});
		this.settings.fetch({
			success: function() {
				alert('success');
			},
			error: function() {
				self.settings.save();
				alert('error');
			}
		});
		this.settings.bind('change', this.render);
		window.settingsView = new App.Views.SettingsView({model: this.settings});
		this.render();
	},

	/*
	*	Initialize settings COLLECTION
	*	DEPRECATED
	*
	*/
	initializeSettings: function() {
		
		// set up the settings model
		this.settings = new App.Collections.SettingCollection;
		
		// set default ID;
		var sID = "1000";
		// this.settings = new App.Models.Settings;
		var self = this;
		
		// get the stored settings
		this.settings.fetch({
			success: function() {
				// check for first-time run, set defaults:
				alert("sID: "+sID);
				if(!self.settings.get(sID)) {
					// Use a settings model — this allows for multiple settings presets feature, if desired
					this.settingsModel = self.settings.create(new App.Models.Settings({id: sID}));
					
					// Potentially trigger a first-time run popup
					alert('settings initialized');
				} else {
					alert('already initialized');
					this.settingsModel = self.settings.get(sID);
					alert("MainAppView settingsModel.s_facility: "+this.settingsModel.get('s_facility'));
				}
				
				// Setup bindings on settings model
				this.settingsModel.bind('change', self.render);
				
				window.settingsView = new App.Views.SettingsView({model: this.settingsModel});
				
				// Setup bindings on settings view
				settingsView.bind('resetSettings', self.resetSettings);
				
				// RENDER MAIN APP (only updates facility name)
				self.render();
			},
			error: function() {
				alert("could NOT fetch settings");
			}
		});
	},

    render: function() {
		// update the clinic name
		// alert("rendering main app view");
		this.$('#header h1.facility').text(this.settings.get('s_facility'));
		return this;
	},
	
	resetSettings: function() {
		// settingsView.model.destroy();
		// 		settingsView.model = this.settings.create(new App.Models.Settings);
		// 		settingsView.model.bind('change', this.render);
		settingsView.render();
		this.render();
	},
	
	// Toggle help panel?
	toggleHelp: function() {
		alert('@TODO: toggle HELP panel');
	},
	
	// Toggle settings panel
	toggleSettings: function() {
		this.$('#settings').slideToggle();
	}
  });
