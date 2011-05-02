App.Views.IndexView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#MainApp"),

	test: "test",
	
    // Our template for the line of statistics at the bottom of the app.
    // personTemplate: _.template($('#person-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
		"keydown #AddPerson": "addNewPerson"
	},

	test: function(e) {
		alert("up");
	},

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
		// set the model to be the person collection
		this.model = new PersonCollection;
		
		// this.$('input').first().focus();
		_.bindAll(this, 'addAll', 'addOne');
		//this.input    = this.$("#new-todo");
		
		window.mainMenu = new MainMenuView;
		window.searchView = new SearchView({model: this.model});
		window.personView = new PersonView;
		
		mainMenu.bind('toggleSearch', searchView.toggleSearch);
		mainMenu.bind('initAddPerson', personView.initAddPerson);
		searchView.bind('click', personView.test);
		// PeopleList.bind('add', this.addOne);
		// PeopleList.bind('refresh', this.addAll);

		// PeopleList.bind('all',     this.render);

		// Reteive locally stored data
		this.model.fetch();
    },

    // Re-rendering the App means updating the person list.
    render: function() {
		alert("re-rendered");
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
