import React from 'react';
import styles from './Create.css';
import { Button, Modal, Form, Input, Radio, Select, Spin } from 'antd';
const FormItem = Form.Item;


class Create extends React.Component {

  handleSubmit = (e) => {
    const {onSubmit} = this.props

    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        onSubmit(values)
        this.props.form.resetFields()
      }
    });
  }

  handleSelectChange = (value) => {
    
  }

  render() {
    const { visible, onCancel, form, isLoading } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        title="创建一个新的应用"
        okText="提交"
        onCancel={onCancel}
        onOk={this.handleSubmit}>
        <Spin spinning={isLoading} delay={100} tip="提交中...">

          <Form vertical onSubmit={this.handleSubmit}>
            <FormItem label="应用 ID (创建应用后无法修改)">
              {getFieldDecorator('id', {
                rules: [{ required: true, message: '请输入应用ID' }],
              })(
                <Input />
              )}
            </FormItem>

            <FormItem label="应用昵称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入应用昵称' }],
              })(
                <Input />
              )}
            </FormItem>

            <FormItem
              label="主要语言"
              wrapperCol={{ span: 8 }}>
              
              {getFieldDecorator('locale', {
                rules: [{ required: true, message: '请至少选择一门主要语言' }],
                onChange: this.handleSelectChange,
              })(
                <Select>
                  <Select.Option value="zh-CN">zh-CN</Select.Option>
                  <Select.Option value="zh-TW">zh-TW</Select.Option>
                  <Select.Option value="en-US">en-US</Select.Option>
                  <Select.Option value="ja-JP">ja-JP</Select.Option>                
                </Select>
              )}
            </FormItem>

          </Form>
        </Spin>          
      </Modal>
    );
  }
}

const WrappedCreate = Form.create()(Create)

export default WrappedCreate;
