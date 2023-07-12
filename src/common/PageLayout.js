// @ts-ignore
import React from 'react';
import {Button, Radio, Space} from 'tdesign-react';
import "./css/pageLayout.css"
import {AddressTool} from "../components/AddressTool";
export default function PageLayout(){
    return(
        <div>
            <div className="Arrangement">
                <Space direction="vertical">
                    <Space direction="vertical">
                        <Radio.Group defaultValue="1">
                            <Radio value="1">1</Radio>
                            <Radio value="2">2</Radio>
                            <Radio value="3">3</Radio>
                            <Radio value="4">4</Radio>
                            <Radio value="5">5</Radio>
                            <Radio value="6">6</Radio>
                        </Radio.Group>
                    </Space>
                </Space>
            </div>
            <div className="toolStyle">
                <AddressTool></AddressTool>
            </div>
            <div className="Arrangement">
                <Button
                    shape="rectangle"
                    size="medium"
                    type="button"
                    variant="base"
                    className="send"
                >
                    发送
                </Button>
            </div>
        </div>
        );
}
