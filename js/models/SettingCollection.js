App.Collections.SettingCollection = Backbone.Collection.extend({
	model: App.Models.Setting,
	localStorage: new Store("settings")
});