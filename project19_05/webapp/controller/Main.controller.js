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

        return Controller.extend("project1903.controller.Main", {
            onInit: function () {
                var oModel = new sap.ui.model.json.JSONModel({
                    combo: [
                        { key : 'PLUS', text : '+'},
                        { key : 'MINUS', text : '-'},
                        { key : 'DIVISION', text : '/'},
                        { key : 'MULTIPLE', text : '*'},

                    ],

                    history : []
                })

                this.getView().setModel(oModel);

                goModel = oModel;
                
                this.byId("fInput").setValue("10");
                this.byId("sInput").setValue("20");
            },

            onclick: function () {
                let oFinput = this.byId("fInput");
                let oSinput = this.byId("sInput");
                let oSelect = this.byId("operator");

                let fnum = parseInt(oFinput.getValue());
                let lnum = parseInt(oSinput.getValue());
                let oper = oSelect.getSelectedItem().getText();    // 기호 가져오기

                let sKey = oSelect.getSelectedKey();        // select key값 가져오기
                let result = 0;                                // 스위치 문 결과 저장

                switch (sKey) {
                    case "PLUS":
                        result = fnum + lnum;
                        break;

                    case "MINUS":
                        result = fnum - lnum;
                        break;

                    case "MULTIPLE":
                        result = fnum * lnum;
                        break;

                    case "DIVISION":
                        result = fnum / lnum;
                        break;

                    default:
                        result = "디폴트";
                        break;
                }

                MessageToast.show(result);                 // 메세지 출력

                this._addHistory(fnum, oper, lnum, result);

            },

            _addHistory: function(fnum, oper, lnum,result){
                let loData = goModel.getProperty("/history");
                loData.push({ fnum, oper, lnum, result });      // list 객체 push
                goModel.setProperty('/history', loData);   // goModel에 setProperty
                
            }
        });
    });
