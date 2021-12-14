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
import LoginForm from "./Components/LoginForm";
import Cookies from 'universal-cookie';

import { Link } from 'react-router-dom';

import 'react-bootstrap/dist/react-bootstrap.min.js';
//import Menu from './Components/menu.js'
import Footer from './Components/Footer.js'
import error404 from './Components/error404.js';
//import './app.css';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'accessToken': '',
            'refreshToken': '',
            'currentUser': ''
        }
    }

    get_token_from_storage() {
        const cookies = new Cookies();
        let accessToken = cookies.get('accessToken');
        let refreshToken = cookies.get('refreshToken');
        let currentUser = cookies.get('currentUSer');
        this.setState({'accessToken': accessToken,
                        'refreshToken': refreshToken, 'currentUser': currentUser}, () => this.load_data());
    }

    refresh_token(token) {
        let data = {'refresh':token}

        axios.post('http://127.0.0.1:8000/api/token/refresh', data)
        .then(response => {
            this.set_accessToken(response.data['access'])

        }).catch(error=> {
        alert(error);
        this.logout();
        })
    }

    is_auth() {

        //добавить проверку срока действия токена доступа. Если токен истек (["messages"]["code"]: "token_not_valid" + статус 401)
        //перезапросить токен доступа, в случае ошибки при запросе - this.logout
        return !!this.state.accessToken

    }

    logout() {
        this.set_accessToken('');
        this.set_refreshToken('');
        this.setState({
            'users': [],
            'projects': [],
            'todos': [],
            'accessToken': '',
            'refreshToken': '',
            'currentUser': ''
        })

    }

    set_accessToken(token) {
        const cookies = new Cookies();
        cookies.set('accessToken', token);
        this.setState({'accessToken': token}, () => this.load_data());
    }

    set_refreshToken(token) {
        const cookies = new Cookies();
        cookies.set('refreshToken', token);
        this.setState({'refreshToken': token});
    }

    check_accessToken() {
        return true;
    }

    set_currentUser(username) {
        const cookies = new Cookies();
        cookies.set('currentUSer', username)
        this.setState({'currentUser': username})
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
            }
        if (this.is_auth())
            {

                headers['Authorization'] = 'Bearer ' + this.state.accessToken
            }
        return headers
    }


    get_token(username, password) {
        let data = {'username': username, 'password':password}

        axios.post('http://127.0.0.1:8000/api/token/get', data)
        .then(response => {

            this.set_accessToken(response.data['access']);
            this.set_refreshToken(response.data['refresh']);
            this.set_currentUser(username);

        }).catch(error=> {
            alert(error);
            this.logout();
            })
        }


    load_data() {
        const headers = this.get_headers()
        console.log({headers})
        axios.get('http://127.0.0.1:8000/api/users/', {headers}).
        then(response => {
            const users = response.data
            this.setState(
            {
            'users': users
            })
        }).catch(error => {
            console.log(error);
            this.setState({
                'users': []
                 })
            });


        axios.get('http://localhost:8000/api/projects/', {headers}).
        then(response => {
            const projects = response.data

            this.setState(
            {
            'projects': projects
            })
        }).catch(error => {
            console.log(error);
            this.setState({
                'projects': []
                 })
            });

    axios.get('http://localhost:8000/api/todos/', {headers}).
       then(response => {
           const todos = response.data
           this.setState(
           {
           'todos': todos
           })
       }).catch(error => {
            console.log(error);
            this.setState({
                'todos': []
                 })
            });
    }

    componentDidMount() {
        this.get_token_from_storage()
        this.load_data()
    }

    render() {



        return (

                <div>
                    <BrowserRouter>
                          <Nav className="site-header sticky-top py-3">
                              <Container className="container d-flex flex-column flex-md-row justify-content-between">

                                <Link className="py-6 d-none d-md-inline-block" to="/">Users</Link>
                                <Link className="py-6 d-none d-md-inline-block" to="/projects">Projects</Link>
                                <Link className="py-6 d-none d-md-inline-block" to="/todos">ToDo List</Link>
                                {this.state.currentUser} {this.is_auth() ? <button onClick={() => this.logout()}>Logout</button>
                                    : <Link to='/login'>Login</Link>}
                                </Container>
                        </Nav>
                       <Switch>

                           <Route exact path='/' component={() => <UsersList users={this.state.users}/>} />
                           <Route exact path='/projects' component={() => <ProjectsList projects={this.state.projects}
                                                                            users={this.state.users}/>} />
                           <Route exact path='/todos' component={() => <TodoList todos={this.state.todos}/>} />
                           <Route exact path='/login' component={() => <LoginForm
                                        get_token={(username,password) => this.get_token(username, password)}
                                        is_auth={()=> this.is_auth()}/> } />

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
