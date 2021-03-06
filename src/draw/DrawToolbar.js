L.DrawToolbar = L.Toolbar.extend({

	statics: {
		TYPE: 'draw'
	},

	options: {
		tools: []
		/*polyline: {},
		polygon: {},
		rectangle: {},
		circle: {},
		marker: {}*/
	},

	initialize: function (options) {
		// Ensure that the options are merged correctly since L.extend is only shallow
		for (var type in this.options) {
			if (this.options.hasOwnProperty(type)) {
				if (options[type]) {
					options[type] = L.extend([], this.options[type], options[type]);
				}
			}
		}

		this._toolbarClass = 'leaflet-draw-draw';
		L.Toolbar.prototype.initialize.call(this, options);
	},

	getModeHandlers: function (map) {
		
		var tools = [];
		for (var i = this.options.tools.length - 1; i >= 0; i--) {
			var tool = this.options.tools[i];
			var handler;
			switch(tool.toolType) {
			    case 'drawPolyline':
			        handler = new L.Draw.Polyline(map, tool.options);
			        break;
			    case 'drawPolygon':
			        handler = new L.Draw.Polygon(map, tool.options);
			        break;
		        case 'drawRectangle':
			        handler = new L.Draw.Rectangle(map, tool.options);
			        break;
		        case 'drawCircle':
			        handler = new L.Draw.Circle(map, tool.options);
			        break;
		        case 'drawMarker':
			        handler = new L.Draw.Marker(map, tool.options);
			        break;
			}

			handler.tooltip = tool.drawStart;

			tools.push({
				enabled:true,
				handler: handler,
				title: tool.tooltip
			});
		}

		return tools;

		// return [
		// 	{
		// 		enabled: this.options.polyline,
		// 		handler: new L.Draw.Polyline(map, this.options.polyline),
		// 		title: L.drawLocal.draw.toolbar.buttons.polyline
		// 	},
		// 	{
		// 		enabled: this.options.polygon,
		// 		handler: new L.Draw.Polygon(map, this.options.polygon),
		// 		title: L.drawLocal.draw.toolbar.buttons.polygon
		// 	},
		// 	{
		// 		enabled: this.options.rectangle,
		// 		handler: new L.Draw.Rectangle(map, this.options.rectangle),
		// 		title: L.drawLocal.draw.toolbar.buttons.rectangle
		// 	},
		// 	{
		// 		enabled: this.options.circle,
		// 		handler: new L.Draw.Circle(map, this.options.circle),
		// 		title: L.drawLocal.draw.toolbar.buttons.circle
		// 	},
		// 	{
		// 		enabled: this.options.marker,
		// 		handler: new L.Draw.Marker(map, this.options.marker),
		// 		title: L.drawLocal.draw.toolbar.buttons.marker
		// 	}
		// ];
	},

	// Get the actions part of the toolbar
	getActions: function (handler) {
		return [
			{
				enabled: handler.deleteLastVertex,
				title: L.drawLocal.draw.toolbar.undo.title,
				text: L.drawLocal.draw.toolbar.undo.text,
				callback: handler.deleteLastVertex,
				context: handler
			},
			{
				title: L.drawLocal.draw.toolbar.actions.title,
				text: L.drawLocal.draw.toolbar.actions.text,
				callback: this.disable,
				context: this
			}
		];
	},

	setOptions: function (options) {
		L.setOptions(this, options);

		for (var type in this._modes) {
			if (this._modes.hasOwnProperty(type) && options.hasOwnProperty(type)) {
				this._modes[type].handler.setOptions(options[type]);
			}
		}
	},
});
