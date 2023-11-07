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

        return Controller.extend("project1910.controller.Main", {
            onInit: function () {
                this._setChartInView();
                this._setChartInContoller();
            },

            _setChartInView(){
                let oModel = new JSONModel();
                oModel.loadData("../model/Products.json");
                this.getView().setModel(oModel, 'main'); 
            },

            _setChartInContoller(){
                let oModel = new JSONModel();
                oModel.loadData("../model/Products.json");
                this.getView().setModel(oModel, 'cont'); 

                // chart id 불러오기
                var oChart = this.byId("idChart");

                // dataset
                var oDataSet = new FlattenedDataset({
                    dimensions : [{
                        name : 'Country',
                        value : '{cont>Country}'
                    }],
                    measures : [{
                        name : 'Revenue',
                        value : '{cont>Revenue}'
                    },
                    {
                        name : 'Revenue2',
                        value : '{cont>Revenue2}'
                    },
                    {
                        name : 'Revenue3',
                        value : '{cont>Revenue3}'
                    }],
                    data : {
                        path : 'cont>/Products'
                    }
                });
                
                oChart.setDataset(oDataSet);

                // feed
                // Y축 valueAxis 선언
                var feedValueAxis = new FeedItem({
                    uid : "valueAxis",
                    type : "Measure",
                    values : ['Revenue', 'Revenue2', 'Revenue3']
                });

                // X축 categoryAxis 선언
                var feedCategoryAxis = new FeedItem({
                    uid : "categoryAxis",
                    type : "Dimension",
                    values : ['Country']
                });

                oChart.addFeed(feedValueAxis);
                oChart.addFeed(feedCategoryAxis);

                // (Optional) property setting
                oChart.setVizProperties({
                    title : { text : 'Contorller vizFrame' },
                    plotArea : { colorPalette : ['#00D8FF', '#000000', '#FF00DD'] }

                })

            }

        });
    });
