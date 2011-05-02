App.Models.Person = Backbone.Model.extend({
	initialize: function (spec) {
	        if (!spec || !spec.FirstName || !spec.LastName || !spec.Birthdate) {
	            throw "InvalidConstructArgs";
	        }
	    }
});