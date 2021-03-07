import React, {useState} from 'react'
import TodoItem from './TodoItem'
import {Layout, Typography, Row, Col, Form, Input, Button} from 'antd'

const {Header, Content} = Layout;
const {Title,} = Typography;

const TodoFormLayout = {
    labelCol : {span: 8},
    wrapperCol : {span: 8}
}
const ButtonLayout = {
    wrapperCol : {offset: 10}
}



function TodoList() {
    const [List, setList] = useState([])

    // form finish
    const onFinish = (item) => {
        setList(List.concat([{id:List.length, title: item.title, body:item.body, checked:false, edit: false}]))
    }

    var ToggleCheck = (id) => {
        setList(List.map((item) => {
            if (item.id === id){
                item.checked = !item.checked
                // console.log(item)
            }
            return item
        }))
    }

    var ToggleEdit = (id) => {
        setList(List.map((item) => {
            if (item.id === id){
                item.edit = !item.edit
                // console.log(item)
            }
            return item
        }))
    }

    var ChangeTitle = (e, id) =>  {
        setList(List.map((item) => {
            if (item.id === id){
                item.title = e.target.value
                // console.log(item)
            }
            return item
        }))
    }

    var ChangeBody = (e, id) =>  {
        setList(List.map((item) => {
            if (item.id === id){
                item.body = e.target.value
                // console.log(item)
            }
            return item
        }))
    }

    var returnTodoComponents = () => {
        return List.map((item) => {
            return (
                <Col className="gutter-row" span={8}>
                    <TodoItem 
                        key={item.id} 
                        id={item.id} 
                        title={item.title} 
                        body={item.body} 
                        checked={item.checked} 
                        edit= {item.edit}
                        ToggleCheck={ToggleCheck}
                        ToggleEdit = {ToggleEdit}
                        ChangeTitle = {ChangeTitle}
                        ChangeBody = {ChangeBody}
                    />
                </Col>
            )
        })
    }

    return (
        <Layout className="layout">
            <Header>
                <Title type="warning">TodoList</Title>
            </Header>
            <Content className="Container">
                <div className="TodoForm">
                    <Form 
                        {...TodoFormLayout}
                        onFinish = {onFinish}
                    >
                        <h1>Add Item</h1>
                        <Form.Item
                            label="Title"
                            name="title"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Body"
                            name="body"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item {...ButtonLayout}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div>
                    <Row gutter={[16, 24]}>
                        {returnTodoComponents()}
                    </Row>
                </div>
            </Content>
        </Layout>
    );
}

export default TodoList;
