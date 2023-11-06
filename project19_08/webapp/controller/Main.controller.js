sap.ui.define(
        [
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
                    var oModel = new JSONModel({CustomerID: ''});

                    this.getView().setModel(oModel, "main");

                },

                onSearch: function () {
                    let oData = this.getView().getModel("main").getData();
                    // let oinput = this.byId("inputId").getValue();
                    debugger;
                    let afilter = [];
                    if (oData.OrderDate && oData.CustomerID) {
                        let oFilters = new Filter({
                            filters: [
                                // new Filter({
                                //     path: 'CustomerID',                
                                //     operator: 'EQ',                      
                                //     value1: oData.CustomerID,            
                                //     value2: '',                      
                                // }),
                                // new Filter({
                                //     path: 'OrderDate',               
                                //     operator: 'BT',                     
                                //     value1: oData.OrderDate,           
                                //     value2: oData.RequiredDate,                      
                                // }),
                                new Filter('CustomerID', 'EQ', oData.CustomerID),
                                new Filter('OrderDate', 'BT', oData.OrderDate, oData.RequiredDate ),],
                                and: true | false
                                
                    })
                    afilter.push(oFilters);
                    }
                    // if (oData.CustomerID) {
                    // //   필터 안에는 게이트웨이에 등록된 property 이름으로 해야한다. DB 테이블 이름을 그대로 가져오면 에러 
                    // /*
                    //     let oFilter = new Filter({     
                    //         path: 'CustomerID',              // 필터 대상 필드 이름    
                    //         operator: 'EQ',                  // 조건 (EQ, BT 등 비교연산자)     
                    //         value1: oData.CustomerID,        // From     
                    //         value2: '',                      // To 
                    //     });
                    // */
                    //     let oFilter = new Filter('CustomerID', 'EQ', oData.CustomerID); // 위랑 같은 의미

                    // // filters란 배열 형태로 여러 조건을 한번에 줄 수 있음 new filter({ filters: [필터객체1, 2, 3], and : true / false });

                    //     afilter.push(oFilter);
                    // }

                    // if (oData.OrderDate) {
                    //     let oFilterDate = new Filter('OrderDate', 'BT', oData.OrderDate, oData.RequiredDate ); // 위랑 같은 의미
                    //     afilter.push(oFilterDate);

                        
                    // }

                    // 데이터 바인딩된 정보 경로를 지정(items, rows 등) 테이블 객체를 가져와서, 바인딩 정보를 가져온 후, 필터 적용
                    this.getView().byId("idProductsTable").getBinding("items").filter(afilter);
                },

                onSelect(oEvent) {
             
                    let table = this.getView().byId("idCustomers")
                    let oDialog = table.getSelectedIndices();
                    var object = table.getRows()[oDialog].getCells()[0].getText();

                    // let data = table.getContextByIndex(oDialog);

                    let oinput = this.getView().byId("inputId");
                    oinput.setValue(object);

                    oEvent.getSource().getParent().close();
                },

                onValueHelp: function () {
                    this.byId("idDialog").open();

                    /*
                    let oDialog = sap.ui.getCore().byId("idDialog");      
                    // getCore로 Fragment를 가져 올 경우 

                    let oModel = this.getView().getModel();               
                    // Core로 불러올 경우 사용할 Model을 가져와야 한다. 
                    if(!oDialog){     
                            Fragment.load({         
                                name : 'odata.project1908.view.fragment.Customer',        
                                type : 'XML',
                                controller : this            // 소문자 controller, this-> dialog 컨트롤러를 사용한다.
                            }).then(function(oDialog){          
                                oDialog.setModel(oModel);
                                // Core로 불러올 경우 get으로 가져 온 oModel을 oDialog에 선언(set)해준다.         
                                oDialog.open();     }); 
                    } 

                    else
                        oDialog.open();
                    */

                },

                onClose: function (oEvent) {
                    oEvent.getSource().getParent().close(); // getParent 일어난 이벤트의 상위 단계를 가리킴

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
                    //선택 한 row 값의 경로을 가져온다
                    var sPath = oEvent.getParameters().rowContext.getPath();
                    var obj1 = this.getView().getModel().getProperty(sPath);
                    
                    //선택 한 row 값의 객체를 가져온다
                    var obj2 = oEvent.getParameters().rowContext.getObject();
                    
                    //선택 한 row 값의 객체에서 해당 데이터를 가져온다
                    var cusID = oEvent.getParameters().rowContext.getObject().CustomerID;

                    // fireEvent('이름') : 해당 id에 있는 event를 실행
                    // 주로 버튼 클릭 없이 row를 선택해서 이벤트를 처리하고 싶을 때 사용
                    // this.byId("idCustClose").fireEvent('press');

                    this.getView().getModel('main').setProperty("/CustomerID", cusID);
                    oEvent.getSource().getParent().close();

                    // let oinput = this.getView().byId("inputId");
                    // oinput.setValue(cusID);
                    // oEvent.getSource().getParent().close();
                },

                // 라우터 실행 버튼 이벤트
                onNavDetail(oEvent){
                    let oRouter = this.getOwnerComponent().getRouter();
                    debugger;
                    //           라우터 객체 이름
                    oRouter.navTo("RouteDetail", {
                        OrderID : "HI",       // 필수 파라미터
                        option : 123            // 선택 파라미터
                    })    

                },
                onSelectDetail(oEvent){
                    let oRouter = this.getOwnerComponent().getRouter();

                    // 선택한 테이블의 리스트 아이템에서 함수로 경로찾기
                    let select = oEvent.getParameters().listItem.getBindingContextPath();
                    
                    // 찾은 정보를 문자열 형태로 변경해주기 위해 변수 선언
                    let order = String(this.getView().getModel().getProperty(select).OrderID);

                    //           라우터 객체 이름
                    oRouter.navTo("RouteDetail", {
                        OrderID : order,       // 필수 파라미터
                        option : 123            // 선택 파라미터
                    })    

                }

            });
        }
    );
