import React from 'react';
import logo from './logo.svg';
import './App.css';
import UsersList from './Components/Users.js';
import TodoList from './Components/ToDos.js';
import ProjectsList from './Components/Projects.js'
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {HashRouter, Route, Switch, BrowserRouter, Redirect} from "react-router-dom";

import 'react-bootstrap/dist/react-bootstrap.min.js';
import Menu from './Components/menu.js'
import Footer from './Components/Footer.js'
import error404 from './Components/error404.js'
//import './app.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
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
        }).catch(error => console.log(error));

        axios.get('http://localhost:8000/api/projects').
        then(response => {
            const projects = response.data

            this.setState(
            {
            'projects': projects
            })
        }).catch(error => console.log(error));

    axios.get('http://localhost:8000/api/todos').
       then(response => {
           const todos = response.data
           this.setState(
           {
           'todos': todos
           })
       }).catch(error => console.log(error));
    }

    render() {
        return (

                <div>
                    <BrowserRouter>
                        <Menu/>
                       <Switch>

                           <Route exact path='/' component={() => <UsersList users={this.state.users}/>} />
                           <Route exact path='/projects' component={() => <ProjectsList projects={this.state.projects}/>} />
                           <Route exact path='/todos' component={() => <TodoList todos={this.state.todos}/>} />

                           <Redirect from="/users" to="/"/>
                            <Route component={error404}/>
                        </Switch>
                    </BrowserRouter>
                    <Footer/>
                </div>

        )

    }
}


export default App;
