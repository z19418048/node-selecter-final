import "./css/addressTool.css"
import {useEffect, useRef, useState} from "react";

export const AddressTool = () => {
    const [columnValue,setColumnValue] = useState(0)
    const [rowValue,setRowValue] = useState(0)
    const [inputList,setInputList] = useState(
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
    const ref = useRef(columnValue[columnValue][rowValue].id)
    // useEffect(() => {
    //     document
    //         .getElementById(`${inputList[columnValue][rowValue].id}`)
    //         .focus()
    // })
    //新增行方法
    const addRowValue = (columnValue, rowValue) => {
        inputList[columnValue].map((el) => (el.disable = true))
        inputList[columnValue].push({
            id: "column" + columnValue + "row" + rowValue,
            disable: false,
            input: "",
            outSideStyle: "",
            class: "inputStyle",
            tips: "请输入数字",
        })
    }

// 新增列的方法
    const addColumnValue = (columnValue, rowValue) => {
        let getInputListValue = inputList[columnValue];
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
    const deleteValue = (columnValue,rowValue) => {
        if (rowValue === 0 && columnValue === 0) {
            setColumnValue(0)
            setRowValue(0)
            // 初始化数据
            // 保证第一行第一列的元素不会被删除
        }else if (rowValue === 0){
            // 一般情况下且当元素只留下一个的时候
            inputList.splice(columnValue)
            setColumnValue(columnValue => columnValue -1)
            setRowValue( inputList[columnValue - 1].length - 1)
            inputList[columnValue - 1][inputList[columnValue - 1].length - 1].disable = false

         } else {
            // 平常情况
            inputList[columnValue].pop()
            setRowValue(rowValue => rowValue - 1)
            inputList[columnValue][rowValue - 1].disable = false

        }
    }
    // 按键事件
    const tab = (event) => {
        if (event.key === 'Tab'){
            setRowValue(rowValue => rowValue + 1)
            addRowValue(columnValue, rowValue + 1)
            setInputList(inputList => inputList)
            console.log(inputList)
        }
    }
    const enter = (event) => {
        if (event.key === 'Enter'){
            const inputListLength = inputList[columnValue].length - 1;
            inputList[columnValue][rowValue].disable = true;
            if (rowValue !== 0) {
                setRowValue(0)
            }
            setColumnValue(columnValue => columnValue + 1)
            addColumnValue(columnValue + 1, rowValue);
            setInputList(inputList => inputList)

        }
    }
    const shift =  (event) => {
        if (event.key === 'Shift'){
            deleteValue(columnValue,rowValue)
            setInputList(inputList => inputList)
        }
    }

    const handleKeyDown = (event) => {
        tab(event)
        enter(event)
        shift(event)
    }

    const handleChange = (event, rowIndex, colIndex) => {
        const updatedInputList = [...inputList];
        updatedInputList[rowIndex][colIndex].input = event.target.value;
        setInputList(updatedInputList);
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
                                key={`${index}-${liIndex}`}
                                id={li.id}
                                type="text"
                                className={li.class}
                                onChange={(e) => handleChange(e,index,liIndex)}
                                onKeyDown={handleKeyDown}
                                disabled={li.disable}
                                value={li.input}
                                placeholder={li.tips}
                                autoFocus={index === inputList.length - 1
                                    && liIndex === outsideList.length - 1}
                            />
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
  )
}