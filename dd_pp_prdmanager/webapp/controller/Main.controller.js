sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/core/format/DateFormat",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Filter, DateFormat, MessageToast, Fragment) {
        "use strict";

        return Controller.extend("ddppprdmanager.controller.Main", {
            onInit: function () {
                var oModel = new JSONModel();
                oModel.loadData("../model/tree.json");

                this.getView().setModel(oModel, 'tree');

                var oData = new JSONModel({
                    Prdmanage : [],
                    Chart : []
                });
                var oModelData = this.getView().setModel(oData, "main");
                
            },

            onSelectChange(oEvent) {
                
                // let index = this.byId("TreeTableBasic").getSelectedIndex(),

                let index = oEvent.getParameters().rowIndex,
                    sPath = this.byId("TreeTableBasic").getContextByIndex(index).sPath,
                    oData = this.getView().getModel("tree").getProperty(sPath),
                    aFilter = [];

                var oModelData = this.getView().getModel("main");

                if(index && oData.id == 'year'){
                    let styear = new Date(oData.name + '-01-01');
                    let edyear = new Date(oData.name + '-12-31');

                    let yearFilter = new Filter('Ppstdat', 'BT', styear, edyear);

                    aFilter.push(yearFilter);
                    this.byId("idTitle").setFooter(oData.name + "년 생산량")
                }
                

                if(index && oData.month){
                    // let month = String(oData.year) + "-" + String(oData.month);

                    // 이유는 모르겠으나 월은 해당 숫자에 +1 에 해당하는 값이 나온다
                    let stdate = new Date(oData.year, oData.month-1, 1);
                    let eddate = new Date(oData.year, oData.month, 0);

                    let monthFilter = new Filter('Ppstdat', 'BT', stdate, eddate);

                    aFilter.push(monthFilter);
                    this.byId("idTitle").setFooter((index-1) + "월 생산량")
                };

                

                
                this.getView().getModel().read("/PrdmanagerSet" , {
                    filters : aFilter,
                    success : function(oReturn){
                        oModelData.setProperty("/Prdmanage", oReturn.results);

                        let tempChart = [];
                        let prmData = oModelData.getProperty("/Prdmanage");

                        var totalCnt =  prmData.length;
                        var productionCnt = 0, waitCnt = 0, completeCnt = 0, totalQuan = 0;
                        var noQuan = 0, deQuan = 0;

                        if(prmData.length == 0){
                            MessageToast.show("데이터가 존재하지 않습니다.");
                        }
                        else{
                            
                            for(var i = 0; i < prmData.length; i++){
                                if(prmData[i].Status){
                                    switch(prmData[i].Status){
                                        case "2":
                                            waitCnt = waitCnt + 1
                                            break;
                                        // 최종 완료 데이터 카운트
                                        case "3":
                                            completeCnt = completeCnt + 1
                                            totalQuan = totalQuan + Number(prmData[i].Quan)
                                            noQuan = noQuan + Number(prmData[i].Noquan);
                                            deQuan = deQuan + Number(prmData[i].Dequan);
                                            tempChart.push(prmData[i])
                                            break;
                                    }
                                }
                                else{
                                    // 생산 중 데이터 카운트
                                    productionCnt = productionCnt + 1
                                }
                        
                            };

                        }
                        
                        // 객체로 count 변경 -> 실패
                        // tempCount.push({totalCnt, productionCnt, waitCnt, completeCnt})      
                        // oModelData.setProperty("/Count", tempCount);

                        oModelData.setProperty("/Chart", tempChart);

                        let percentage = (( deQuan / noQuan ) * 100).toFixed(1);
                        let quanLength = String(totalQuan).length;
                        debugger;
                        this.getView().byId("idMicro").setPercentage(Number(percentage));


                        this.byId("idnc1").setTruncateValueTo(quanLength);
                        this.byId("idnc1").setValue(totalQuan);
                        this.getView().byId("idtabTotal").setCount(totalCnt);
                        this.getView().byId("idtabProduction").setCount(productionCnt);
                        this.getView().byId("idtabWait").setCount(waitCnt);
                        this.getView().byId("idtabComplete").setCount(completeCnt);
                    }.bind(this)

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
            },

            onTile: function(oEvent){

                this.byId("idpopover").openBy(oEvent.getSource());

            }
        });
    });
