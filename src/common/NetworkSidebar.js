// @ts-nocheck
import React, { useState } from 'react';
import { Menu } from 'tdesign-react';


const { MenuGroup, MenuItem } = Menu;
export default function PointSidebar(){
    const [networkValue, setNetworkValue] = useState('1');
    const [netWorkSidebarList, setNetworkSidebarList] = useState([
        "192.168.119.20",
        "192.168.119.21",
        "192.168.119.22",
        "192.168.119.23",
        "192.168.119.24",
        "192.168.119.25",
        "192.168.119.26",
        "192.168.119.27",
        "192.168.119.28",
    ])
    return (
        <Menu
            value={networkValue}
            onChange={(value) => setNetworkValue(value)}
            theme = "system"
        >
            <MenuGroup title="网络">
                {netWorkSidebarList.map((networkList,networkListIndex) => (
                    <MenuItem value={networkList}>
                        {networkList}
                    </MenuItem>
                ))}
            </MenuGroup>
        </Menu>
    );
}
