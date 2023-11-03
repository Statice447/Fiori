sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel", 
        "sap/ui/core/format/DateFormat",
        "sap/ui/core/Fragment",
        "sap/ui/model/Filter"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, DateFormat, Fragment, Filter) {
        "use strict";

        return Controller.extend("odata.project1908.controller.Main", {
            onInit: function () {
                var oModel = new JSONModel({
                    CustomerID : ''
                });

                this.getView().setModel(oModel, "main");

            },

            onSearch: function() {
                let oData = this.getView().getModel("main").getData();
                // let oinput = this.byId("inputId").getValue();
                let afilter = [];
                if(oData.CustomerID){
                    // 필터 안에는 게이트웨이에 등록된 property 이름으로 해야한다.
                    // DB 테이블 이름을 그대로 가져오면 에러
                    // let oFilter = new Filter({
                    //     path: 'CustomerID',             // 필터 대상 필드 이름
                    //     operator: 'EQ',                 // 조건 (EQ, BT 등 비교연산자)
                    //     value1: oData.CustomerID,                // From
                    //     value2: '',                     // To
                    // });
                    let oFilter = new Filter('CustomerID', 'EQ', oData.CustomerID);  // 위랑 같은 의미

                    // filters란 배열 형태로 여러 조건을 한번에 줄 수 있음
                    // new filter({ filters: [필터객체1, 2, 3], and : true / false });
                    
                    afilter.push(oFilter);
                }

                // 데이터 바인딩된 정보 경로를 지정(items, rows 등)
                // 테이블 객체를 가져와서, 바인딩 정보를 가져온 후, 필터 적용
                this.getView().byId("idProductsTable").getBinding("items").filter(afilter);       
            },

            onSelect(oEvent){
                debugger;

                let table = this.getView().byId("idCustomers")
                let oDialog = table.getSelectedIndices();
                var object = table.getRows()[oDialog].getCells()[0].getText();

                // let data = table.getContextByIndex(oDialog);

                let oinput = this.getView().byId("inputId");
                oinput.setValue(object);

                oEvent.getSource().getParent().close();
            },
    

            onValueHelp: function (){
                this.byId("idDialog").open();

                // let oDialog = sap.ui.getCore().byId("idDialog");     // getCore로 Fragment를 가져 올 경우
                // let oModel = this.getView().getModel();              // Core로 불러올 경우 사용할 Model을 가져와야 한다.
                // if(!oDialog){
                //     Fragment.load({
                //         name : 'odata.project1908.view.fragment.Customer',
                //         type : 'XML',
                //         controller : this           // 소문자 controller, this-> dialog 컨트롤러를 사용한다.
                //     }).then(function(oDialog){
                //         // oDialog.setModel(oModel);                    // Core로 불러올 경우 get으로 가져 온 
                //                                                         // oModel을 oDialog에 선언(set)해준다.
                        
                //         oDialog.open();
                //     });
                // }
                
                // else
                //     oDialog.open();
           
            },

            onClose: function(oEvent){
                oEvent.getSource().getParent().close();     // getParent 일어난 이벤트의 상위 단계를 가리킴

                // let oDialog = sap.ui.getCore().byId("idDialog");
                // oDialog.close();
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
            }

        });
    });
