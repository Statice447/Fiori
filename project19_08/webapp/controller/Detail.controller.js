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
                let oRouter = this.getOwnerComponent().getRouter();
                //           라우터 객체 이름
                oRouter.getRoute('RouteDetail').attachPatternMatched(this._patternMatched, this);

            },

            // 라우터 패턴이 "일치할때마다" 실행
            _patternMatched(oEvent){
                // 이벤트 객체의 파라미터 정보에 arguments에서 객체 데이터 취득
                let oArgu = oEvent.getParameters().arguments;
                // oArgu에는 { OrderID : 'HI', operion : 123}이 들어있음

                this.byId("detail").setTitle(oArgu.OrderID);
                this.byId("idDetailInput").setValue(oArgu.option);

            },

            onNavMain(){
                let oRouter = this.getOwnerComponent().getRouter();
                //           라우터 객체 이름
                oRouter.navTo("RouteMain");

            }

        });
    }
);
