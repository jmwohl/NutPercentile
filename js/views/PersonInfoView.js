App.Views.PersonInfoView = Backbone.View.extend({
	el: $("#info"),
	
	events: {
		"change input": "changedValue"
	},
	
	initialize: function() {
		_.bindAll(this, 'render');
		
		this.template = _.template($("#person-info-template").html());
		
	},
	
	render: function() {
		var self = this;
		$(this.el).html(this.template(this.model.toJSON()));
		this.$('input').removeAttr('disabled');
		this.$('#p_fn_field').focus();
		
		// Add UI stuff
		var dob = $('#p_dob_field');
		// alert('dob: '+dob.val());
		dob.datepicker({
			changeMonth: true,
			changeYear: true,
			showMonthAfterYear: true,
			minDate: new Date(1910, 1, 1),
			maxDate: +0,
			yearRange: '1910:+0',
			onSelect: function(dateText, inst) {
				var dob_ts = new Date(dateText).getTime();
				// alert(dob_ts);
				self.model.save({p_dob_ts: dob_ts});
				$(this).trigger('change');
			}
		});
		return this;
	},
	
	changedValue: function(e) {
		var data = {};
		data[e.currentTarget.name]=e.currentTarget.value;
		this.model.save(data);
	},
	
	clearCurrent: function() {
		
	}
	
});