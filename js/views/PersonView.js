App.Views.PersonView = Backbone.View.extend({
	el: $("#person"),
	
	events: {
	
	},
	
	initialize: function(options) {
		// alert('person loading');
		_.bindAll(this, 'initAddPerson', 'loadPerson');
		this.$('input').attr('disabled', 'disabled');
		
		// initialize sub-views here — these are available only within this view, and will get updated by the parent view:
		this._personInfoView = new App.Views.PersonInfoView();
	},
	
	loadPerson: function(e) {
		// alert("ID: "+e.id);
		var person = mainAppView.collection.get(e.id);
		if(person != undefined) {
			this.model = person;
			this._personInfoView.model = person;
			this._personInfoView.render();
		} else {
			alert("there was a problem loading the selected person's record");
		}
	},
	
	initAddPerson: function(e) {
		// alert("PersonView::initAddPerson");
		this._personInfoView.model = mainAppView.collection.create(new App.Models.Person({p_id: "ID", p_sex: 1, p_fn: "First Name", p_ln: "Last Name", p_dob: "DOB"}));
		this._personInfoView.render();
	},
	
	changed: function(e) {
		// var data = {};
		// 		data[e.currentTarget.id]=e.currentTarget.value;
		// 		this.model.save(data);
	},
	
	test: function(e) {
		alert("Person "+e.id+" selected.");
	}
});
