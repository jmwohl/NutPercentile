App.Views.MeasurementView = Backbone.View.extend({
	el: $("#measurements"),
	
	events: {
		"click #new_measurement_btn": "addMeasurement",
		"change input": "changedValue",
		"click .left": "prevMeas",
		"click .right": "nextMeas",
		"click #calc_btn": "doStats"
	},
	
	initialize: function() {
		_.bindAll(this, "render", "initMeasurement", "calculateAge", "displayAge", "nextMeas", "prevMeas", "doStats", "renderStats");
	},
	
	/**
	*	Render the measurement and stats view
	*/
	render: function(settings) {
		if(settings) {
			this.$("#stats_title").text(settings.get('s_reference'));
		}
		var self = this;
		var inputs = this.$("input");
		var selects = this.$("select");
		if(this.model) {
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
		}
		
		// Setup UI stuff
		var m_date = $('#m_date_field');
		m_date.datepicker({
			minDate: new Date(1910, 1, 1),
			maxDate: +0,
			yearRange: '1910:+0',
			onSelect: function(dateText, inst) {
				var m_date_ts = new Date(dateText).getTime();
				// alert(dob_ts);
				$(this).trigger('change');
				self.model.save({m_date_ts: m_date_ts});
				self.calculateAge();
			}
		});
		return this;
	},
	
	/*
	*	Render calculated stats on screen.
	*/
	renderStats: function(stats) {
		// ["?", "l", "n", "h", "vh", " "]
		
		//height4age
		if(stats.ht4age != undefined) {
			this.$('#height_age_percentile').val(stats.ht4age.percentile);
			this.$('#height_age_z_score').val(stats.ht4age.zscore);
			this.$('#h4a_flag').text(stats.ht4age.flag);
		}
		//weight4age
		if(stats.wt4age != undefined) {
			this.$('#weight_age_percentile').val(stats.wt4age.percentile);
			this.$('#weight_age_z_score').val(stats.wt4age.zscore);
			this.$('#w4a_flag').text(stats.wt4age.flag);
		}
		//weight4height
		if(stats.wt4ht != undefined) {
			this.$('#weight_height_percentile').val(stats.wt4ht.percentile);
			this.$('#weight_height_z_score').val(stats.wt4ht.zscore);
			this.$('#w4h_flag').text(stats.wt4ht.flag);
		}
	},
	
	changedValue: function(e) {
		var data = {};
		data[e.currentTarget.name]=e.currentTarget.value;
		this.model.save(data);
	},
	
	/* 
	*	Because we want the PersonView to store the MeasurementCollection, we'll pass this event along
	*	and deal with it in there.
	*
	*/
	addMeasurement: function(e) {
		e.preventDefault();
		this.trigger('addMeasurement');
	},
	
	/*
	*	Initialize a new measurement.  Make fields editable, clear fields, set focus to date field.
	*/
	initMeasurement: function() {
		// alert("MeasurementView: initMeasurement();");
		this.$('#col_left input').removeAttr('disabled');
		this.$('input').val("");
		this.$('textarea').text("");
		this.$('input').first().focus();
		this.render();
	},
	
	/*
	*	Load next measurement for the current Person
	*/
	nextMeas: function(e) {
		e.preventDefault();
		var numMeasurements = this.collection.length;
		this.curIndex = _.indexOf(this.collection, this.model);
		if(this.curIndex < (numMeasurements-1)) {
			var newIndex = ++this.curIndex;
			this.model = this.collection[newIndex];
			this.render();
			this.doStats();
		} else {
			alert("This is the most recent measurement.");
		}
		
	},
	
	/*
	*	Load previous measurement for the current Person
	*/
	prevMeas: function(e) {
		e.preventDefault();
		var numMeasurements = this.collection.length;
		this.curIndex = _.indexOf(this.collection, this.model);
		if(this.curIndex > 0) {
			var newIndex = --this.curIndex;
			this.model = this.collection[newIndex];
			this.render();
			this.doStats();
		} else {
			alert('This is the first measurement');
		}
		
		// alert("Current Index: "+this.curIndex);
	},
	
	/*
	*	Reset the measurement view: remove model data, re-render.
	*/
	reset: function() {
		// alert("MeasurementView: reset();");
	},
	
	/*
	*	Calculate age based on DOB and measurement date
	*/
	calculateAge: function() {
		var m_date_ts = parseInt(this.model.get('m_date_ts'));
		var p_dob_ts = parseInt(personView.model.get('p_dob_ts'));
		var m_age_ts = m_date_ts - p_dob_ts;
		
		// save age for this measurement as a timestamp
		this.model.save({m_age_ts: m_age_ts});

		this.displayAge();
		// alert("Age in Months: "+ageInMonths);
		
		// this.model.save({m_age_y: ageInYears});
	},
	
	/*
	*	Create and store the years/months for age display
	*/
	displayAge: function() {
		var m_age_ts = this.model.get('m_age_ts');
		var one_year = 1000*60*60*24*365;
		var ageInYears = Math.ceil(m_age_ts)/one_year;
		// alert("Measurement TS: "+m_date_ts+", DOB TS: "+p_dob_ts);
		// alert("Age in Years: "+ageInYears);
		var ageInMonths = Math.round(ageInYears*12*10)/10;
		// alert();
		if(ageInMonths > 24) {
			var dispYears = Math.floor(ageInYears);
			var dispMonths = Math.round((ageInMonths % 12)*10)/10;
		} else {
			var dispMonths = ageInMonths;
		}
		this.model.save({m_age_m: dispMonths, m_age_y: dispYears});
	},
	
	/*
	*	Perform statistics calculations
	*/
	doStats: function(e) {
		if(e) {
			e.preventDefault();
		}
		var MF = personView.model.get("p_sex");
		var m_age_ts = this.model.get('m_age_ts');
		var one_year = 1000*60*60*24*365;
		var ageInYears = Math.ceil(m_age_ts)/one_year;
		var ageInMonths = Math.round(ageInYears*12*10)/10;
		var kg = this.model.get('m_weight');
		var cm = this.model.get('m_height');
		var head_cm = this.model.get('m_head');
		var arm_cm = this.model.get('m_arm');
		var stats = App.Utilities.WAM.calcWAM( 1, "F", ageInMonths, kg, cm, head_cm, arm_cm );
		this.renderStats(stats);
	}
	
});