import React from 'react'

const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}


const UsersList = ({users}) => {
    return (
        <table>
            <thead>
                <th> First name</th>
                <th> Last name </th>
                <th> Email </th>
            </thead>
            <tbody>
                 {users.map((user) => <UserItem user={user} />)}
            </tbody>
        </table>
    )

}

export default UsersList;