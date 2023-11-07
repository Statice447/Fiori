sap.ui.define(
    [
        "sap/ui/core/mvc/Controller", 
        "sap/ui/model/json/JSONModel", 
        "sap/ui/core/format/DateFormat", 
        "sap/ui/core/Fragment",
        "sap/ui/model/Filter",
        "sap/ui/core/routing/History"
    ],
    /**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 */
    function (Controller, JSONModel, DateFormat, Fragment, Filter, History) {
        "use strict";

        return Controller.extend("mentor2.controller.Shipment", {
            onInit: function () {
                let oRouter = this.getOwnerComponent().getRouter();
                let oModel = new JSONModel();

                //           라우터 객체 이름
                oRouter.getRoute('RouteShipment').attachPatternMatched(this._patternMatched, this);

                this.getView().setModel(oModel, "orders");

            },

            // 라우터 패턴이 "일치할때마다" 실행
            _patternMatched(oEvent){
                // 이벤트 객체의 파라미터 정보에 arguments에서 객체 데이터 취득
                debugger;
                let oArgu = oEvent.getParameters().arguments;
                let oFilter = new Filter('CustomerID', 'EQ', oArgu.CustomID);
                // oArgu에는 { OrderID : 'HI', operion : 123}이 들어있음

                this.getView().getModel().read(`/Orders(${oArgu.CustomID})`, {
                    filters: [oFilter],
                    success : function(oReturn){
                        oReturn.results;
                        debugger;
                    }
                })

            },

            onBack(){
                let oHistory = History.getInstance();
			    let sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    // sap router 히스토리가 없는 경우 window 히스토리에서 뒤로 가기
                    window.history.go(-1);
                } else {
                    // sap router 히스토리가 있으면 메인 화면으로 이동
                    let oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("RouteMain", {});
                }

            }

        });
    }
);
