sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var tabBlock = BlockBase.extend("ns.customers.view.blocks.Tender", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "ns.customers.view.tabs.Tender",
					type: "XML"
				},
				Expanded: {
					viewName: "ns.customers.view.tabs.Tender",
					type: "XML"
				}
			}
		}
	});
	return tabBlock;
}, true);
