sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var tabBlock = BlockBase.extend("ns.customers.view.blocks.Contacts", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "ns.customers.view.tabs.Contacts",
					type: "XML"
				},
				Expanded: {
					viewName: "ns.customers.view.tabs.Contacts",
					type: "XML"
				}
			}
		}
	});
	return tabBlock;
}, true);
