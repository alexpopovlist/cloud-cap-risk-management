sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var tabBlock = BlockBase.extend("ns.customers.view.blocks.Deliveries", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "ns.customers.view.tabs.Deliveries",
					type: "XML"
				},
				Expanded: {
					viewName: "ns.customers.view.tabs.Deliveries",
					type: "XML"
				}
			}
		}
	});
	return tabBlock;
}, true);
