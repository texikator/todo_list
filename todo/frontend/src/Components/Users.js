import React from 'react'

const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.firstName}
            </td>
            <td>
                {user.lastName}
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
                <tr>
                    <th> First name</th>
                    <th> Last name </th>
                    <th> Email </th>
                </tr>
            </thead>
            <tbody>
                 {users.map((user) => <UserItem user={user} />)}
            </tbody>
        </table>
    )

}

export default UsersList;