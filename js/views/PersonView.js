App.Views.PersonView = Backbone.View.extend({
	el: $("#Person"),
	
	events: {
		"change #PersonInfo input" :"changed",
        "change #PersonInfo select" :"changed"
	},
	
	initialize: function(options) {
		// alert('person loading');
		_.bindAll(this, 'initAddPerson');
		this.$('input').attr('disabled', 'disabled');
	},
	
	loadPerson: function(e) {
		alert("Loading Person");
	},
	
	initAddPerson: function(e) {
		this.$('input').removeAttr('disabled');
		this.$('input').first().focus();
		this.model = new App.Models.Person;
		this.model.bind('change', function() {
			alert('saved');
		})
		this.collection.add(this.model);
	},
	
	changed: function(e) {
		var data = {};
		data[e.currentTarget.id]=e.currentTarget.value;
		this.model.save(data);
	},
	
	test: function(e) {
		alert("Person "+e.id+" selected.");
	}
});
