sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("project1907.controller.HelloPanel", {
            onInit: function () {

            },

            onOpenDialog: function(){
                debugger;
                let oDialog = sap.ui.getCore().byId("idDialog");

                if(!oDialog){
                    Fragment.load({
                        name : 'project1907.view.fragment.Dialog',
                        type : 'XML',
                        controller : this           // 소문자 controller, this-> dialog 컨트롤러를 사용한다.
                    }).then(function(oDialog){
                        oDialog.open();
                    });
                }
                
                else
                    oDialog.open();
                
            },

            onClose: function(oEvent){
                oEvent.getSource().getParent().close();     // getParent 일어난 이벤트의 상위 단계를 가리킴
                // let oDialog = sap.ui.getCore().byId("idDialog");
                // oDialog.close();
            }

        });
    });
