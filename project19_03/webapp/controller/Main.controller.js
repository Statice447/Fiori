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

                this.byId("fInput").setValue("10");
                this.byId("sInput").setValue("20");

                var oData = {
                    list: []
                };

                goModel = new JSONModel(oData);
                this.getView().setModel(goModel, 'main');
            },

            onclick: function () {
                let oFinput = this.byId("fInput");
                let oSinput = this.byId("sInput");
                let oSelect = this.byId("operator");

                let loData = goModel.getProperty("/list");

                let a = parseInt(oFinput.getValue());
                let b = parseInt(oSinput.getValue());
                let sItem = oSelect.getSelectedItem().getText();    // 기호 가져오기

                let sKey = oSelect.getSelectedKey();        // select key값 가져오기
                let sum = 0;                                // 스위치 문 결과 저장

                switch (sKey) {
                    case "PLUS":
                        sum = a + b;
                        break;

                    case "MINUS":
                        sum = a - b;
                        break;

                    case "MULTIPLE":
                        sum = a * b;
                        break;

                    case "DIVISION":
                        sum = a / b;
                        break;

                    default:
                        sum = "디폴트";
                        break;
                }

                MessageToast.show(sum);                 // 메세지 출력

                loData.push({ a, sItem, b, sum });      // list 객체 push
                goModel.setProperty('/list', loData);   // goModel에 setProperty

            }



            //     switch (c) {
            //         case "+":
            //             alert(a+b);
            //             break;

            //         case "-":
            //             alert(a-b);
            //             break;

            //         case "*":
            //             alert(a*b);
            //             break;

            //         case "/":
            //             alert(a/b);
            //             break;

            //         default:
            //             alert(c);
            //             break;
            //     }
            // }
        });
    });
