App.Views.SearchView = Backbone.View.extend({
	el: $("#Search"),
	
	events: {
		"click .search": "doSearch",
		"keydown input.search-field": "handleEnterPress"
	},
	
	initialize: function() {
		_.bindAll(this, "toggleSearch", "render");
		this.input = $("input.search-field");
		this.results = [];	
		this.render();
	},
	
	render: function() {
		// Re-rendering the search view means updating the search results table with the results list
		this.$(".results .table-row").remove();
		if(this.results.length) {
			this.results.forEach(this.addOne);
		}
	},
	
	addOne: function(person) {
		var self = this;
		var view = new TableRowView({model: person, templateID: "person-row-template"});
		view.bind('click', this.resultClick);
		this.$(".results").append(view.render().el);
	},
	
	toggleSearch: function() {
		alert('toggleSearch called');
		this.el.toggle();
	},
	
	doSearch: function() {
		var q = this.input.val();
		if(!q) return;
		this.results = this.model.filter(function(person) {
			
			var rx = new RegExp(q, "i");
			var ln = person.get("LastName");
			var id = person.get("id");
			return (ln.search(rx) != -1 || id.search(rx) != -1);
			if(ln.search(rx) != -1 || id.search(rx) != -1) {
				return true;
			}
		});
		this.render();
	},
	
	handleEnterPress: function(e) {
		if (e.keyCode != 13) return;
		this.doSearch();
    },

	resultClick: function(e) {
		alert('result clicked');
	},
	
	test: function(e) {
		alert('searchViewTest');
	}
});