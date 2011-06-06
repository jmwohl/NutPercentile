App.Views.PersonInfoView = Backbone.View.extend({
	el: $("#info"),
	
	events: {
		"change input": "changedValue",
		"click #save_person_btn": "savePersonInfo"
		// "blur input": "validateValue"
	},
	
	initialize: function() {
		_.bindAll(this, 'render', 'savePersonInfo');
		
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
	
	/*
	*	Saves data on the fly
	*/
	changedValue: function(e) {
		var data = {};
		data[e.currentTarget.name]=e.currentTarget.value;
		this.model.save(data);
	},
	
	/*
	*	Validate input values
	*/
	validateValue: function(e) {
		var field = $(e.currentTarget);
		if(field.attr('name') != 'p_dob') {
			var val = e.currentTarget.value;
			if(!val) {
				alert('This field can not be left blank');
				e.preventDefault();
				$(e.currentTarget).focus();
				return false;
			}
		}
	},
	
	
	/*
	*	If it's decided that we need a manual 'Save' button
	*/
	savePersonInfo: function(e) {
		console.log("saving person info");
		var data = {
			p_id: this.$('input [name="p_id"]').val(),
			p_sex: this.$('input [name="p_sex"]').val(),
			p_fn: this.$('input [name="p_fn"]').val(),
			p_ln: this.$('input [name="p_ln"]').val(),
			p_dob: this.$('input [name="p_dob"]').val()
		};
		this.model.save(data);
	},
	
	clearCurrent: function() {
		
	}
	
});