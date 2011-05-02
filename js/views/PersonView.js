App.Views.PersonView = Backbone.View.extend({
	el: $("#Person"),
	
	events: {
		"blur #PersonInfo input": "savePerson"
	},
	
	initialize: function() {
		_.bindAll(this, 'initAddPerson');
		this.$('input').attr('disabled', 'disabled');
		// this.model.get('measurements').each(this.addOneAddress);
	},
	
	loadPerson: function(e) {
		alert("Loading Person");
	},
	
	initAddPerson: function(e) {
		this.$('input').removeAttr('disabled');
		this.$('input').first().focus();
	},
	
	savePerson: function(e) {
		// alert('Saving Person');
	},
	
	test: function(e) {
		alert('Person view tested');
	}
});
