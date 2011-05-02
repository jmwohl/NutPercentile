$(function() {
	App.Views.TableView = Backbone.View.extend({
		el: $("#PeopleList"),
		tagName: "table",
		className: "table-view",

		initialize: function() {
			
		},
		
		render: function() {
			this.model.forEach(function(item) {
				alert(item.get("FirstName"));
			});
		}
	});
});