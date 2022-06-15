sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var tabBlock = BlockBase.extend("ns.customers.view.blocks.Profile", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "ns.customers.view.tabs.Profile",
					type: "XML"
				},
				Expanded: {
					viewName: "ns.customers.view.tabs.Profile",
					type: "XML"
				}
			}
		}
	});
	return tabBlock;
}, true);
