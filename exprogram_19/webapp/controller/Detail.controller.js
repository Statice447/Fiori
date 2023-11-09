sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, JSONModel, History) {
        "use strict";

        return Controller.extend("exam.exprogram19.controller.Detail", {
            onInit: function () {
                // 라우터 선언
                let oRouter = this.getOwnerComponent().getRouter();

                // 모델 선언
                let oModel = new JSONModel({});
                this.getView().setModel(oModel,'extend');
                
                // 라우터 함수 실행
                oRouter.getRoute('RouteDetail').attachPatternMatched(this._patternMatched, this);
            },
            _patternMatched(oEvent){
                // 이벤트 객체의 파라미터 정보에 arguments에서 객체 데이터 취득
                let oArgu = oEvent.getParameters().arguments;

                // 타이틀 변경
                this.byId("idDetailpage").setTitle(oArgu.ProductName + "상품의 주문 조회");

                // 모델 선언
                let oExtendModel = this.getView().getModel('extend');

                let afilter = [];
                if (oArgu.ProductName) {
                    var oFilter = new Filter('ProductName', 'EQ', oArgu.ProductName);
                    afilter.push(oFilter);
                }
                
                this.getView().getModel().read(`/Order_Details_Extendeds`, {
                    filters : afilter,
                    success : function(oReturn){
                        oExtendModel.setProperty("/", oReturn);

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
    });
