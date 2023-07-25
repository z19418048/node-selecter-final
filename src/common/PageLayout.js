// @ts-ignore
import React, {useState} from 'react';
import { Button, Radio, Space} from 'tdesign-react';
import "./css/pageLayout.css"
import {HexInput} from "../components/HexInput";
import InputBox from "../components/InputBox";
export default function PageLayout(){
    const data = ["01","02","AA"]

    const slices = [
        {
            index:0,
            Label:"Row0"
        },
        {
            index:1,
            Label:"Row1"
        },
        {
            index:2,
            Label:"Row2"
        },
        {
            index:3,
            Label:"Row3"
        },
    ]
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
                            <Radio value="8">8</Radio>
                            <Radio value="9">9</Radio>
                            <Radio value="10">10</Radio>
                            <Radio value="11">11</Radio>
                            <Radio value="31">31</Radio>

                        </Radio.Group>
                    </Space>
                </Space>
            </div>
            <div className="toolStyle" style={{ padding: '16px', backgroundColor: 'var(--td-bg-color-container-hover)' }}>
                {/*{slices.map((slice,sliceIndex) => (*/}
                {/*    <HexInput data={data} slices={slice.Label} key={sliceIndex}></HexInput>*/}
                {/*))}*/}
                <HexInput data={data} slices={slices}>
                </HexInput>
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
