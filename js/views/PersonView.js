App.Views.PersonView = Backbone.View.extend({
	el: $("#person"),
	
	events: {
	
	},
	
	initialize: function(options) {
		// alert('person loading');
		_.bindAll(this, 'render', 'initAddPerson', 'loadPerson', 'addMeasurement');
		this.$('input').attr('disabled', 'disabled');
		
		// initialize sub-views here — these are available only within this view, and will get updated by the parent view:
		this._personInfoView = new App.Views.PersonInfoView();
		this.initMeasurements();
	},
	
	/*
	*	Initialize the measurements collection and view.
	*/
	initMeasurements: function() {
		var self = this;
		this.measurements = new App.Collections.MeasurementCollection();
		this.measurements.fetch({
			success: function() {
				// alert('PersonView: measurement collection loaded');
			},
			error: function() {
				alert('PersonView: measurement collection NOT loaded');
			}
		});
		this._measurementView = new App.Views.MeasurementView();
		this._measurementView.bind('addMeasurement', this.addMeasurement);
	},
	
	render: function() {
		
	},
	
	/*
	*	Load a person via a search result click, and load associated measurements.
	*/
	loadPerson: function(e) {
		var person = mainAppView.collection.get(e.id);
		if(person != undefined) {
			this.model = person;
			this._personInfoView.model = person;
			this._personInfoView.render();
			
			// @TODO: Maybe this should be sorted by date here?
			// Or perhaps the MeasurementCollection should maintain a sort order?
			// Or the forPerson method of the collection should perform the sort?
			this.personMeasurements = this.measurements.forPerson(person.id);
			if(this.personMeasurements.length) {
				this._measurementView.collection = this.personMeasurements;
				this._measurementView.model = _.last(this.personMeasurements);
				this._measurementView.render();
			} else {
				this._measurementView.collection = new Array();
			}
		} else {
			alert("there was a problem loading the selected person's record");
		}
	},
	
	/*
	*	Adds a new person to the person collection, renders the info view, and clears the measurement view.
	*/
	initAddPerson: function(e) {
		// alert("PersonView::initAddPerson");
		var s_p_id = parseInt(mainAppView.settings.get('s_p_id'));
		var new_s_p_id = ++s_p_id;
		mainAppView.settings.save({s_p_id: new_s_p_id});
		this.model = mainAppView.collection.create(new App.Models.Person({p_id: new_s_p_id, p_sex: "M", p_fn: "First Name", p_ln: "Last Name", p_dob: ""}));
		this._personInfoView.model = this.model;
		this._personInfoView.render();
		// this._measurementView.reset();
	},
	
	/*
	*	Add a new Measurement model to the measurements collection.
	*	Updates the Measurement view's collection and model.
	*/
	addMeasurement: function() {
		alert('PersonView [id: '+this.model.id+']: addMeasurement');
		var now_ts = new Date().getTime();
		this._measurementView.model = this.measurements.create(new App.Models.Measurement({p_id: this.model.id, m_created_ts: now_ts, m_date_ts: now_ts}));
		// var insertIndex = _.sortedIndex(this._measurementView.collection, this._measurementView.model, function(meas) {
		// 	return meas.get('m_age_ts');
		// });
		// alert("Insert Index: "+insertIndex);
		this.personMeasurements = this.measurements.forPerson(this.model.id);
		this._measurementView.collection = this.personMeasurements;
		this._measurementView.model.bind("change", this._measurementView.render);
		this._measurementView.initMeasurement();
	},
	
	changed: function(e) {
		// var data = {};
		// 		data[e.currentTarget.id]=e.currentTarget.value;
		// 		this.model.save(data);
	}
});
