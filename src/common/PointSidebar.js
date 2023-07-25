// @ts-nocheck
import React, { useState } from 'react';
import { Menu } from 'tdesign-react';


const { MenuGroup, MenuItem } = Menu;
export default function PointSidebar(){
    const [pointValue, setPointValue] = useState('1');
    const [pointListApi, setPointListApi] = useState([
        1,2,3,4,5,6
    ])
    return (
        <Menu
            value={pointValue}
            onChange={(value) => setPointValue(value)}
            theme = "system"
        >
            <MenuGroup title="节点">
            {pointListApi.map((pointList,pointListIndex) => (
                <MenuItem value={pointList}>
                    {pointList}
                </MenuItem>
        ))}
            </MenuGroup>
        </Menu>
    );
}
