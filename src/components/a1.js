import React, { useState } from 'react';

const MyComponent = () => {
    const [inputValue, setInputValue] = useState([[''], ['']]);

    const handleInputChange = (rowIndex, colIndex, value) => {
        const updatedInputValue = [...inputValue];
        updatedInputValue[rowIndex][colIndex] = value;
        setInputValue(updatedInputValue);
    };

    const clearInputValue = () => {
        const updatedInputValue = inputValue.map(row => row.map(() => ''));
        setInputValue(updatedInputValue);
    };

    return (
        <div>
            <button onClick={clearInputValue}>Clear Values</button>
            {inputValue.map((row, rowIndex) => (
                <div key={`row-\${rowIndex}`}>
                    {row.map((col, colIndex) => (
                        <input
                            key={`col-\${colIndex}`}
                            type="text"
                            value={col}
                            onChange={(event) =>
                                handleInputChange(rowIndex, colIndex, event.target.value)
                            }
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MyComponent;