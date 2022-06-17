sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var tabBlock = BlockBase.extend("ns.customers.view.blocks.Contract", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "ns.customers.view.tabs.Contract",
					type: "XML"
				},
				Expanded: {
					viewName: "ns.customers.view.tabs.Contract",
					type: "XML"
				}
			}
		}
	});
	return tabBlock;
}, true);
