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

        return Controller.extend("sap.btp.ux410solving.controller.Detail", {
            onInit: function () {
                let oRouter = this.getOwnerComponent().getRouter();
                let oModel = new JSONModel({});
                this.getView().setModel(oModel,'main');
                //           라우터 객체 이름
                oRouter.getRoute('RouteDetail').attachPatternMatched(this._patternMatched, this);
            },
            // 라우터 패턴이 "일치할때마다" 실행
            _patternMatched(oEvent){
                // 이벤트 객체의 파라미터 정보에 arguments에서 객체 데이터 취득
                let oArgu = oEvent.getParameters().arguments;

                this.byId("idTitle").setText("OrderID : " + oArgu.OrderID);
                let oJSONModel = this.getView().getModel('main');

                // Filter 사용 방법
                // let afilter = [];
                // if (oArgu.OrderID && oArgu.ProductID) {
                //     var oFilters = new Filter({
                //         filters: [
                //             new Filter('OrderID', 'EQ', oArgu.OrderID),
                //             new Filter('ProductID', 'EQ', oArgu.ProductID)
                //         ],
                //         and : true
                // })
                //
                //   afilter.push(oFilters);
                // }

                // this.getView().getModel().read(`/Order_Details`, {
                //     filters : afilter,
                //     success : function(oReturn){
                //         // 서버에서 얻은 값을 success 함수의 파라미터 변수 값에서 JSON Data 형태로 얻을 수 있다.
                //         // 최종적으로 result 객체안에 들어가고, 그 안 0번째 배열에 들어가므로 경로 지정
                //         oJSONModel.setProperty("/", oReturn.results[0]);           // 1. 
                //         // oJSONModel.setData(oReturn);                 // 2.
                //         // this.getView().getModel().setData(oReturn);  // 3.
                //     }
                // })

                // 'Orders(번호)' 데이터 바인딩 ( ' 아님 ` 이거임)

                this.getView().getModel().read(`/Order_Details(OrderID=${oArgu.OrderID},ProductID=${oArgu.ProductID})`, {
                    success : function(oReturn){
                        // 서버에서 얻은 값을 success 함수의 파라미터 변수 값에서 JSON Data 형태로 얻을 수 있다.
                        
                        oJSONModel.setProperty("/", oReturn);           // 1. 
                        // oJSONModel.setData(oReturn);                 // 2.
                        // this.getView().getModel().setData(oReturn);  // 3. 쓸려면 마지막에 .bind(this) 를 쓴다
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

            },

        });
    });
