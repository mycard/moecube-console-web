import React from "react";
import {connect} from "dva";
import styles from "./AppDetail.less";
import config from "../config";
import uuid from "uuid";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Icon,
  Input,
  message,
  Modal,
  Progress,
  Radio,
  Row,
  Select,
  Spin,
  Tabs,
  Upload
} from "antd";
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const Dragger = Upload.Dragger;
const confirm = Modal.confirm

const statusMap = {
  'failed': 'error',
  'uploading': 'processing'
}

const defCategory = ["game", "runtime", "emulator", "module"]
const defLocales = ["zh-CN", "zh-TW", "en-US", "ja-JP"]
const defPlatform = ["win32", "darwin"]
let defDevelopers = {}
let defPublishers = {}
let defNews = {}


defLocales.forEach(locale => {
  defDevelopers[locale] = []
  defPublishers[locale] = []
  defNews[locale] = []
})

const defPackage = () => {
  return {
    id: uuid.v1(),
    status: 'new'
  }
}

const defPackages = {}

const formItemLayout = {
  labelCol: {span: 5},
  wrapperCol: {span: 24},
}

const uploadProps = {
  name: 'file',
  multiple: false,
  showUploadList: false,

}


class AppDetail extends React.Component {

  state = {
    previewVisible: false,
    previewImage: '',
    iconList: [],
    coverList: [],
    backgroundList: [],
    isCreateNews: false,
    developers: {},
    publishers: {},
    news: {},
    packages: [],
  };

  componentDidMount() {
    this.props.dispatch({type: 'packages/fetch', payload: {appId: this.props.params.id}})
  }

  componentWillReceiveProps(nextProps) {
    const {App: {developers, publishers, news}, packages} = nextProps
    // this.setState({
    //   developers: {...defDevelopers, ...developers},
    //   publishers: {...defPublishers, ...publishers},
    //   packages: [...defPackages, ...packages],
    //   news: {...defNews, ...news},
    // })
    if (this.state.packages.length !== packages) {
      this.setState({
        packages
      })
    }
    this.setState({
      developers: {...defDevelopers, ...developers},
      publishers: {...defPublishers, ...publishers},
      news: {...defNews, ...news},
    })
  }

  handleCancel = () => this.setState({previewVisible: false})

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChangeIco = ({file, fileList}) => {
    this.setState({iconList: fileList})
    this.handleUpdateImg({file, fileList, field: 'icon'})
  }
  handleChangeCover = ({file, fileList}) => {
    this.setState({coverList: fileList})
    this.handleUpdateImg({file, fileList, field: 'cover'})
  }
  handleChangeBackground = ({file, fileList}) => {
    this.setState({backgroundList: fileList})
    this.handleUpdateImg({file, fileList, field: 'background'})
  }

  handleUpdateImg = ({file, field, fileList}) => {
    const {form, dispatch, params: {id}} = this.props
    if (file.status === 'done') {
      const [res] = img.response
      dispatch({type: "Apps/update", payload: {id, [field]: res.Key}})
    } else if (file.status === 'error') {
      message.error(file.response.message);
    }
  }


  onSubmitBase = (e) => {
    const {form, dispatch, params: {id}} = this.props

    e && e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const {category, homepage, conference, tags, locales} = values

        dispatch({type: "Apps/update", payload: {id, category, homepage, conference, tags, locales}})
      }
    });
  }

  onSubmitIntro = (e) => {
    const {form, dispatch, params: {id}} = this.props

    e && e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const {description, name, developers, publishers, news} = values

        dispatch({type: "Apps/update", payload: {id, description, name, developers, publishers, news}})
      }
    });
  }

  onSubmitManage = (e) => {
    const {form, dispatch, params: {id}} = this.props

    e && e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const {version, actions, references, dependencies} = values

        Object.keys(actions).forEach((platform) => {
          if (actions[platform]) {
            actions[platform] = JSON.parse(actions[platform])
          }
        })

        dispatch({type: "Apps/update", payload: {id, version, actions, references, dependencies}})
      }
    });
  }

  onSubmitUpload = (e, _pack) => {
    const {form, dispatch, params: {id}} = this.props

    e && e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        let {upload: {packages}} = values


        dispatch({type: "Apps/update", payload: {id, packages}})
      }
    });
  }

  onAddPackage = (e, pack) => {
    const {form, dispatch, params: {id}} = this.props

    e && e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        //
        let {upload: {packages}} = values
        const _package = packages.find(p => p.id == pack.id)

        dispatch({type: "packages/add", payload: {appId: id, ..._package}})
      }
    });
  }

  onPatchPackage = (e, pack) => {
    const {form, dispatch, params: {id}} = this.props

    e && e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        //
        let {upload: {packages}} = values
        const _package = packages.find(p => p.id == pack.id)

        dispatch({type: "packages/patch", payload: {appId: id, ..._package}})
      }
    });
  }

  onNewPackageVersion = (e, pack) => {
    const {form, dispatch, params: {id}} = this.props

    e && e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        //
        let {upload: {packages}} = values
        const _package = packages.find(p => p.id == pack.id)

        dispatch({type: "packages/add", payload: {appId: id, ..._package}})
      }
    });
  }

  handleUrlUpload = (e, pack) => {
    const {form, dispatch, params: {id}} = this.props

    e && e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        let {upload: {packages}} = values
        const _package = packages.find(p => p.id == pack.id)

        dispatch({type: "packages/urlUpload", payload: {appId: id, ..._package}})
      }
    });
  }


  // onUpdatePackage = (e) => {
  //   const {form, dispatch, params: {id}} = this.props
  //
  //   e && e.preventDefault();
  //   form.validateFieldsAndScroll((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //
  //       // let {upload: {packages}} = values
  //       let {packages} = this.state
  //
  //
  //       dispatch({type: "Apps/updatePackage", payload: {id, packages}})
  //     }
  //   });
  // }

  onDeletePackage = (pack) => {
    const {form, dispatch, params: {id}} = this.props

    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        let {upload: {packages}} = values
        const _package = packages.find(p => p.id == pack.id)

        dispatch({type: "packages/delete", payload: {appId: id, ..._package}})
      }
    });
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = async (targetKey) => {

    let packages = this.state.packages

    packages.push(defPackage())

    await this.setState({
      packages
    })

    // this.onSubmitUpload()
    // this.onAddPackage()
  }

  remove = async (targetKey) => {
    confirm({
      title: '️警告',
      content: '你真的确定要删除嘛？',
      onOk: async () => {
        let {packages} = this.state
        let _package = packages[targetKey]

        if (_package._id) {
          this.onDeletePackage(_package)
        }

        packages.splice(targetKey, 1)

        this.setState({
          packages
        })
      },
    })
  }

  onAddField = ({locale, field, data}) => {
    let newField = Object.assign({}, this.state[field])

    newField[locale].push(data)

    this.setState({
      [field]: newField
    })
  }

  onDeleteField = ({locale, field, index}) => {
    let newField = Object.assign({}, this.state[field])

    newField[locale].splice(index, 1)

    this.setState({
      [field]: newField
    })
  }

  render() {
    const {form, App, loading, dispatch} = this.props
    const {getFieldDecorator} = form
    const {id, author, homepage, references = {}, dependencies = {}, description = {}, actions = {}, version = {}, name = {}, category, tags = [], locales = [], conference, icon, cover, background,} = App
    const {publishers, developers, previewVisible, previewImage, iconList, coverList, backgroundList, isCreateNews, news, packages} = this.state

    return (
      <Spin spinning={loading.global}>
        <Tabs defaultActiveKey="1" className="app-detail-nav">
          <TabPane tab={<span><Icon type="setting"/> 基本信息 </span>} key="1">
            <div className={styles.form}>
              <Form onSubmit={this.onSubmitBase}>

                <div style={{display: 'flex'}}>

                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                  </Modal>

                  <FormItem {...formItemLayout}>
                    {getFieldDecorator('icon', {})(
                      <div className="clearfix">
                        <Upload
                          multiple={false}
                          action={`${config.apiRoot}/v1/upload/image`}
                          listType="picture-card"
                          className="upload-icon"
                          fileList={iconList}
                          onChange={this.handleChangeIco}
                          onPreview={this.handlePreview}
                        >
                          {iconList.length >= 1 ? null :
                            icon ?
                              <img src={icon} width="100%" height="100%"/>
                              :
                              <div>
                                <Icon type="plus"/>
                                <div className="ant-upload-text">Cover</div>
                              </div>
                          }
                        </Upload>
                      </div>
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout}>
                    {getFieldDecorator('cover', {})(
                      <div className="clearfix">
                        <Upload
                          multiple={false}
                          action={`${config.apiRoot}/v1/upload/image`}
                          listType="picture-card"
                          className="upload-icon"
                          fileList={coverList}
                          onChange={this.handleChangeCover}
                          onPreview={this.handlePreview}
                        >
                          {coverList.length >= 1 ? null :
                            cover ?
                              <img src={cover} width="100%" height="100%"/>
                              :
                              <div>
                                <Icon type="plus"/>
                                <div className="ant-upload-text">Cover</div>
                              </div>
                          }
                        </Upload>
                      </div>
                    )}
                  </FormItem>

                  <FormItem {...formItemLayout}>
                    {getFieldDecorator('background', {})(
                      <div className="clearfix">
                        <Upload
                          multiple={false}
                          action={`${config.apiRoot}/v1/upload/image`}
                          listType="picture-card"
                          className="upload-icon"
                          fileList={backgroundList}
                          onChange={this.handleChangeBackground}
                          onPreview={this.handlePreview}
                        >
                          {backgroundList.length >= 1 ? null :
                            background ?
                              <img src={background} width="100%" height="100%"/>
                              :
                              <div>
                                <Icon type="plus"/>
                                <div className="ant-upload-text">Cover</div>
                              </div>
                          }
                        </Upload>
                      </div>
                    )}
                  </FormItem>
                </div>

                <FormItem {...formItemLayout} label="游戏类别">
                  {getFieldDecorator('category', {
                    initialValue: category
                  })(
                    <RadioGroup>
                      {defCategory.map((c, i) => {
                        return <RadioButton value={c} key={i}>{c}</RadioButton>
                      })}
                    </RadioGroup>
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}>
                  {getFieldDecorator('homepage', {
                    initialValue: homepage,
                    rules: [{
                      type: 'url', message: '以 http:// 或 https:// 开头，没有可留空',
                    }]
                  })(
                    <Input addonBefore={<Icon type="home"/>} placeholder="网站"/>
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  help="游戏类应用通常与 ID 相同，其他类型的应用留空">
                  {getFieldDecorator('conference', {
                    initialValue: conference
                  })(
                    <Input addonBefore={<Icon type="message"/>} placeholder="聊天室"/>
                  )}
                </FormItem>

                <FormItem
                  {...formItemLayout}>
                  {getFieldDecorator('tags', {
                    initialValue: tags
                  })(
                    <Select mode="tags" style={{width: '100%'}} placeholder="标签">
                    </Select>
                  )}
                </FormItem>

                <FormItem {...formItemLayout}>
                  {getFieldDecorator('locales', {
                    initialValue: locales
                  })(
                    <Select
                      mode="tags"
                      style={{width: '100%'}}
                      placeholder="游戏支持的语言">
                      {defLocales.map((locale, i) => {
                        return <Select.Option key={i} value={locale}>{locale}</Select.Option>
                      })}
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


          <TabPane tab={<span><Icon type="solution"/>应用介绍</span>} key="2">
            <div className={styles.form}>
              <Tabs type="card" className="app-detail-nav">

                {defLocales.map((locale, i) => {

                  return (
                    <TabPane tab={locale} key={i}>
                      <Form onSubmit={this.onSubmitIntro}>
                        <FormItem {...formItemLayout}>
                          {getFieldDecorator(`name[${locale}]`, {
                            initialValue: name[locale]
                          })(
                            <Input addonBefore={<Icon type="edit"/>} placeholder="应用名称"/>
                          )}
                        </FormItem>

                        <FormItem {...formItemLayout} >
                          {getFieldDecorator(`description[${locale}]`, {
                            initialValue: description[locale]
                          })(
                            <Input type="textarea" placeholder="应用介绍" autosize={{minRows: 2}}/>
                          )}
                        </FormItem>

                        <Card title="开发者" extra={<a onClick={ () => this.onAddField({
                          locale,
                          field: 'developers',
                          data: {url: '', name: ''}
                        })}>Add </a>}>
                          {developers[locale] && developers[locale].length > 0 && developers[locale].map((developer, index) => {
                            return (
                              <Form key={index}>
                                <FormItem {...formItemLayout}>
                                  <Row gutter={24}>
                                    <Col span={10}>
                                      {getFieldDecorator(`developers[${locale}][${index}]["name"]`, {
                                        initialValue: developer["name"]
                                      })(
                                        <Input addonBefore={<Icon type="user"/>} placeholder="name"/>
                                      )}
                                    </Col>
                                    <Col span={10}>
                                      {getFieldDecorator(`developers[${locale}][${index}]["url"]`, {
                                        initialValue: developer["url"]
                                      })(
                                        <Input addonBefore={<Icon type="link"/>} placeholder="url"/>
                                      )}
                                    </Col>

                                    <Col span={4}>
                                      <a onClick={() => this.onDeleteField({
                                        locale,
                                        index,
                                        field: 'developers'
                                      })}>Delete</a>
                                    </Col>
                                  </Row>
                                </FormItem>
                              </Form>
                            )
                          })}
                        </Card>


                        <Card title="发行者" extra={<a onClick={ () => this.onAddField({
                          locale,
                          field: 'publishers',
                          data: {url: '', name: ''}
                        })}>Add </a>}>
                          {publishers[locale] && publishers[locale].length > 0 && publishers[locale].map((publisher, index) => {

                            return (
                              <Form key={index}>
                                <FormItem {...formItemLayout}>
                                  <Row gutter={24}>
                                    <Col span={10}>
                                      {getFieldDecorator(`publishers[${locale}][${index}]["name"]`, {
                                        initialValue: publisher["name"]
                                      })(
                                        <Input addonBefore={<Icon type="user"/>} placeholder="name"/>
                                      )}
                                    </Col>
                                    <Col span={10}>
                                      {getFieldDecorator(`publishers[${locale}][${index}]["url"]`, {
                                        initialValue: publisher["url"]
                                      })(
                                        <Input addonBefore={<Icon type="link"/>} placeholder="url"/>
                                      )}
                                    </Col>

                                    <Col span={4}>
                                      <a onClick={() => this.onDeleteField({
                                        locale,
                                        index,
                                        field: 'publishers'
                                      })}>Delete</a>
                                    </Col>
                                  </Row>
                                </FormItem>
                              </Form>
                            )
                          })}
                        </Card>

                        <Card title="新闻" extra={<a onClick={ () => this.onAddField({
                          locale,
                          field: 'news',
                          data: {url: '', title: '', text: ""}
                        })}>Add </a>}>
                          {news[locale] && news[locale].length > 0 && news[locale].map((item, index) => {

                            return (
                              <Form key={index}>
                                <FormItem {...formItemLayout} >
                                  {getFieldDecorator(`news[${locale}][${index}]["url"]`, {
                                    initialValue: item["url"]
                                  })(
                                    <Input prefix={<Icon type="link"/>} placeholder="url"/>
                                  )}
                                  {getFieldDecorator(`news[${locale}][${index}]["title"]`, {
                                    initialValue: item["title"]
                                  })(
                                    <Input prefix={<Icon type="edit"/>} placeholder="title"/>
                                  )}

                                  {getFieldDecorator(`news[${locale}][${index}]["text"]`, {
                                    initialValue: item["text"]
                                  })(
                                    <Input type="textarea" prefix={<Icon type="edit"/>} placeholder="text"/>
                                  )}
                                  <a onClick={() => this.onDeleteField({locale, index, field: 'news'})}>Delete</a>
                                </FormItem>
                              </Form>
                            )
                          })}
                        </Card>

                        <FormItem {...formItemLayout} >
                          <div className={styles.wrapSubmit}>
                            <Button type="primary" htmlType="submit" size="large">提交</Button>
                          </div>
                        </FormItem>

                      </Form>
                    </TabPane>
                  )
                })}

              </Tabs>
            </div>
          </TabPane>


          <TabPane tab={<span><Icon type="save"/>应用管理</span>} key="3">
            <div className={styles.form}>
              <Tabs type="card" className="app-detail-nav">
                {defPlatform.map((platform, i) =>
                  <TabPane tab={platform} key={i}>
                    <Form onSubmit={this.onSubmitManage}>

                      <FormItem {...formItemLayout} help="version">
                        {getFieldDecorator(`version[${platform}]`, {
                          initialValue: version[platform]
                        })(
                          <Input addonBefore={<Icon type="info-circle-o"/>} placeholder="版本号"/>
                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} help="actions">
                        {getFieldDecorator(`actions[${platform}]`, {
                          initialValue: actions[platform] && JSON.stringify(actions[platform], null, '\t')
                        })(
                          <Input type="textarea" addonBefore={<Icon type="info-circle-o"/>} placeholder="actions"
                                 autosize/>
                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} help="dependencies">
                        {getFieldDecorator(`dependencies[${platform}]`, {
                          initialValue: dependencies[platform]
                        })(
                          <Select mode="tags" style={{width: '100%'}} placeholder="dependencies">
                          </Select>
                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} help="references">
                        {getFieldDecorator(`references[${platform}]`, {
                          initialValue: references[platform]
                        })(
                          <Select mode="tags" style={{width: '100%'}} placeholder="references">
                          </Select>
                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} >
                        <div className={styles.wrapSubmit}>
                          <Button type="primary" htmlType="submit" size="large">提交</Button>
                        </div>
                      </FormItem>
                    </Form>
                  </TabPane>
                )}
              </Tabs>
            </div>
          </TabPane>


          <TabPane tab={<span><Icon type="save"/>应用上传</span>} key="4">
            <div className={styles.form}>
              <Tabs type="editable-card" className="app-detail-nav" onEdit={this.onEdit}>

                {packages && packages.map((pack, i) => {
                  if (pack) {
                    return (
                      <TabPane tab={pack.name || "New"} key={i} closable={packages.length > 1}>
                        <Form >

                          <FormItem {...formItemLayout} help="id">
                            {getFieldDecorator(`upload["packages"][${i}]["id"]`, {
                              initialValue: pack["id"]
                            })(
                              <Input addonBefore={<Icon type="info-circle-o"/>} placeholder="id" disabled/>
                            )}
                          </FormItem>

                          <FormItem {...formItemLayout} help="id" style={{display: "none"}}>
                            {getFieldDecorator(`upload["packages"][${i}]["status"]`, {
                              initialValue: pack["status"]
                            })(
                              <Input addonBefore={<Icon type="info-circle-o"/>} placeholder="status" disabled/>
                            )}
                          </FormItem>

                          <FormItem {...formItemLayout} help="status" style={{display: "none"}}>
                            {getFieldDecorator(`upload["packages"][${i}]["_id"]`, {
                              initialValue: pack["_id"]
                            })(
                              <Input addonBefore={<Icon type="info-circle-o"/>} placeholder="_id" disabled/>
                            )}
                          </FormItem>

                          <FormItem {...formItemLayout} help="name">
                            {getFieldDecorator(`upload["packages"][${i}]["name"]`, {
                              initialValue: pack["name"]
                            })(
                              <Input addonBefore={<Icon type="info-circle-o"/>} placeholder="name"/>
                            )}
                          </FormItem>

                          <FormItem {...formItemLayout} help="version">
                            {getFieldDecorator(`upload["packages"][${i}]["version"]`, {
                              initialValue: pack["version"]
                            })(
                              <Input addonBefore={<Icon type="info-circle-o"/>} placeholder="版本号"
                                     disabled={pack.status !== 'new' && pack.status !== 'init' && pack.status !== 'failed'}/>
                            )}
                          </FormItem>

                          <FormItem {...formItemLayout} help="platforms">
                            {getFieldDecorator(`upload["packages"][${i}]["platforms"]`, {
                              initialValue: pack["platforms"]
                            })(
                              <Select mode="multiple" style={{width: '100%'}} placeholder="platforms">
                                {defPlatform.map((_platform, i) => {
                                  return <Select.Option key={i} value={_platform}>{_platform}</Select.Option>
                                })}
                              </Select>
                            )}
                          </FormItem>

                          <FormItem {...formItemLayout} help="locales">
                            {getFieldDecorator(`upload["packages"][${i}]["locales"]`, {
                              initialValue: pack["locales"]
                            })(
                              <Select mode="multiple" style={{width: '100%'}} placeholder="locales">
                                {defLocales.map((_locales, i) => {
                                  return <Select.Option key={i} value={_locales}>{_locales}</Select.Option>
                                })}
                              </Select>
                            )}
                          </FormItem>

                          <FormItem {...formItemLayout} >
                            <div className={styles.wrapSubmit}>
                              {
                                pack.status == 'uploaded' &&
                                <Button type="primary" onClick={(e) => this.onNewPackageVersion(e, pack)} size="large">发布新版本</Button>
                              }
                              {
                                pack.status == 'uploading' &&
                                <Button type="primary" size="large" disabled>处理中...</Button>
                              }
                              {
                                pack.status == 'init' &&
                                <Button type="primary" onClick={(e) => this.onPatchPackage(e, pack)}
                                        size="large">保存</Button>
                              }
                              {
                                pack.status == 'new' &&
                                <Button type="primary" onClick={(e) => this.onAddPackage(e, pack)}
                                        size="large">提交</Button>
                              }
                            </div>
                          </FormItem>

                          {
                            pack.status == 'uploaded' &&
                            <Card title="详细信息">
                              <p>_id: {pack._id}</p>
                              <p>id: {pack.id}</p>
                              <p>name: {pack.name}</p>
                              <p>version: {pack.version}</p>
                              <p>locales: {pack.locales.map((locale, i) => {
                                return <span key={i} style={{padding: "0 2px"}}>{locale}</span>
                              })}</p>
                              <p>platforms: {pack.platforms.map((platform, i) => {
                                return <span key={i} style={{padding: "0 2px"}}>{platform}</span>
                              })}</p>
                              <p>files: {pack.files.length}</p>
                              {
                                pack.status == 'uploaded' && this.checkUploading && clearInterval(this.checkUploading)
                              }
                            </Card>
                          }

                          {pack.status !== 'uploaded' && <FormItem {...formItemLayout}>
                            {getFieldDecorator(`upload["packages"][${i}]["upload"]`, {})(
                              <Tabs defaultActiveKey="1" size="small">
                                <TabPane tab="url上传" key="1">
                                  {getFieldDecorator(`upload["packages"][${i}]["url"]`, {
                                    // initialValue: pack["url"]
                                  })(
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                      {
                                        pack.status == 'failed' && <Alert message="上传失败，请重试" type="warning" showIcon/>
                                      }
                                      <Input
                                        addonBefore={<Icon type="upload"/>}
                                        placeholder="请确认输入的链接真实有效~"
                                        disabled={pack.status !== 'init' && pack.status !== 'failed'}/>

                                      <Button
                                        type="primary"
                                        onClick={(e) => this.handleUrlUpload(e, pack)}
                                        loading={loading.global}
                                        size="small" style={{margin: "1vh 0"}}
                                        disabled={pack.status !== 'init' && pack.status !== 'failed'}
                                      >上传</Button>
                                    </div>
                                  )}
                                </TabPane>
                                <TabPane tab="直接上传" key="2">
                                  {
                                    pack.status == 'failed' && <Alert message="上传失败，请重试" type="warning" showIcon/>
                                  }
                                  {
                                    this.props.isUpload &&
                                    <Progress percent={this.props.percent} status={this.props.status}/>
                                  }
                                  <Dragger
                                    {...uploadProps}
                                    onChange={(info) => {
                                      const status = info.file.status;

                                      if (status == 'uploading') {
                                        dispatch({
                                          type: 'Common/upload',
                                          payload: {percent: info.file.percent, uploadStatus: 'active', isUpload: true}
                                        })
                                      }
                                      if (status === 'done') {
                                        message.info('上传成功, 打包中...', 3)
                                        dispatch({type: 'packages/fetch', payload: {appId: this.props.params.id}})
                                        dispatch({
                                          type: 'Common/upload',
                                          payload: {percent: 0, uploadStatus: '', isUpload: false}
                                        })

                                      } else if (status === 'error') {
                                        dispatch({
                                          type: 'Common/upload',
                                          payload: {
                                            percent: info.file.percent,
                                            uploadStatus: 'exception',
                                            isUpload: true
                                          }
                                        })
                                        message.error(info.file.response.message);
                                      }
                                    }}
                                    disabled={ pack.status !== 'init' && pack.status !== 'failed'}
                                    action={`${config.apiRoot}/v1/upload/package/${pack["_id"]}`}
                                  >

                                    <p className="ant-upload-drag-icon">
                                      <Icon type="inbox"/>
                                    </p>

                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                  </Dragger>
                                </TabPane>
                              </Tabs>
                            )}
                          </FormItem>}
                        </Form>
                      </TabPane>
                    )
                  } else {
                    return (
                      <TabPane tab={"!"} key={i} closable={true}>
                        <div>好像出了什么问题， 请联系xxxxxx</div>
                      </TabPane>
                    )
                  }
                })}
              </Tabs>
            </div>
          </TabPane>
        </Tabs>
      </Spin>
    );
  }
}

function mapStateToProps(state, props) {
  const {params: {id}} = props
  const {
    Apps: {apps},
    packages: {packages},
    Common: {isUpload, percent, uploadStatus},
    loading
  } = state

  const App = apps[id] || {}
  const _packages = packages[id] || []


  return {
    loading,
    isUpload,
    percent,
    uploadStatus,
    packages: _packages,
    App
  };
}

const WrapperAppDetail = Form.create()(AppDetail)

export default connect(mapStateToProps)(WrapperAppDetail);
