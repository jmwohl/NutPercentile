App.Views.SettingsView = Backbone.View.extend({
	el: $("#settings"),
	
	events: {
		// "change input": "changedValue",
		// 		"change select": "changedValue"
		"click #s_save_btn": "saveSettings",
		"click #s_defaults_btn": "setToDefaults",
		"change input": "changedValue",
		"change select": "changedValue"
	},
	
	initialize: function(options) {
		_.bindAll(this, 'render', 'setToDefaults');
		
		this.model.bind('change', this.render);
		
		this.render();
	},
	
	render: function() {
		var self = this;
		var inputs = this.$("input");
		var selects = this.$("select");
		
		inputs.each(function() {
			if(self.model.get($(this).attr('name')) !== undefined) {
				if($(this).attr('type') == 'text') {
					// fill text fields
					$(this).val(self.model.get($(this).attr('name')));
				} else if($(this).attr('type') == 'checkbox') {
					// checkboxes
					if(self.model.get($(this).attr('name')) == 'on') {
						$(this).attr('checked', 'checked');
					} else {
						// alert('uncheck '+$(this).attr('name'));
						$(this).removeAttr('checked');
					}
				} else if($(this).attr('type') == 'radio') {
					// radio buttons
					if($(this).val() == self.model.get($(this).attr('name'))) {
						$(this).attr('checked', 'checked');
					} else {
						$(this).removeAttr('checked');
					}
				}
			}
		});
		
		selects.each(function() {
			if(self.model.get($(this).attr('name')) !== undefined) {
				$(this).val(self.model.get($(this).attr('name')));
				//alert($(this).attr('name')+": "+$(this).val());
			}
		});

		return this;
	},
	
	modelChanged: function() {
		"model changed";
	},
	
	changedValue: function(e) {
		// alert(e.currentTarget.name+": "+e.currentTarget.value);
		var data = {};
		data[e.currentTarget.name]=e.currentTarget.value;
		this.model.save(data, {
			success: function() {
				// alert("saved");
			},
			error: function() {
				alert('NOT SAVED');
			}
		});
	},
	
	saveSettings: function(e) {
		e.preventDefault();
		// alert('saving settings');
	},
	
	setToDefaults: function(e) {
		e.preventDefault();
		confirm('Are you sure you want to reset the settings?');
		this.model.resetToDefaults();
	}
	
});