import "./css/addressTool.css"
import { useRef, useState} from "react";

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
    const [nextColumnValue,setNextColumnValue] = useState(0)
    const [nextRowValue,setNextRowValue] = useState(0)
    const [length,setLength] = useState(0)
    const [newRowValue,setNewRowValue] = useState(0)
    const itemsRef = useRef(null)
    const getMap = () => {
        if (!itemsRef.current) {
            // 首次运行时初始化 Map。
            itemsRef.current = new Map();
        }
        return itemsRef.current;
    }

    //新增行方法
    const addRowValue = (columnValue, rowValue) => {
        // inputList[columnValue].map((el) => (el.disable = true))
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
            inputList.push([{
                id: "column" + columnValue + "row" + rowValue,
                disable: false,
                input: "",
                outSideStyle: "",
                class: "inputStyle",
                tips: "请输入数字",
            }]);
        } else {
            // getInputListValue.map((el) => (el.disable = true));
            inputList.push([{
                id: "column" + columnValue + "row" + rowValue,
                disable: false,
                input: "",
                outSideStyle: "",
                class: "inputStyle",
                tips: "请输入数字",
            }]);
        }
    };
    // 删除最后一个数据
    const deleteValue = (columnValue, rowValue) => {
        if (rowValue === 0 && columnValue === 0) {
            setColumnValue(0)
            setRowValue(0)
            handleFocus(0,0)
            // 初始化数据
            // 保证第一行第一列的元素不会被删除
        }else if (rowValue === 0){
            // 一般情况下且当元素只留下一个的时候
            inputList.splice(columnValue)
            setColumnValue(columnValue => columnValue -1)
            setRowValue( inputList[columnValue - 1].length - 1)
            handleFocus(columnValue - 1,inputList[columnValue - 1].length - 1)
            // inputList[columnValue - 1][inputList[columnValue - 1].length - 1].disable = false
         } else {
            // 平常情况
            inputList[columnValue].pop()
            setRowValue(rowValue => rowValue - 1)
            handleFocus(columnValue,rowValue - 1)
            // inputList[columnValue][rowValue - 1].disable = false
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
            setRowValue(rowValue => rowValue + 1)
            addRowValue(columnValue, rowValue + 1)
            setInputList(inputList => inputList)
            handleFocus(columnValue,rowValue + 1)
        }
    }
    const enter = (event) => {
        if (event.key === 'Enter'){
            // const inputListLength = inputList[columnValue].length - 1;
            // inputList[columnValue][rowValue].disable = true;
            if (rowValue !== 0) {
                setRowValue(0)
            }
            setColumnValue(columnValue => columnValue + 1)
            addColumnValue(columnValue + 1, 0);
            setInputList(inputList => inputList)
            handleFocus(columnValue + 1,0)
        }
    }
    const shift =  (event,id) => {
        if (event.key === 'Shift' ){
            const deleteInputValue = inputList.slice()
            const newColumnValue = parseInt(id[6])
            const newRowValue = parseInt(id[10])
            deleteInputValue[newColumnValue][newRowValue].input = ""
            // handleClearInput(columnValue,rowValue)
            setInputList(deleteInputValue)
        }
        if (event.key === 'Backspace' && event.shiftKey ){
            deleteValue(columnValue,rowValue)
            setInputList(inputList => inputList)
        }
        if (event.key === 'Delete' && event.shiftKey ){
            if (columnValue === 0 && rowValue !== 0){
                const updatedInputList = [...inputList];
                const length = -updatedInputList[0].length + 1
                updatedInputList[0].splice(length)
                setInputList(updatedInputList)
                setColumnValue(0)
                setRowValue(0)
                handleFocus(0,0)
            }
            else if (columnValue > 0){
                const updatedInputList = [...inputList];
                const result = removeRow(updatedInputList,columnValue)
                setColumnValue(columnValue => columnValue -1)
                setRowValue(rowValue => inputList[columnValue - 1].length - 1)
                setInputList(result)
                handleFocus(columnValue -1,inputList[columnValue - 1].length - 1)
            }
        }
    }

    const up = (event,id) => {
        if (parseInt(id[6]) - 1 >= 0){
            if (event.key === "ArrowUp") {
                //上一列的值
                const prevColumnValue = parseInt(id[6]) - 1
                // console.log(prevColumnValue)

                //当前行的值
                const prevRowValue = parseInt(id[10])
                setNextColumnValue(prevColumnValue)
                setNextRowValue(prevRowValue)
                // console.log(prevRowValue)

                //上一列的最后一个元素
                // console.log(prevColumnValue)

                const newRowValue = inputList[prevColumnValue].length - 1

                // console.log(newRowValue)

                //该行的元素比上一个元素大情况下
                // console.log(prevRowValue)
                // console.log(newRowValue)

                if (prevColumnValue === 0 && prevRowValue > newRowValue){
                    handleFocus(prevColumnValue,newRowValue)
                }else if (prevColumnValue > 0 && prevRowValue > newRowValue){
                    console.log(prevColumnValue)
                    console.log(newRowValue)
                    handleFocus(prevColumnValue,newRowValue )
                }else {
                    handleFocus(prevColumnValue,prevRowValue)
                }
            }
        }
    }

    // 下键进行focus
    const down = (event,id) => {
        if (parseInt(id[6]) + 1 <= columnValue){
            if (event.key === "ArrowDown"){
                // 下一列的值
                const prevColumnValue = parseInt(id[6]) + 1
                // 当前行的值
                const prevRowValue = parseInt(id[10])
                setNextColumnValue(prevColumnValue)
                setNextRowValue(prevRowValue)

                //下一列的长度
                // console.log(prevColumnValue)
                const newRowValue = inputList[prevColumnValue].length - 1
                // console.log(inputList[prevColumnValue].length)

                //最后一列
                // console.log(columnValue)
                //最后一列长度
                // console.log(inputList[columnValue].length)
                if (prevColumnValue - 1 !== columnValue && prevRowValue > newRowValue){
                    console.log(prevColumnValue,newRowValue)
                    handleFocus(prevColumnValue,newRowValue)
                }else if (prevColumnValue === columnValue){
                    handleFocus(columnValue,prevRowValue)
                }else {
                    handleFocus(prevColumnValue,prevRowValue)
                }
            }
        }
    }
    // 左键进行focus
    const left = (event,id) => {
        if (event.key === "ArrowLeft"){
            const prevColumnValue = parseInt(id[6])
            const prevRowValue = parseInt(id[10]) - 1
            setNextColumnValue(prevColumnValue)
            setNextRowValue(prevRowValue)
            if (prevRowValue >= 0){
                handleFocus(prevColumnValue,prevRowValue)
            }
        }
    }
    // 右键进行focus
    const right = (event,id) => {
        if (event.key === "ArrowRight"){
            const prevColumnValue = parseInt(id[6])
            const prevRowValue = parseInt(id[10]) + 1
            setNextColumnValue(prevColumnValue)
            setNextRowValue(prevRowValue)
            const length = inputList[prevColumnValue].length - 1
            if (prevRowValue <= length){
                handleFocus(prevColumnValue,prevRowValue)
            }
        }
    }
    // focus聚焦
    const handleFocus = (columnValue,rowValue) => {
        const id = `${inputList[columnValue][rowValue].id}`
        setTimeout(() => {
            itemsRef.current.get(id).focus()
        },0)
    }
    // 清除当前行的数据
    const handleClearInput = (columnValue,rowValue) => {
        const id = `${inputList[columnValue][rowValue].id}`
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