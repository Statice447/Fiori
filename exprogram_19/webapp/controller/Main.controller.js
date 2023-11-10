sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, JSONModel) {
        "use strict";

        return Controller.extend("exam.exprogram19.controller.Main", {
            onInit: function () {

                let oProductModel = new JSONModel({});
                let oChartModel = new JSONModel({});
                this.getView().setModel(oProductModel,'main');
                this.getView().setModel(oChartModel,'chart');

                // 라우터 함수 실행
                // oRouter.getRoute('RouteMain').attachPatternMatched(this._patternMatched, this);

                let oRouter = this.getOwnerComponent().getRouter();

                if(oRouter){
                    oRouter.getRoute('RouteMain').attachPatternMatched(this._patternMatchedmain, this);
                }

            },
            _patternMatchedmain(oEvent){
                // input 필드 빈값으로 초기화
                this.byId("idID").setValue("");
                this.byId("idCategory").setValue("");
                
                // 카테고리 테이블 선택 제거
                this.byId("idCategoryTable").removeSelections(true);

                let oProductModel = this.getView().getModel('main');
                let oChartModel = this.getView().getModel('chart');

                // 빈 객체 setData로 모델 초기화(차트, 상품 조회 테이블)
                oProductModel.setData([]);
                oChartModel.setData([]);

                // 카테고리 원상 복구 용 빈 필터
                let afilter = [];

                // 카테고리 원상 복구용 빈 필터 적용
                this.getView().byId("idCategoryTable").getBinding("items").filter(afilter);
            },

            onSearch(){
                let idID = this.byId("idID");
                let idCategoty = this.byId("idCategory");

                let afilter = [];

                if (idID.getValue()) {
                    let oFilter = new Filter('CategoryID', 'GE', idID.getValue())
                    afilter.push(oFilter);
                }
                // 기존에 했던 Statwith는 시작 문구에 포함되면 조건에 부합하는 거였다
                // Contains는 해당 값이 포함하는 것들을 조건으로 삼는다
                
                if (idCategoty.getValue()) {
                    let oFilter = new Filter('CategoryName', 'Contatins', idCategoty.getValue())
                    afilter.push(oFilter);
                }

                this.getView().byId("idCategoryTable").getBinding("items").filter(afilter);

            },

            onSelect(oEvent){
                let sPath = oEvent.getParameters().listItem.getBindingContextPath();
                let oData = this.getView().getModel().getProperty(sPath).CategoryID;
                
                // JSONModel 설정
                let oProductModel = this.getView().getModel('main');
                let oChartModel = this.getView().getModel('chart');
                
                // 3번 문제 필터
                let afilter = [];
                if (oData) {
                    var oFilter = new Filter('CategoryID', 'EQ', oData);
                    afilter.push(oFilter);
                };

                this.getView().getModel().read(`/Products`, {
                    filters : afilter,
                    success : function(oReturn){
                        oProductModel.setProperty("/", oReturn);
                    }
                });

                this.getView().getModel().read(`/Sales_by_Categories`, {
                    filters : afilter,
                    success : function(oReturn){
                        oChartModel.setProperty("/", oReturn);          

                    }
                });
            },

            selectdata(oEvent){
                let productName = oEvent.getParameters().data[0].data.ProductName
                
                let oRouter = this.getOwnerComponent().getRouter();
                //           라우터 객체 이름
                oRouter.navTo("RouteDetail", {
                    ProductName : productName          
                })  
            }

        });
    });
