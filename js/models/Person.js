App.Models.Person = Backbone.Model.extend({
	initialize: function () {
		
    },

	verify: function() {
		return (this.get('p_id') && this.get('p_fn') && this.get('p_ln') && this.get('p_dob'));
	}
});