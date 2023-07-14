import "./css/addressTool.css"
import { useRef, useState} from "react";

export const AddressTool = () => {
    const [rowValue,setRowValue] = useState(0)
    const [columnValue,setColumnValue] = useState(0)
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
    const [nextRowValue,setNextRowValue] = useState(0)
    const [nextColumnValue,setNextColumnValue] = useState(0)
    const [length,setLength] = useState(0)
    const [newColumnValue,setNewColumnValue] = useState(0)
    const itemsRef = useRef(null)
    const getMap = () => {
        if (!itemsRef.current) {
            // 首次运行时初始化 Map。
            itemsRef.current = new Map();
        }
        return itemsRef.current;
    }

    //新增行方法
    const addcolumnValue = (rowValue, columnValue) => {
        // inputList[rowValue].map((el) => (el.disable = true))
            inputList[rowValue].push({
                id: "column" + rowValue + "row" + columnValue,
                disable: false,
                input: "",
                outSideStyle: "",
                class: "inputStyle",
                tips: "请输入数字",
            })
    }

// 新增列的方法
    const addrowValue = (rowValue, columnValue) => {
        let getInputListValue = inputList[rowValue];
        if (getInputListValue === undefined) {
            inputList.push([{
                id: "column" + rowValue + "row" + columnValue,
                disable: false,
                input: "",
                outSideStyle: "",
                class: "inputStyle",
                tips: "请输入数字",
            }]);
        } else {
            // getInputListValue.map((el) => (el.disable = true));
            inputList.push([{
                id: "column" + rowValue + "row" + columnValue,
                disable: false,
                input: "",
                outSideStyle: "",
                class: "inputStyle",
                tips: "请输入数字",
            }]);
        }
    };
    // 删除最后一个数据
    const deleteValue = (rowValue, columnValue) => {
        if (columnValue === 0 && rowValue === 0) {
            setRowValue(0)
            setColumnValue(0)
            handleFocus(0,0)
            // 初始化数据
            // 保证第一行第一列的元素不会被删除
        }else if (columnValue === 0){
            // 一般情况下且当元素只留下一个的时候
            inputList.splice(rowValue)
            setRowValue(rowValue => rowValue -1)
            setColumnValue( inputList[rowValue - 1].length - 1)
            handleFocus(rowValue - 1,inputList[rowValue - 1].length - 1)
            // inputList[rowValue - 1][inputList[rowValue - 1].length - 1].disable = false
         } else {
            // 平常情况
            inputList[rowValue].pop()
            setColumnValue(columnValue => columnValue - 1)
            handleFocus(rowValue,columnValue - 1)
            // inputList[rowValue][columnValue - 1].disable = false
        }
    }
    //删除某一整列数据
    const removeRow = (arr, rowIndex) => {
        // 创建一个新的二维数组，用于存储不包含要删除的子数组
        const newArr = arr.filter((_, index) => index !== rowIndex);
        // 返回新的二维数组
        return newArr;
    }

    // 按键事件
    const tab = (event) => {
        if (event.key === 'Tab'){
            setColumnValue(columnValue => columnValue + 1)
            addcolumnValue(rowValue, columnValue + 1)
            setInputList(inputList => inputList)
            handleFocus(rowValue,columnValue + 1)
        }
    }
    const enter = (event) => {
        if (event.key === 'Enter'){
            // const inputListLength = inputList[rowValue].length - 1;
            // inputList[rowValue][columnValue].disable = true;
            if (columnValue !== 0) {
                setColumnValue(0)
            }
            setRowValue(rowValue => rowValue + 1)
            addrowValue(rowValue + 1, 0);
            setInputList(inputList => inputList)
            handleFocus(rowValue + 1,0)
        }
    }
    const shift =  (event,id) => {
        if (event.key === 'Shift' ){
            const deleteInputValue = inputList.slice()
            const newrowValue = parseInt(id[6])
            const newColumnValue = parseInt(id[10])
            deleteInputValue[newrowValue][newColumnValue].input = ""
            // handleClearInput(rowValue,columnValue)
            setInputList(deleteInputValue)
        }
        if (event.key === 'Backspace' && event.shiftKey ){
            deleteValue(rowValue,columnValue)
            setInputList(inputList => inputList)
        }
        if (event.key === 'Delete' && event.shiftKey ){
            if (rowValue === 0 && columnValue !== 0){
                const updatedInputList = [...inputList];
                const length = -updatedInputList[0].length + 1
                updatedInputList[0].splice(length)
                setInputList(updatedInputList)
                setRowValue(0)
                setColumnValue(0)
                handleFocus(0,0)
            }
            else if (rowValue > 0){
                const updatedInputList = [...inputList];
                const result = removeRow(updatedInputList,rowValue)
                setRowValue(rowValue => rowValue -1)
                setColumnValue(columnValue => inputList[rowValue - 1].length - 1)
                setInputList(result)
                handleFocus(rowValue -1,inputList[rowValue - 1].length - 1)
            }
        }
    }

    const up = (event,id) => {
        if (parseInt(id[6]) - 1 >= 0){
            if (event.key === "ArrowUp") {
                //上一列的值
                const prevRowValue = parseInt(id[6]) - 1
                // console.log(prevRowValue)

                //当前行的值
                const prevColumnValue = parseInt(id[10])
                setNextRowValue(prevRowValue)
                setNextColumnValue(prevColumnValue)
                // console.log(prevColumnValue)

                //上一列的最后一个元素
                // console.log(prevRowValue)

                const newColumnValue = inputList[prevRowValue].length - 1

                // console.log(newColumnValue)

                //该行的元素比上一个元素大情况下
                // console.log(prevColumnValue)
                // console.log(newColumnValue)

                if (prevRowValue === 0 && prevColumnValue > newColumnValue){
                    handleFocus(prevRowValue,newColumnValue)
                }else if (prevRowValue > 0 && prevColumnValue > newColumnValue){
                    console.log(prevRowValue)
                    console.log(newColumnValue)
                    handleFocus(prevRowValue,newColumnValue )
                }else {
                    handleFocus(prevRowValue,prevColumnValue)
                }
            }
        }
    }

    // 下键进行focus
    const down = (event,id) => {
        if (parseInt(id[6]) + 1 <= rowValue){
            if (event.key === "ArrowDown"){
                // 下一列的值
                const prevRowValue = parseInt(id[6]) + 1
                // 当前行的值
                const prevColumnValue = parseInt(id[10])
                setNextRowValue(prevRowValue)
                setNextColumnValue(prevColumnValue)

                //下一列的长度
                // console.log(prevRowValue)
                const newColumnValue = inputList[prevRowValue].length - 1
                // console.log(inputList[prevRowValue].length)

                //最后一列
                // console.log(rowValue)
                //最后一列长度
                // console.log(inputList[rowValue].length)
                if (prevRowValue - 1 !== rowValue && prevColumnValue > newColumnValue){
                    console.log(prevRowValue,newColumnValue)
                    handleFocus(prevRowValue,newColumnValue)
                }else if (prevRowValue === rowValue){
                    handleFocus(rowValue,prevColumnValue)
                }else {
                    handleFocus(prevRowValue,prevColumnValue)
                }
            }
        }
    }
    // 左键进行focus
    const left = (event,id) => {
        if (event.key === "ArrowLeft"){
            const prevRowValue = parseInt(id[6])
            const prevColumnValue = parseInt(id[10]) - 1
            setNextRowValue(prevRowValue)
            setNextColumnValue(prevColumnValue)
            if (prevColumnValue >= 0){
                handleFocus(prevRowValue,prevColumnValue)
            }
        }
    }
    // 右键进行focus
    const right = (event,id) => {
        if (event.key === "ArrowRight"){
            const prevRowValue = parseInt(id[6])
            const prevColumnValue = parseInt(id[10]) + 1
            setNextRowValue(prevRowValue)
            setNextColumnValue(prevColumnValue)
            const length = inputList[prevRowValue].length - 1
            if (prevColumnValue <= length){
                handleFocus(prevRowValue,prevColumnValue)
            }
        }
    }
    // focus聚焦
    const handleFocus = (rowValue,columnValue) => {
        const id = `${inputList[rowValue][columnValue].id}`
        setTimeout(() => {
            itemsRef.current.get(id).focus()
        },0)
    }
    // 清除当前行的数据
    const handleClearInput = (rowValue,columnValue) => {
        const id = `${inputList[rowValue][columnValue].id}`
        setTimeout(() => {
            itemsRef.current.get(id).input = ""
        },0)
    }
    const handleKeyDown = (event,id) => {
        tab(event)
        enter(event)
        shift(event,id)
        up(event,id)
        down(event,id)
        left(event,id)
        right(event,id)
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
                                ref={(node) => {
                                    const map = getMap();
                                    if (node) {
                                        map.set(li.id, node);
                                    } else {
                                        map.delete(li.id);
                                    }
                                }}
                                type="text"
                                className={li.class}
                                onChange={(e) => handleChange(e,index,liIndex)}
                                onKeyDown={(e) => handleKeyDown(e,li.id)}
                                disabled={li.disable}
                                value={li.input}
                                placeholder={li.tips}
                            />
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
  )
}