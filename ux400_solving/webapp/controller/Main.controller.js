sap.ui.define(
    [
        "sap/ui/core/mvc/Controller", 
        "sap/ui/model/json/JSONModel", 
        "sap/ui/core/Fragment", 
        "sap/ui/core/format/DateFormat",
        "sap/m/MessageBox",
    ],
    /**
 * @param {typeof sap.ui.core.mvc.Controller} Controller
 */
    // define에 선언한 기본 값들 최초 function에 선언
    function (Controller, JSONModel, Fragment, DateFormat, MessageBox) {
        "use strict";
        var goModel;

        return Controller.extend("sap.btp.ux400solving.controller.Main", {
            // 초기 init 값 설정
            onInit: function () {
                var oData = {
                    list: []
                }
                var oModel = new JSONModel(oData);
                goModel = oModel;
                this.getView().setModel(oModel, 'main');

            },

            // 랜덤 숫자 만들기 버튼
            onRandomPress() {
                // input ID 가져오기
                let oInput = this.byId("inputID");

                // 초기 inputValueState 설정
                oInput.setValueState(sap.ui.core.ValueState.None);

                // 랜덤 숫자 만들기 + input에 set
                oInput.setValue(Math.floor(Math.random() * 100) + 1);

                // 리스트에 넣기 위한 모델선언 및 push
                let oData = goModel.getProperty("/list");
                let result = Number(oInput.getValue());
                oData.push({result});

                goModel.setProperty("/list", oData);

            },

            onDelete(){
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

            // Dialog 박스 open
            onProduct() {
                this.byId("idDialog").open();
            },

            // Dialog 박스 닫기 버튼
            onClose: function (oEvent) {
                oEvent.getSource().getParent().close(); // getParent 일어난 이벤트의 상위 단계를 가리킴

            },

            // Formatter 함수
            transformDiscontinued: function (value) {
                return value ? 'Yes': 'No';
            },

            // Input 필드 변경 시 에러메시지 적용
            onValueChange() {
                //debugger;
                let oInput = this.byId("inputID");
                let num = Number(oInput.getValue());

                // 1이상 100이하 숫자 조건 넣기
                if (num > 100 || num < 0) {
                    // inputValueState 설정하기
                    oInput.setValueState(sap.ui.core.ValueState.Error);
                    oInput.setValueStateText("1이상 100이하로 숫자를 입력하세요");
                }
                else 
                {
                    // inputValueState 설정하기
                    oInput.setValueState(sap.ui.core.ValueState.Success);

                    // 정상일 경우 리스트에 넣기 : get모델, push
                    let oData = goModel.getProperty("/list");
                    let result = Number(oInput.getValue());
                    oData.push({result});

                    goModel.setProperty("/list", oData);
                }
            }
        });
    }
);