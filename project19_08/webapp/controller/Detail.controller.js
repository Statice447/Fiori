sap.ui.define(
    [
        "sap/ui/core/mvc/Controller", 
        "sap/ui/model/json/JSONModel", 
        "sap/ui/model/Filter",
        "sap/ui/core/routing/History"
    ],
    /**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 */
    function (Controller, JSONModel, Filter, History) {
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

                this.byId("detail").setTitle("OrderID : " + oArgu.OrderID);
                this.byId("idDetailInput").setValue("CustomID : " + oArgu.option);

                let oModel = this.getView().getModel('main');

                // 'Orders(번호)' 데이터 바인딩 ( ' 아님 ` 이거임)
                // 엘리먼트 바인딩
                this.getView().bindElement(`/Orders(${oArgu.OrderID})`);

                this.getView().getModel().read(`/Orders(${oArgu.OrderID})`, {
                    success : function(oReturn){
                        // 서버에서 얻은 값을 success 함수의 파라미터 변수 값에서 JSON Data 형태로 얻을 수 있다.
                        // oModel.setProperty("/", oReturn);
                        // oModel.setData(oReturn);
                        // this.getView().getModel('main').setData(oReturn);

                        oReturn.results;
                    }.bind(this)        // success 함수 안에서 this 사용 시 .bind(this)를 사용
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
            
            onRead(oEvent){
                let oDataModel = this.getView().getModel();
                let oFilter = new Filter('CustomerID', 'EQ', 'VINET');
                
                oDataModel.read("/Orders",{
                    filters : [oFilter],
                    success : function(oReturn){
                        oReturn.results;
                        debugger;
                    }
                });
            }
        });
    }
);
