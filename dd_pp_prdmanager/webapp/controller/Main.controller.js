sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/core/format/DateFormat"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, DateFormat) {
        "use strict";

        return Controller.extend("ddppprdmanager.controller.Main", {
            onInit: function () {
                var oModel = new JSONModel();
                oModel.loadData("../model/tree.json");

                this.getView().setModel(oModel, 'tree');

                var monthModel = new JSONModel({
                    Prdmanage : [],
                    Chart : []
                });
                var oModelData = this.getView().setModel(monthModel, "main");
                
            },

            onSearch(){
                // 트리 데이터 찾기
                let index = this.byId("TreeTableBasic").getSelectedIndex(),
                    sPath = this.byId("TreeTableBasic").getContextByIndex(index).sPath,
                    oData = this.getView().getModel("tree").getProperty(sPath),
                    aFilter = [];

                let combo = this.byId("comboid").getValue();

                if(combo){
                    let plantFilter = new Filter('Plcode', 'EQ', combo);

                    aFilter.push(plantFilter);

                }

                if(index){
                    // let month = String(oData.year) + "-" + String(oData.month);

                    // 이유는 모르겠으나 월은 해당 숫자에 +1 에 해당하는 값이 나온다
                    let stdate = new Date(oData.year, oData.month-1, 1);
                    let eddate = new Date(oData.year, oData.month, 0);

                    let monthFilter = new Filter('Ppstdat', 'BT', stdate, eddate);

                    aFilter.push(monthFilter);
                };

                var oModelData = this.getView().getModel("main");

                this.getView().getModel().read("/PrdmanagerSet" , {
                    filters : aFilter,
                    success : function(oReturn){
                        oModelData.setProperty("/Prdmanage", oReturn.results);

                        debugger;
                        let temp = [];
                        let chartStatus = oModelData.getProperty("/Prdmanage");
                        for(var i = 0; i < chartStatus.length; i++){
                            if(chartStatus[i].Status === "3"){
                                temp.push(chartStatus[i]);
                            }
                        };

                        oModelData.setProperty("/Chart", temp);
                    }

                });
                
            },

            // 포매터 함수들
            formatter: {
                fnDateToString: function (value) {
                    if (value) {
                        var oFormat = DateFormat.getDateInstance({pattern: 'yyyy-MM-dd'});
                        return oFormat.format(value);
    
                    }
                },

                fnStatustoIcon: function (value) {
                    if (value) {
                        switch(value){
                            case "2" :
                                return "sap-icon://commission-check";
                            case "3" :
                                return "sap-icon://complete";
                        }
                    }
                    else
                        return "sap-icon://factory"; ;
                },

                fnIconColor: function (value) {
                    if (value) {
                        switch(value){
                            case "2" :
                                return "#FFBB00";
                            case "3" :
                                return "#1DDB16";
                        }
                    }
                    else
                        return "#000000";
                }
            },

            onTree: function(oEvent){
                
            },

            onFilterSelect: function(oEvent){
                var sKey = oEvent.getParameter("key");
                let oFilter,
                    aFilter = [];

                
                switch(sKey){
                    case "Production":
                        oFilter = new Filter('Status', 'EQ', "");
                        break;
                    case "WaitChecking":
                        oFilter = new Filter('Status', 'EQ', "2");
                        break;
                    case "Complete":
                        oFilter = new Filter('Status', 'EQ', "3");
                        break;
                    case "All" :
                        oFilter = new Filter();
                        break;

                };
                aFilter.push(oFilter);

                this.byId("ProductTable").getBinding("rows").filter(aFilter);
            }
        });
    });
