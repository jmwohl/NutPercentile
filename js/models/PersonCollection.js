App.Collections.PersonCollection = Backbone.Collection.extend({
	model: App.Models.Person,
	localStorage: new Store("people")
});
