sap.ui.define(
    [
        "sap/ui/core/mvc/Controller", 
        "sap/ui/model/json/JSONModel", 
        "sap/ui/core/format/DateFormat", 
        "sap/ui/core/Fragment",
         "sap/ui/model/Filter"
    ],
    /**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 */
    function (Controller, JSONModel, DateFormat, Fragment, Filter) {
        "use strict";

        return Controller.extend("odata.project1908.controller.Detail", {
            onInit: function () {
                Uicomponent

                this.getRouter().initialize();      // 라우터 기본 설정
            }

        });
    }
);
