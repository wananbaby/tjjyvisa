import React from "react";
import { Form, Input, Button, InputNumber, Row } from "antd";
import "antd/dist/antd.css";
import ReactDOM from "react-dom";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Phone = () => {
    const onFinish = values => {
        console.log("Success:", values);
    };

    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="订阅城市"
                name="city"
                rules={[
                    {
                        required: true,
                        message: "Please input your city!",
                    },
                ]}
            >
                <Input placeholder="北京,上海" style={{ width: 300 }} />
            </Form.Item>

            <Form.Item
                label="Phone"
                name="Phone"
                rules={[
                    {
                        required: true,
                        message: "Please input your Phone!",
                    },
                    {
                        pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                        message: "请输入正确的手机号",
                    },
                ]}
            >
                <InputNumber defaultValue={11111111111} style={{ width: 300 }} />
            </Form.Item>
            {/*
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item> */}
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

// ReactDOM.render(<Demo />, document.getElementById("root"));
export default Phone;
