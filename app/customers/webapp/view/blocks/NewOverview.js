sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var tabBlock = BlockBase.extend("ns.customers.view.blocks.NewOverview", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "ns.customers.view.tabs.NewOverview",
					type: "XML"
				},
				Expanded: {
					viewName: "ns.customers.view.tabs.NewOverview",
					type: "XML"
				}
			}
		}
	});
	return tabBlock;
}, true);
