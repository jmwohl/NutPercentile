App.Views.TableRowView = Backbone.View.extend({
	tagName: "tr",
	className: "table-row",

	events: {
		"mouseover": "highlight",
		"mouseout": "unhighlight",
		"click": "handleClick"
	},
	
	initialize: function(spec) {
		if (!spec || !spec.templateID || !spec.model) {
            throw "Requires a templateID and model to be passed on init.";
        }

		// default template for this view
	    this.template = _.template($("#"+spec.templateID).html());
	},
	
	render: function() {
		// alert('rendering table row');
		$(this.el).html(this.template(this.model.toJSON()));
		// this.setContent();
		return this;
	},
	
	highlight: function() {
		// alert(this.el.html());
		$(this.el).css({background: '#ff0'});
	},
	
	unhighlight: function() {
		$(this.el).css({background: '#fff'});
	},
	
	handleClick: function() {
		this.trigger('clickTest', {id: this.model.get('id')});
	}
	
});
