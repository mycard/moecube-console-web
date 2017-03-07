import React from 'react';
import { connect } from 'dva';
import styles from './AppDetail.less';
import { Form, Input, Icon, Radio, Tag, Tooltip, Button, Select, Tabs } from 'antd'
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

function AppDetail({ form }) {

  const { getFieldDecorator } = form

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 24 },
  }
  
  return (
      <Tabs defaultActiveKey="1" className="app-detail-nav">
        <TabPane tab={<span><Icon type="setting" /> 基本信息 </span>} key="1">
          <div className={styles.form}>
          <Form>
            <FormItem {...formItemLayout} label="游戏类别">
              {getFieldDecorator('category')(
                <RadioGroup>
                  <RadioButton value="game">game</RadioButton>
                  <RadioButton value="runtime">runtime</RadioButton>
                  <RadioButton value="emulator">emulator</RadioButton>
                  <RadioButton value="module">module</RadioButton>
                </RadioGroup>
              )}
            </FormItem>

            <FormItem {...formItemLayout}>
              {getFieldDecorator('author', {
              })(
                <Input addonBefore={<Icon type="user" />} placeholder="开发者" />
              )}
            </FormItem>

            <FormItem 
              {...formItemLayout}
              help="以 http:// 或 https:// 开头，没有可留空">
              {getFieldDecorator('homepage', {        
              })(
                <Input addonBefore={<Icon type="home" />} placeholder="网站" />
              )}
            </FormItem>

            <FormItem 
              {...formItemLayout}
              help="游戏类应用通常与 ID 相同，其他类型的应用留空">
              {getFieldDecorator('conference', {
              })(
                <Input addonBefore={<Icon type="message" />} placeholder="聊天室" />
              )}
            </FormItem>

            <FormItem 
              {...formItemLayout} 
              help="JSON string[]，不会写请联系 zh99998@gmail.com"
              >
              {getFieldDecorator('tags', {
              })(
                <Select tags style={{ width: '100%' }} placeholder="标签">
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout}>
              {getFieldDecorator('locales', {
              })(
                <Select
                  multiple
                  style={{ width: '100%' }}
                  placeholder="游戏支持的语言"
                  defaultValue={['a10', 'c12']}>
                  <Select.Option value="zh-CN">zh-CN</Select.Option>
                  <Select.Option value="zh-TW">zh-TW</Select.Option>
                  <Select.Option value="en-US">en-US</Select.Option>
                  <Select.Option value="ja-JP">ja-JP</Select.Option>    
                </Select>
              )}
            </FormItem>

            <FormItem {...formItemLayout} >
              <div className={styles.wrapSubmit}>
                <Button type="primary" htmlType="submit" size="large">提交</Button>                  
              </div>
            </FormItem>
            
          </Form>
          </div>
        </TabPane>


        <TabPane tab={<span><Icon type="solution" />应用介绍</span>} key="2">
          <div className={styles.form}>
          <Tabs type="card" className="app-detail-nav">
            <TabPane tab="zh-CN" key="1">
              <Form>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator('locale', {
                  })(
                    <Input addonBefore={<Icon type="info" />} placeholder="应用名称" />
                  )}
                </FormItem>

                <FormItem {...formItemLayout}>
                  {getFieldDecorator('description', {
                  })(
                    <Input type="textarea" placeholder="应用介绍" autosize={{ minRows: 2}}/>
                  )}
                </FormItem>

                <FormItem {...formItemLayout}>
                  {getFieldDecorator('news', {
                  })(
                    <Input type="textarea" placeholder="新闻" autosize={{ minRows: 2}} />
                  )}
                </FormItem>

                <FormItem {...formItemLayout} >
                  <div className={styles.wrapSubmit}>
                    <Button type="primary" htmlType="submit" size="large">提交</Button>                  
                  </div>
                </FormItem>

              </Form>
            </TabPane>
            
            <TabPane tab="zh-TW" key="2">
              <Form>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator('locale', {
                  })(
                    <Input addonBefore={<Icon type="info" />} placeholder="应用名称" />
                  )}
                </FormItem>
              </Form>
            </TabPane>
            
          </Tabs>
          </div>
        </TabPane>


        <TabPane tab={<span><Icon type="save" />应用管理</span>} key="3">
          Tab 2
        </TabPane>
      </Tabs>
  );
}

function mapStateToProps() {
  return {};
}

const WrapperAppDetail = Form.create()(AppDetail)

export default connect(mapStateToProps)(WrapperAppDetail);
