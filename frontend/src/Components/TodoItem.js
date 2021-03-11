import React from 'react'
import {Card, Checkbox, Input} from 'antd'
import {EditTwoTone,} from '@ant-design/icons'

const StrikeOut = {
    textDecoration: 'line-through',
}

function TodoItem(props) {
    const handleEdit = (e) => {
        props.ToggleEdit(props.id)
    }
    return (
        <Card 
            title={props.edit ? <Input onChange={(e) => props.ChangeTitle(e, props.id)} value={props.title}/> : props.title}
            hoverable
            style={props.checked ? StrikeOut : {}}
            actions = {[
                <EditTwoTone twoToneColor={props.edit ? "#32a52e" : "#bc163a"} name="edit" onClick={handleEdit}/>,
                <Checkbox checked={props.checked} onChange={(e) => props.ToggleCheck(props.id)}>Done?</Checkbox>
            ]}
        >
        <p>{props.edit ? <Input onChange={(e) => props.ChangeBody(e, props.id)} value={props.body}/> : props.body}</p>
        </Card>
    );
}

export default TodoItem;
