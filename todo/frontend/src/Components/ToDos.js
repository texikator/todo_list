import React from 'react'

const ToDoItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.todoName}
            </td>
            <td>
                {todo.todoDescription}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.user}
            </td>
            <td>
                {todo.isDone ? ("Yes") : ("No")}
            </td>
            <td>
                {todo.isDeleted ? ("Yes") : ("No")}
            </td>

            <td>
                {todo.createDate}
            </td>
            <td>
                {todo.completeDate}
            </td>

        </tr>
    )
}


const TodoList = ({todos}) => {
    return (
        <table>
            <thead>
                <th> Todo</th>
                <th> ToDo Description </th>
                <th> Project</th>
                <th> User </th>
                <th> Is Done </th>
                <th> is Delete  </th>
                <th> Create Date</th>
                <th> Complete Date </th>

            </thead>
            <tbody>
                 {todos.map((todo) => <ToDoItem todo={todo} />)}
            </tbody>
        </table>
    )

}

export default TodoList;