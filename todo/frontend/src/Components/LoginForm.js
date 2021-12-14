import React from 'react';
import Modal from 'react-bootstrap/Modal'
import { Redirect } from 'react-router-dom';
class LoginForm extends React.Component {



    constructor(props) {
        super(props);
        this.state = {'login': '', 'password': '',
                       show: false,
                       showModal: true
                      }
    }

   handleClose() {
        //   console.log(this.state.show)
         this.setState({show: false });
        // return <Redirect to="/"/>

   }

   handleShow() {
      this.setState({ show: true})
   }

    handleChange(event) {

        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }
//
    handleSubmit(event) {
        //console.log(this.state.login + ' ' + this.state.password);
        this.props.get_token(this.state.login, this.state.password);
        event.preventDefault();
        this.handleClose();
        //console.log(this.state.show)

    }



    render() {

        return (
      <Modal
        show={this.props.is_auth() ? false : true} //{this.state.show}
        onHide={() => this.handleClose()} // {() => this.setState({ show: false })}
        backdrop="static"
        //keyboard={false}
        //container={this}
        //animation={true}
      >

              <Modal.Header closeButton>
                     <Modal.Title>Authorization</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                       <form onSubmit={(event) => this.handleSubmit(event)}>
                         <input type="text" name="login" placeholder="login" value={this.state.login}
                            onChange={(event) => this.handleChange(event)} />
                        <input type="password" name="password" placeholder="password" value={this.state.password}
                            onChange={(event) => this.handleChange(event)} />
                        <input type="submit" value="Login"/>
                    </form>
              </Modal.Body>

            </Modal>
        );
    }
}

export default LoginForm;



