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

        return Controller.extend("sap.btp.ux410solving.controller.Main", {
            onInit: function () {
                let oData = {
                    list: [
                        {type : "bar"},
                        {type : "column"},
                        {type : "line"},
                        {type : "donut"}
                    ]
                }
                
                let typeList = new JSONModel(oData);
                this.getView().setModel(typeList,'main');

            },

            onSearch(){
                let oChart = this.byId("idvizFrame");
                let oOrder = this.byId("idComboOrder");
                let oType = this.byId("idComboType");

                let afilter = [];

                if (oOrder.getValue()) {
                    let oFilter = new Filter('OrderID', 'EQ', oOrder.getValue())
                    afilter.push(oFilter);
                }
                this.getView().byId("idFlatData").getBinding("data").filter(afilter);

                if(!oType.getValue()){
                    oType.setValueState('Error');
                }
                else{
                    oType.setValueState();
                    oChart.setVizType(oType.getValue());
                }
            },

            
            selectdata(oEvent){
                let orderID = oEvent.getParameters().data[0].data.OrderID
                let productID = oEvent.getParameters().data[0].data.ProductID
                
                let oRouter = this.getOwnerComponent().getRouter();
                //           라우터 객체 이름
                oRouter.navTo("RouteDetail", {
                    OrderID : orderID,       
                    ProductID : productID            
                })  

                // 배열함수 : arr.reduce(), arr.forEach(), arr.map(), arr.some(function(item) {})

            }
        });
    });
