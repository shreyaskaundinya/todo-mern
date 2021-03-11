import React, {useState, useEffect} from 'react'
import TodoItem from './TodoItem'
import {Layout, Typography, Row, Col, Form, Input, Button, Space} from 'antd'
import axios from 'axios'
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
    
    const getAllTodos = async (e) => {
        await axios.get('http://localhost:4000/Todos/')
        .then((res) => {
            setList(res.data.allTodos)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect (() => {
        console.log("useEffect")
    })

    // form finish
    const onAdd = async (item) => {
        const newTodo = {title: item.title, body:item.body, checked:false}
        // add new todo item
        const response = await axios.put('http://localhost:4000/Todos/', {newTodo:newTodo})
        setList(List.concat([response.data.newTodo]))
    }

    var ToggleCheck = async (id) => {
        setList(List.map((item) => {
            if (item._id === id){
                item.checked = !item.checked
                // console.log(item)
            }
            return item
        }))

        // updating in the server
        const todoItem = List.filter((item) => (item._id === id))[0]

        await axios.post('http://localhost:4000/Todos/', {todoItem:todoItem})
        .then((res) => {
            console.log(res.status)
        }).catch((error) => {
            console.log(error)
        })

        
    }

    var ToggleEdit = async (id) => {
        // get the todo item
        const todoItem = List.filter((item) => (item._id === id))[0]

        // if edit is set to true then, the edit is done and is ready to update
        if (todoItem.edit === true){
            // update the todo item
            await axios.post('http://localhost:4000/Todos/', {todoItem:todoItem})
            .then((res) => {
                console.log(res.status)
            }).catch((error) => {
                console.log(error)
            })
        }
        setList(List.map((item) => {
            if (item._id === id){
                item.edit = !item.edit
                // console.log(item)
            }
            return item
        }))
    }

    var ChangeTitle = (e, id) =>  {
        setList(List.map((item) => {
            if (item._id === id){
                item.title = e.target.value
                // console.log(item)
            }
            return item
        }))
    }

    var ChangeBody = (e, id) =>  {
        setList(List.map((item) => {
            if (item._id === id){
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
                        key={item._id} 
                        id={item._id} 
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
                        onFinish = {onAdd}
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
                            <Space>
                                <Button type="primary" htmlType="submit">
                                    Add
                                </Button>
                                
                                <Button type="primary" onClick={getAllTodos}>
                                    Get All Todos
                                </Button>
                            </Space>
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
