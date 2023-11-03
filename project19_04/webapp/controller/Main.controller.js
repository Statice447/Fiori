sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",   // jsonmodel
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast) {
        "use strict";
        var goModel;

        return Controller.extend("project1904.controller.Main", {
            onInit: function () {
                var oData = {                           // json data
                    name: {
                        firstname: 'hong',             // odata.name.firstname
                        lastname: 'gildong'             // odata.name.lastname
                    },

                    inpValues: 'Park gildong',
                    // txtValue: 'Hong gildong',
                    // aaaa : ' ',

                    // 배열 바인딩 
                    list: [
                        { name: 'Jo', age: '10', tel: '010-1234-1234' },
                        { name: 'Hyeon', age: '20', tel: '010-4567-4567' },
                        { name: 'Rae', age: '30', tel: '010-8900-8900' }
                    ]
                };

                var oModel = new JSONModel(oData);      // json model 
                goModel = oModel;
                this.getView().setModel(oModel, 'main');       // main이라는 이름
                // this.getView().setModel(oModel, 'test');
            },

            onclick: function (oEvent) {
                // debugger;
                let oModel = this.getView().getModel("main");

                let oData = oModel.getProperty("/abcd");
                MessageToast.show(oData);

                oModel.setProperty("/txtValue", oData);

                // let oData = oModel.getData().inpValues;
                // console.log(oData);
                // MessageToast.show(oData);
            },

            addList: function (oEvent) {
                // oEvent.getParameters() : 이벤트 관련 정보를 반환
                // oEvent.getSource() :이벤트를 일으킨 객체를 반환


                // let oModel = this.getView().getModel("main");
                let loData = goModel.getProperty("/list");

                loData.push({});

                goModel.setProperty("/list", loData);


            },
            deleteList() {
                // let oModel = this.getView().getModel("main");
                let loData = goModel.getProperty("/list");

                let table = this.getView().byId("table");
                let id = table.getSelectedIndices();

                let b = id.length;      // 선택된 테이블 인덱스 길이 확인

                if(b==0){
                    // 체크를 하지 않았을 경우
                    // MessageToast.show("체크하셈");
                    return sap.m.MessageBox.error("체크하셈");
                }
                else{
                    // for(let i = 0; i < b; i++){
                    //     if(i<1)
                    //         // 처음에는 리스트가 그대로이므로 인덱스 위치 그대로 삭제
                    //         loData.splice(id[i], 1);           
                    //     else
                    //         // 한번 삭제 이후 부터는 삭제 건만큼 배열이 당겨지므로 지운 수 만큼 위치 조정
                    //         loData.splice(id[i]-i, 1);
                    // }
                        for(let i = b-1; i >= 0; i--){
                            // 인덱스가 작은 순서로 지우면 배열이 밀려올라가므로 인덱스가 큰 수 부터 삭제
                            loData.splice(id[i], 1);           
                    }
                    goModel.setProperty("/list", loData);     
                    
                }

                           
            },
            onRowAction: function (oEvent) {
                let loData = goModel.getProperty("/list");

                // 내가 선택한 Row의 Index 정보 확인
                let index = oEvent.getParameter('row').getIndex();

                // Index 정보로 삭제 구현
                loData.splice(index, 1);
                goModel.setProperty("/list", loData);

                // goModel.setProperty("/list", loData);


            }
        });
    });
