App.Views.SearchView = Backbone.View.extend({
	el: $("#search"),
	
	events: {
		"click #search_submit": "doSearch",
		"keydown input.#search_field": "handleEnterPress"
	},
	
	initialize: function(options) {
		_.bindAll(this, "toggleSearch", "render", "addOne");
		this.input = $("input#search_field");
		this.results = [];
		this._resultViews = [];
	},
	
	render: function() {
		// Re-rendering the search view means updating the search results table with the results list
		this.$(".search_results .table-row").remove();
		if(this.results.length) {
			this.results.forEach(this.addOne);
		}
	},
	
	addOne: function(person) {
		// alert(person.get('p_ln'));
		var view = new App.Views.TableRowView({model: person, templateID: "person-row-template"});
		this._resultViews.push(view);
		view.bind('select:search_result', personView.loadPerson);
		view.bind('select:search_result', this.toggleSearch);
		this.$(".search_results").append(view.render().el);
	},
	
	toggleSearch: function() {	
		this.el.slideToggle();
	},
	
	doSearch: function() {
		var q = this.input.val();
		if(!q) return;
		this.results = this.collection.filter(function(person) {
			
			var rx = new RegExp(q, "i");
			var ln = person.get("p_ln");
			var id = person.get("p_id");
			if(!ln || !id) return false;
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