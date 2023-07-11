import "./css/addressTool.css"
import {useState} from "react";
export const AddressTool = () => {
    const [inputList,setInputList]  = useState(
        [
            [
                {
                    id: "column" + 0 + "row" + 0,
                    disable: false,
                    input: "",
                    outSideStyle: "content-tab",
                    class: "inputStyle",
                    tips: "请输入数字",
                },
            ],
        ]
    )
    let columnValue = 0
    let rowValue = 0
    //新增行方法
    const addRowValue = (columnValue, rowValue) => {
        inputList[columnValue].map((el) => (el.disable = true));
        inputList[columnValue].push({
            id: "column" + columnValue + "row" + rowValue,
            disable: false,
            input: "",
            outSideStyle: "",
            class: "inputStyle",
            tips: "请输入数字",
        });
    }

// 新增列的方法
    const addColumnValue = (columnValue, rowValue) => {
        let getInputListValue = inputList.value[columnValue];
        if (getInputListValue === undefined) {
            inputList.push([
                {
                    id: "column" + columnValue + "row" + rowValue,
                    disable: false,
                    input: "",
                    outSideStyle: "",
                    class: "inputStyle",
                    tips: "请输入数字",
                },
            ]);
        } else {
            getInputListValue.map((el) => (el.disable = true));
            inputList.push([
                {
                    id: "column" + columnValue + "row" + rowValue,
                    disable: false,
                    input: "",
                    outSideStyle: "",
                    class: "inputStyle",
                    tips: "请输入数字",
                },
            ]);
        }
    };
    //删除方法
    const deleteValue = (columnValue,rowValue) => {
        if (rowValue === 0 && columnValue === 0) {
            // 初始化数据
            columnValue = 0
            rowValue = 0
            // 保证第一行第一列的元素不会被删除
        }else if (rowValue == 0){
            // 一般情况下且当元素只留下一个的时候
            inputList.splice(columnValue)
            columnValue = columnValue - 1
            rowValue = inputList[columnValue].length - 1
            inputList[columnValue][rowValue].disable = false
        } else {
            // 平常情况
            inputList[columnValue].pop()
            rowValue = rowValue - 1
            inputList[columnValue][rowValue].disable = false
        }
    }

    // 按键事件
    const tab = (event) => {
        if (event.key === 9){
            rowValue = rowValue + 1;
            addRowValue(columnValue, rowValue);
            console.log(inputList)
        }
    }
    const enter = (event) => {
        if (event.key === 13){
            const inputListLength = inputList[columnValue].length - 1;
            inputList[columnValue][inputListLength].disable = true;
            if (rowValue != 0) {
                rowValue = 0;
            }
            columnValue = columnValue + 1;
            addColumnValue(columnValue, rowValue);
        }
    }
    const shift = (event) => {
        if (event.key === 16){
            if (rowValue == 0 && columnValue == 0) {
                // 初始化数据
                columnValue = 0
                rowValue = 0
                // 保证第一行第一列的元素不会被删除
            }else if (rowValue == 0){
                // 一般情况下且当元素只留下一个的时候
                inputList.splice(columnValue)
                columnValue = columnValue - 1
                rowValue = inputList[columnValue].length - 1
                inputList[columnValue][rowValue].disable = false
            } else {
                // 平常情况
                inputList[columnValue].pop()
                rowValue = rowValue - 1
                inputList[columnValue][rowValue].disable = false
            }
        }
    }
    const [inputValue, setInputValue] = useState('');

    const handleChange = e => {
        setInputValue(e.target.value);
    };
  return(
    <div>
        {inputList.map((outsideList,index) => (
            <div className="outsideStyle" key={index}>
                <div className="insideStyle">
                    {outsideList.map((li,liIndex) => (
                        <div key={liIndex}>
                            <input
                                type="text"
                                className="fixBar"
                                disabled="false"
                                placeholder="0x"
                            />
                            <input
                                id={li.id}
                                type="text"
                                className={li.class}
                                onKeyDown={tab}
                                onKeyDown={enter}
                                onKeyDown={shift}
                                onClick={tab}
                                disabled={li.disable}
                                value={inputValue}
                                placeholder={li.tips}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
  )
}