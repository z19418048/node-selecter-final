import React, { useState } from "react";

const ArrayComponent = () => {
    const [arrayData, setArrayData] = useState([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]);

    const updateArrayData = () => {
        // 示例：将数组中的第一个元素修改为[9, 8, 7]
        const updatedArray = [...arrayData];
        updatedArray[0] = [9, 8, 7];
        setArrayData(updatedArray);
    };

    return (
        <div>
            {arrayData.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((value, index) => (
                        <span key={index}>{value} </span>
                    ))}
                </div>
            ))}
            <button onClick={updateArrayData}>更新数组</button>
        </div>
    );
};

export default ArrayComponent;