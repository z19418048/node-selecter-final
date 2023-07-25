import "./css/HexInput.css"
import { useRef, useState} from "react";
import {Card, Input, Tag} from "tdesign-react";

export const HexInput = ({ data,slices }) => {
    const [rowValue, setRowValue] = useState(0)
    const [columnValue, setColumnValue] = useState(0)
    const InitInputList = [
        {
            id: "row" + 0 + "column" + 0,
            disable: false,
            input: "",
            class: "inputStyle",
            changeClass:"changeInputStyle",
            tips: "请输入数字",
        }
    ]
    const updateInputList = (List) => {
        for (let i = 0; i <= data.length - 1; i++){
            if (i === 0){
             List[i].input = data[i]
            }else{
                List.push(
                    {
                        id: "row" + 0 + "column" + i,
                        disable: false,
                        input: data[i],
                        class: "inputStyle",
                        changeClass:"changeInputStyle",
                        tips: "请输入数字",
                    }
                )
            }
        }
    }
    updateInputList(InitInputList)
    const [inputList, setInputList] = useState(
        [InitInputList]
    )
    const [nextRowValue, setNextRowValue] = useState(0)
    const [nextColumnValue, setNextColumnValue] = useState(0)
    const [changeStyle, setChangeStyle] = useState(null)
    const [validate,setValidate] = useState(null)
    const itemsRef = useRef(null)
    const getMap = () => {
        if (!itemsRef.current) {
            // 首次运行时初始化 Map。
            itemsRef.current = new Map();
        }
        return itemsRef.current;
    }
    // 从id中获取数字元素
    const handleNumber = (text) => {
        const regex = /\d+/g;
        const numbers = text.match(regex);
        return numbers
    }
    const handleInitId = (rowValue) => {
        //当前行的长度
        const rowLength = inputList.length
        for (let i = 0; i < rowLength - rowValue; i++) {
            const columnLength = inputList[rowValue + i].length - 1
            for (let j = 0; j<= columnLength; j++){
                inputList[rowValue + i][j].id =
                    `row${rowValue + i}column${j}`
            }
        }
    }
    // focus聚焦
    const handleFocus = (rowValue, columnValue) => {
        const id = `${inputList[rowValue][columnValue].id}`
        setTimeout(() => {
            itemsRef.current.get(id).focus()
        }, 0)
    }
    //删除一整行的数据
    const removeRow = (arr, rowIndex) => {
        // 创建一个新的二维数组，用于存储不包含要删除的子数组
        const newArr = arr.filter((_, index) => index !== rowIndex);
        // 返回新的二维数组
        return newArr;
    }
    //新增行方法
    const addRowValue = (rowValue, columnValue, id) => {
        const addValue = {
            id: "row" + rowValue + "column" + columnValue,
            disable: false,
            input: "",
            class: "inputStyle",
            changeClass:"changeInputStyle",
            tips: "请输入数字",
        }
        inputList[rowValue].splice(columnValue, 0, addValue)
    }
    // 新增列的方法
    const addColumnValue = (rowValue, columnValue, id) => {
        const addValue = [{
            id: "row" + rowValue + "column" + columnValue,
            disable: false,
            input: "",
            class: "inputStyle",
            changeClass:"changeInputStyle",
            tips: "请输入数字",
        }]
        inputList.splice(rowValue, 0, addValue)
    };
    // 删除最后一个数据
    const deleteValue = (rowValue, columnValue) => {
        // 所有行只剩下一行的情况下，保证第一个数据不会删除
        if (rowValue === 0 && columnValue === 0
            && inputList.length -1 === 0 && inputList[0].length - 1 === 0 ){
            setRowValue(0)
            setColumnValue(0)
            handleFocus(0, 0)
            // 初始化数据
            // 保证第一行第一列的元素不会被删除
        }
        else if (rowValue === 0 && columnValue === 0
            && inputList.length -1 === 0 && inputList[0].length - 1 !== 0 ){
            const updateInputList = [...inputList]
            updateInputList[rowValue].pop()
            setInputList(updateInputList)
            setRowValue(rowValue => rowValue)
            setColumnValue(inputList[rowValue].length - 1)
            handleFocus(rowValue, columnValue )
            handleInitId(rowValue)
        }
        else if (rowValue === 0 && columnValue === 0
            && inputList.length - 1 !== 0 && inputList[0].length - 1 !== 0){
            inputList[rowValue].pop()
            setRowValue(rowValue => rowValue)
            setColumnValue(inputList[rowValue].length - 1)
            handleFocus(rowValue, columnValue)
            handleInitId(rowValue)
            // inputList[rowValue].splice(columnValue,1)
            // setRowValue(rowValue => rowValue)
            // setColumnValue(columnValue => columnValue)
            // handleInitId(rowValue)
            // handleFocus(rowValue,columnValue)
        }
        else if (rowValue === 0 && columnValue === 0
            && inputList.length - 1 !== 0 && inputList[0].length - 1 === 0){
            const updatedInputList = [...inputList];
            inputList.splice(rowValue,1)
            const result = removeRow(updatedInputList, rowValue)
            setRowValue(rowValue => rowValue )
            setColumnValue(columnValue => inputList[rowValue].length - 1)
            setInputList(result)
            handleInitId(rowValue)
            handleFocus(rowValue,columnValue)
        }
        else if (columnValue === 0 && inputList[rowValue].length - 1 === 0) {
            // 一般情况下且当元素只留下一个的时候
            const updatedInputList = [...inputList];
            updatedInputList.splice(rowValue,1)
            setInputList(updatedInputList)
            setRowValue(rowValue => rowValue - 1)
            setColumnValue(inputList[rowValue - 1].length - 1)
            handleFocus(rowValue - 1, inputList[rowValue - 1].length - 1)
            //总共行的值
            const length = inputList.length
            handleInitId(rowValue)
            //当前行的值
            /*                if (rowValue  !== length){
                                for (let i = 0; i < length - rowValue; i++) {
                                    const columnLength = inputList[rowValue + i].length - 1
                                    for (let j = 0; j<= columnLength; j++){
                                        inputList[rowValue + i][j].id =
                                            `row${rowValue + i}column${j}`
                                    }
                                }
                            }*/

        }else if (columnValue === 0 && inputList[rowValue].length - 1 !== 0){
            const updateInputList = [...inputList]
            updateInputList[rowValue].pop()
            setInputList(updateInputList)
            setRowValue(rowValue => rowValue)
            setColumnValue(inputList[rowValue].length - 1)
            handleFocus(rowValue, columnValue )
            handleInitId(rowValue)

        } else {
            // 平常情况
            const updateInputList = [...inputList]
            updateInputList[rowValue].pop()
            setInputList(updateInputList)
            setRowValue(rowValue => rowValue)
            setColumnValue(columnValue => columnValue - 1)
            handleFocus(rowValue, columnValue - 1)
            handleInitId(rowValue)
        }
    }
    // 按键事件
    const tab = (event, id) => {
        if (event.key === 'Tab') {
            const rowValueLength = parseInt(handleNumber(id)[0])
            const columnValueLength = parseInt(handleNumber(id)[1])
            if (columnValueLength + 1 === inputList[rowValueLength].length
                && inputList[rowValueLength][columnValueLength].input !== ""
                && validate !== false
            ){
                const length = inputList[rowValueLength].length
                setColumnValue(columnValue => columnValue + 1)
                addRowValue(rowValueLength, columnValueLength + 1, id)
                if (columnValueLength + 1 !== length) {
                    for (let i = 0; i <= length - columnValueLength; i++) {
                        inputList[rowValueLength][columnValueLength + i].id =
                            `row${rowValueLength}column${columnValueLength + i}`
                    }
                }
                setInputList(inputList => inputList)
                handleFocus(rowValueLength, columnValueLength + 1)
            } else if (columnValueLength + 1 < inputList[rowValueLength].length
                && validate !== false){
                handleFocus(rowValueLength,columnValueLength + 1)
            }
            else {
                handleFocus(rowValueLength,columnValueLength)
            }
            console.log(inputList)
        }
    }
    const enter = (event, id) => {
        if (event.key === 'Enter') {
            const rowValueLength = parseInt(handleNumber(id)[0])
            const columnValueLength = parseInt(handleNumber(id)[1])
            const length = inputList.length
            console.log(rowValueLength)
            console.log(length)
            if (rowValueLength + 1 === length
                && inputList[rowValueLength][columnValueLength].input !== ""
                && validate !== false
            ){
                if (columnValue !== 0) {
                    setColumnValue(0)
                }
                setRowValue(rowValue => rowValue + 1)
                addColumnValue(rowValueLength + 1, 0, id);
                if (rowValueLength + 1 !== length) {
                    for (let i = 0; i <= length - rowValueLength; i++) {
                        const columnLength = inputList[rowValueLength + i].length - 1
                        for (let j = 0; j<= columnLength; j++){
                            inputList[rowValueLength + i][j].id =
                                `row${rowValueLength + i}column${j}`
                        }
                    }
                }
                handleFocus(rowValueLength + 1, 0)
                setInputList(inputList => inputList)
            } else if (rowValueLength + 1 < length){
                handleFocus(rowValueLength + 1, 0)
            }
            else {
                handleFocus(rowValueLength,columnValueLength)
            }

        }
    }
    const shift = (event, id) => {
/*        if (event.key === 'Shift') {
            const deleteInputValue = inputList.slice()
            const newRowValue = parseInt(handleNumber(id)[0])
            const newColumnValue = parseInt(handleNumber(id)[1])
            deleteInputValue[newRowValue][newColumnValue].input = ""
            // handleClearInput(rowValue,columnValue)
            setInputList(deleteInputValue)
        }*/

/*        if (event.key === 'Backspace' && event.shiftKey) {
            const newRowValue = parseInt(handleNumber(id)[0])
            const newColumnValue = parseInt(handleNumber(id)[1])
            //TODO
            deleteValue(newRowValue, newColumnValue)
            setInputList(inputList => inputList)
            console.log(inputList)
        }*/


        if (event.key === 'Delete' && event.shiftKey) {
            //当前行
            const newRowValue = parseInt(handleNumber(id)[0])
            //当前列
            const newColumnValue = parseInt(handleNumber(id)[1])
            //TODO
            if (newRowValue === 0  && inputList.length - 1 !== 0){
                const updatedInputList = [...inputList];
                inputList.splice(newRowValue,1)
                const result = removeRow(updatedInputList, newRowValue)
                const length = inputList.length
                setRowValue(rowValue => rowValue +  1)
                setColumnValue(columnValue => inputList[newRowValue].length - 1)
                setInputList(result)
                for (let i = 0; i < length - newRowValue; i++) {
                    const columnLength = inputList[newRowValue + i].length - 1
                    for (let j = 0; j<= columnLength; j++){
                        inputList[newRowValue + i][j].id =
                            `row${newRowValue + i}column${j}`
                    }
                }
                handleFocus(newRowValue, inputList[newRowValue].length - 1)
            }
            // else if (newRowValue === 0 && newColumnValue !== 0 && inputList.length - 1 === 0) {
            //     const updatedInputList = [...inputList];
            //     const length = -updatedInputList[0].length + 1
            //     updatedInputList[0].splice(length)
            //     setInputList(updatedInputList)
            //     setRowValue(0)
            //     setColumnValue(0)
            //     handleFocus(0, 0)
            // }
            else if (newRowValue === 0  && inputList.length - 1 === 0) {
                const updatedInputList = [...inputList];
                updatedInputList.splice(newRowValue,1)
                setInputList(inputList =>  updatedInputList)
            }
            else if (newRowValue > 0) {
                const updatedInputList = [...inputList];
                inputList.splice(newRowValue,1)
                const result = removeRow(updatedInputList, newRowValue)
                const length = inputList.length
                setRowValue(rowValue => rowValue - 1)
                setColumnValue(columnValue => inputList[newRowValue - 1].length - 1)
                setInputList(result)
                for (let i = 0; i < length - newRowValue; i++) {
                    const columnLength = inputList[newRowValue + i].length - 1
                    for (let j = 0; j<= columnLength; j++){
                        inputList[newRowValue + i][j].id =
                            `row${newRowValue + i}column${j}`
                    }
                }
                handleFocus(newRowValue - 1, inputList[newRowValue - 1].length - 1)
            }
            console.log(inputList)
        }

        if (event.key === 'Tab' && event.shiftKey){
            const newRowValue = parseInt(handleNumber(id)[0])
            const newColumnValue = parseInt(handleNumber(id)[1])
            if (newColumnValue - 1 === 0){
                handleFocus(newRowValue,0)
            }else if (newColumnValue - 1 !== 0 && newColumnValue -1 > 0){
                handleFocus(newRowValue,newColumnValue - 1)
            }
        }
    }
    const up = (event, id) => {
        const rowValueLength = parseInt(handleNumber(id)[0])
        const columnValueLength = parseInt(handleNumber(id)[1])
        if (rowValueLength - 1 >= 0) {
            if (event.key === "ArrowUp") {
                //上一列的值
                const prevRowValue = rowValueLength - 1
                // console.log(prevRowValue)

                //当前行的值
                const prevColumnValue = columnValueLength
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

                if (prevRowValue === 0 && prevColumnValue > newColumnValue) {
                    handleFocus(prevRowValue, newColumnValue)
                } else if (prevRowValue > 0 && prevColumnValue > newColumnValue) {
                    // console.log(prevRowValue)
                    // console.log(newColumnValue)
                    handleFocus(prevRowValue, newColumnValue)
                } else {
                    handleFocus(prevRowValue, prevColumnValue)
                }
            }
        }
    }
    // 下键进行focus
    const down = (event, id) => {
        const rowValueLength = parseInt(handleNumber(id)[0])
        const columnValueLength = parseInt(handleNumber(id)[1])
        if (rowValueLength + 1 <= rowValue) {
            if (event.key === "ArrowDown") {
                // 下一行的值
                const prevRowValue = rowValueLength + 1
                // 当前列的值
                const prevColumnValue = columnValueLength
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
                if (prevRowValue - 1 !== rowValue && prevColumnValue > newColumnValue) {
                    console.log(prevRowValue, newColumnValue)
                    handleFocus(prevRowValue, newColumnValue)
                } else if (prevRowValue === rowValue) {
                    handleFocus(rowValue, prevColumnValue)
                } else {
                    handleFocus(prevRowValue, prevColumnValue)
                }
            }
        }
    }
    // 左键进行focus
    const left = (event, id) => {
        const rowValueLength = parseInt(handleNumber(id)[0])
        const columnValueLength = parseInt(handleNumber(id)[1])
        if (event.key === "ArrowLeft") {
            const prevRowValue = rowValueLength
            const prevColumnValue = columnValueLength - 1
            setNextRowValue(prevRowValue)
            setNextColumnValue(prevColumnValue)
            if (prevColumnValue >= 0) {
                handleFocus(prevRowValue, prevColumnValue)
            }
        }
    }
    // 右键进行focus
    const right = (event, id) => {
        const rowValueLength = parseInt(handleNumber(id)[0])
        const columnValueLength = parseInt(handleNumber(id)[1])
        if (event.key === "ArrowRight") {
            const prevRowValue = rowValueLength
            const prevColumnValue = columnValueLength + 1
            setNextRowValue(prevRowValue)
            setNextColumnValue(prevColumnValue)
            const length = inputList[prevRowValue].length - 1
            if (prevColumnValue <= length) {
                handleFocus(prevRowValue, prevColumnValue)
            }
        }
    }
    const deleteEvent = (event,id) => {
        if (event.key === "Delete" && event.ctrlKey){
            // const rowValueLength = parseInt(handleNumber(id)[0])
            // const columnValueLength = parseInt(handleNumber(id)[1])
            // handleBlur(rowValueLength,columnValueLength)
            const rowValueLength = parseInt(handleNumber(id)[0])
            const columnValueLength = parseInt(handleNumber(id)[1])
            console.log(inputList.length - 1)
            if (columnValueLength - 1 >= 0) {
                const updateInputList = [...inputList]
                //TODO
                updateInputList[rowValueLength].splice(columnValueLength, 1)
                setInputList(updateInputList)
                handleInitId(rowValueLength)
            }
            console.log(inputList)
        }
    }
    const backspace = (event,id) => {
        if (event.key === "Backspace"){
            const rowValueLength = parseInt(handleNumber(id)[0])
            const columnValueLength = parseInt(handleNumber(id)[1])
            if (inputList[rowValueLength][columnValueLength].input === '' && inputList[0].length - 1 !== 0){
                deleteValue(rowValueLength,columnValueLength)
                setInputList(inputList => inputList)
                console.log(inputList)
            }
        }
    }
    const handleKeyDown = (event, id) => {
        tab(event, id)
        enter(event, id)
        shift(event, id)
        up(event, id)
        down(event, id)
        left(event, id)
        right(event, id)
        deleteEvent(event, id)
        backspace(event,id)
    }
    const handleChange = (event, rowIndex, colIndex,id) => {
        const updatedInputList = [...inputList];
        updatedInputList[rowIndex][colIndex].input = event.target.value.toUpperCase();
        const regexp = /^[0-9a-fA-F]+$/.test(updatedInputList[rowIndex][colIndex].input);
        setChangeStyle(regexp)
        if (regexp === false && updatedInputList[rowIndex][colIndex].input !== ""){
            updatedInputList[rowIndex][colIndex].class = "changeInputStyle"
        }else{
            updatedInputList[rowIndex][colIndex].class = "inputStyle"
        }
        const regexpValidate = /^[0-9a-fA-F]{2}$/.test(updatedInputList[rowIndex][colIndex].input)
        setValidate(regexpValidate)
        setInputList(updatedInputList);
    };

    const handleInputChange = (event) => {
      const inputValue = event.target.value
        // 使用正则表达式验证输入是否为两位十六进制数
        const validHex = /^[0-9A-Fa-f]\$/.test(inputValue);
        console.log(validHex)
        if (!validHex) {
            // 如果输入不合法，清空输入框的值
            event.target.value = '';
        }
    }

    const generatePrompt = (id) => {
        const rowValueLength = parseInt(handleNumber(id)[0])
        const columnValueLength = parseInt(handleNumber(id)[1])
        if (changeStyle === false && inputList[rowValueLength][columnValueLength].input !== "" ){
            return "输入有误请输入十六进制数"
        }else {
            return ""
        }
    }

    return (
        <div style={{display:"flex", marginBottom:"10px"}}>
            <Card
                hoverShadow
                bordered
                style={{minWidth:"60vw",overflow:"auto"}}
            >
                {inputList.map((outsideList, index) => (
                    <div className="outsideStyle" key={index} >
                        <div className="statusBar">
                            <div className="spanBox">
                                <span>{"Row" + index}</span>
                            </div>
                            <div className="insideStyle">
                                {outsideList.map((li, liIndex) => (
                                    <div key={liIndex} >
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
                                            maxLength="2"
                                            className={ li.class }
                                            onChange={(e) => handleChange(e, index, liIndex,li.id)}
                                            onKeyDown={(e) => handleKeyDown(e, li.id)}
                                            disabled={li.disable}
                                            value={li.input}
                                            placeholder={li.tips}
                                        />
                                            {/*<span className="tips">{generatePrompt(li.id)}</span>*/}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                ))}
            </Card>
        </div>
    )
}
