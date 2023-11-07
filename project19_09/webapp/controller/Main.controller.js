sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";
        var goModel;

        return Controller.extend("project1909.controller.Main", {
            onInit: function () {
                let oData = {
                    list : [
                        {name : 'aaa', rate : 35, cost : 100},
                        {name : 'bbb', rate : 15, cost : 50},
                        {name : 'ccc', rate : 10, cost : 75},
                        {name : 'ddd', rate : 20, cost : 25},
                        {name : 'eee', rate : 30, cost : 33},
                        {name : 'fff', rate : 25, cost : 66}
                    ]

                }

                let oModel = new JSONModel(oData);
                goModel = oModel;

                this.getView().setModel(oModel, 'view');

            }
        });
    });
