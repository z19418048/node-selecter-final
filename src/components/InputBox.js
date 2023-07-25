import React, { useState } from 'react';

const InputBox = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            style={{
                border: '1px solid black',
                padding: '8px',
                borderRadius: '5px',
                backgroundColor: '#fff',
                color: 'black',
                // 根据输入框的值动态改变样式
                borderColor: inputValue.length >= 5 ? 'red' : 'black',
            }}
        />
    );
}

export default InputBox;