import React from 'react';
import logo from './logo.svg';
import './App.css';
import UsersList from './Components/Users.js';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

//import 'react-bootstrap/dist/react-bootstrap.min.js';
import Menu from './Components/menu.js'
import Footer from './Components/Footer.js'
//import './app.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/users').
        then(response => {
            const users = response.data
            this.setState(
            {
            'users': users
            })
        }).catch(error => console.log(error))

    }


    render() {
        return (
                <>
                <Menu/>

                    <div>
                        <UsersList users={this.state.users} />
                    </div>

                <Footer/>
           </>
        )

    }
}


export default App;
