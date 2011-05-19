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
		_.bindAll(this, 'render', 'initSettings', 'resetSettings');
		
		
		// Settings
		this.initSettings();
		
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
		
		window.mainMenuView = new App.Views.MainMenuView;
		window.personView = new App.Views.PersonView({collection: this.collection});
		window.searchView = new App.Views.SearchView({collection: this.collection});
		
		
		// VIEW EVENT BINDINGS
		mainMenuView.bind('toggle:search', searchView.toggleSearch);
		// mainMenuView.bind('init:new_person', searchView.toggleSearch);
		mainMenuView.bind('init:new_person', personView.initAddPerson);
		
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
				// alert('success');
			},
			error: function() {
				self.settings.save();
				alert('Saving initial settings.');
			}
		});
		this.settings.bind('change', this.render);
		window.settingsView = new App.Views.SettingsView({model: this.settings});
		
		// Setup i18n UI
		// @TODO This will likely need to be adjusted when the full i18n is implemented
		var lang = this.settings.get('s_language');
		if(lang == "en") {
			lang = "";
		}
		$.datepicker.setDefaults($.datepicker.regional[lang]);
		
		this.render();
	},

    render: function() {
		// update the clinic name
		// alert("rendering main app view");
		this.$('#header h1.facility').text(this.settings.get('s_facility'));
		this.$('#stats_title').text(this.settings.get('s_reference'));
		this.$('#m_weight_label_a').text(this.settings.get('s_weight_units'));
		this.$('#m_height_label').text(this.settings.get('s_height_units'));
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
