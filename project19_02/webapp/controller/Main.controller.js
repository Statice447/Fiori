sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Button"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Button) {
        "use strict";

        return Controller.extend("project1902.controller.Main", {
            Text : {
                'firstName' : 'A',
                'lastName' : 'hihi'
            },

            onInit: function () {                // 'Initialization.
                var sText = this.Text.firstName; // 'A'

                console.log(sText);
            },

            onclick: function(oEvent, abc) {
                alert(abc);
            },

            onchange: function() {
                var oInput = this.getView().byId("idInput");
                var oText  = this.getView().byId("idText");
                var oButton = this.getView().byId("btn");

                oText.setText(oInput.getValue());
                oButton.setText(oText.getText());
            }
       
        });
    });
