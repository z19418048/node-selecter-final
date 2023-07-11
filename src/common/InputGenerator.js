import React, { useState } from 'react';

const InputGenerator = () => {
    // 管理输入框的状态
    const [inputList, setInputList] = useState([]);

    // 添加输入框
    const addInput = () => {
        const newInput = {
            id: Date.now(),
            value: ""
        };

        setInputList(prevList => [...prevList, newInput]);
    };

    // 处理输入框的值变化
    const handleChange = (event, id) => {
        const { value } = event.target;
        setInputList(prevList =>
            prevList.map(input => {
                if (input.id === id) {
                    return { ...input, value: value };
                }
                return input;
            })
        );
    };

    return (
        <div>
            {/* 显示输入框列表 */}
            {inputList.map(input => (
                <input
                    key={input.id}
                    value={input.value}
                    onChange={(event) => handleChange(event, input.id)}
                />
            ))}

            {/* 添加按钮 */}
            <button onClick={addInput}>添加输入框</button>
        </div>
    );
};

export default InputGenerator;