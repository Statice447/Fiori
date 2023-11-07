sap.ui.define([
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

        return Controller.extend("mentor2.controller.Main", {
            onInit: function () {
                var oModel = new JSONModel({CustomerID: ''});
                this.getView().setModel(oModel, "main");
            },

            onValueHelp: function () {
                this.byId("idDialog").open();
            },

            onSearch: function () {
                debugger;
                let oData = this.getView().getModel("main").getData();

                let afilter = [];
                // if (oData.OrderDate && oData.CustomerID) {
                //     let oFilters = new Filter({
                //         filters: [
                //             // new Filter({
                //             //     path: 'CustomerID',                
                //             //     operator: 'EQ',                      
                //             //     value1: oData.CustomerID,            
                //             //     value2: '',                      
                //             // }),
                //             // new Filter({
                //             //     path: 'OrderDate',               
                //             //     operator: 'BT',                     
                //             //     value1: oData.OrderDate,           
                //             //     value2: oData.RequiredDate,                      
                //             // }),
                //             new Filter('CustomerID', 'EQ', oData.CustomerID),
                //             new Filter('OrderDate', 'BT', oData.OrderDate, oData.RequiredDate ),],
                //             and: true | false
                            
                // })
                //         afilter.push(oFilters);
                // }

                if(oData.CustomerID){
                    let oFilter =  new Filter('CustomerID', 'EQ', oData.CustomerID);
                    afilter.push(oFilter);
                }

                if(oData.OrderDate){
                    let oFilterDate = new Filter('OrderDate', 'BT', oData.OrderDate, oData.RequiredDate );
                    afilter.push(oFilterDate);
                }

                // 데이터 바인딩된 정보 경로를 지정(items, rows 등) 테이블 객체를 가져와서, 바인딩 정보를 가져온 후, 필터 적용
                this.getView().byId("idProductsTable").getBinding("items").filter(afilter);
               
            },

            onClose: function (oEvent) {
                oEvent.getSource().getParent().close();

                // let oDialog = sap.ui.getCore().byId("idDialog"); oDialog.close();
            },

            formatter: {
                fnDateToString: function (value) {
                    if (value) {
                        var oFormat = DateFormat.getDateInstance({pattern: 'yyyy-MM-dd'});
                        return oFormat.format(value);

                    }
                },

                fnFreightSum: function (via, freight) {
                    if (via && freight) {
                        return via * Number(freight);
                    }

                }
            },

            onRowSelectionChange(oEvent) {
                //선택 한 row 값의 경로를 가져온다
                var sPath = oEvent.getParameters().rowContext.getPath();
                var oModel = this.getView().getModel().getProperty(sPath);
                
                //선택 한 row 값의 객체를 가져온다
                var obj = oEvent.getParameters().rowContext.getObject();
                
                //선택 한 row 값의 객체에서 해당 데이터를 가져온다
                var cusID = oEvent.getParameters().rowContext.getObject().CustomerID;

                this.getView().getModel('main').setProperty("/CustomerID", cusID);
                // oEvent.getSource().getParent().close();

                // fireEvent('이름') : 해당 id에 있는 event를 실행
                // 주로 버튼 클릭 없이 row를 선택해서 이벤트를 처리하고 싶을 때 사용
                this.byId("idCustClose").fireEvent('press');
                // getCore().byId("idCustClose").fireEvent('press');    // core로 불러올 경우
            },

            onSelectDetail(oEvent){
                let oRouter = this.getOwnerComponent().getRouter();

                // 선택한 테이블의 리스트 아이템에서 함수로 경로찾기
                let selectPath = oEvent.getParameters().listItem.getBindingContextPath();
                
                // 찾은 경로를 getProperty로 데이터 취득
                let custID = this.getView().getModel().getProperty(selectPath).CustomerID;


                //           라우터 객체 이름
                oRouter.navTo("RouteShipment", {
                    CustomID : custID
                })    

            }

        });
    });
