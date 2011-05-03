App.Views.SearchView = Backbone.View.extend({
	el: $("#Search"),
	
	events: {
		"click .search": "doSearch",
		"keydown input.search-field": "handleEnterPress"
	},
	
	initialize: function(options) {
		_.bindAll(this, "toggleSearch", "render", "addOne");
		this.input = $("input.search-field");
		this.results = [];
		this._resultViews = [];
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
		// alert(person.get('p_ln'));
		var view = new App.Views.TableRowView({model: person, templateID: "person-row-template"});
		this._resultViews.push(view);
		view.bind('clickTest', personView.test);
		this.$(".results").append(view.render().el);
	},
	
	toggleSearch: function() {	
		this.el.toggle();
	},
	
	doSearch: function() {
		
		var q = this.input.val();
		if(!q) return;
		this.results = this.collection.filter(function(person) {
			
			var rx = new RegExp(q, "i");
			var ln = person.get("p_ln");
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