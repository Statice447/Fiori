sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, FlattenedDataset, FeedItem) {
        "use strict";
        var goModel;

        return Controller.extend("project1909.controller.Main", {
            onInit: function () {
                this._setChartInView();
                this._setChartInController();
            },

            _setChartInView(){
                // let oData = {
                //     list : [
                //         {name : 'aaa', rate : 35, cost : 100},
                //         {name : 'bbb', rate : 15, cost : 50},
                //         {name : 'ccc', rate : 10, cost : 75},
                //         {name : 'ddd', rate : 20, cost : 25},
                //         {name : 'eee', rate : 30, cost : 33},
                //         {name : 'fff', rate : 25, cost : 66}
                //     ]
                // }
                // let oModel = new JSONModel(oData);

                let oModel = new JSONModel();
                oModel.loadData("../model/List.json");

                goModel = oModel;
                this.getView().setModel(oModel, 'view');
            },

            _setChartInController(){

                // 모델 폴더에서 Sales.json으로 만든 객체를 선언
                let oModel = new JSONModel();
                oModel.loadData("../model/Sales.json");
                this.getView().setModel(oModel, 'control');

                // let oData = {
                //     sales : [
                //         {product : 'Jackets' , amount : '65'},
                //         {product : 'Shirts' , amount : '70'},
                //         {product : 'Pants' , amount : '83'},
                //         {product : 'Coats' , amount : '92'},
                //         {product : 'Purse' , amount : '77'}
                //     ]
                // }
                // let oModel = new JSONModel(oData);
                // this.getView().setModel(oModel, 'control');

                // JSONModel 세팅
                

                // chart id 불러오기
                var oChart = this.byId("idChart");

                // dataset
                var oDataSet = new FlattenedDataset({
                    dimensions : [{
                        name : 'Product',
                        value : '{control>product}'
                    }],
                    measures : [{
                        name : 'Amount',
                        value : '{control>amount}'
                    }],
                    data : {
                        path : 'control>/sales'
                    }
                });
                
                oChart.setDataset(oDataSet);

                // feed
                // Y축 valueAxis 선언
                var feedValueAxis = new FeedItem({
                    uid : "valueAxis",
                    type : "Measure",
                    values : ['Amount']
                });

                // X축 categoryAxis 선언
                var feedCategoryAxis = new FeedItem({
                    uid : "categoryAxis",
                    type : "Dimension",
                    values : ['Product']
                });

                oChart.addFeed(feedValueAxis);
                oChart.addFeed(feedCategoryAxis);

                // (Optional) property setting
                oChart.setVizProperties({
                    title : { text : 'Sales Order' },
                    plotArea : { colorPalette : ['#00D8FF'] }

                })

                // vizFrame 차트 변경
                oChart.setVizType("bar");

            }
        });
    });
