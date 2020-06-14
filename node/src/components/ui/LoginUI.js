import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import '../../stylesheets/LoginUI.css'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

class LoginUI extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nameHasValue : false,
      passwordHasValue: false
    }
    this.submit = this.submit.bind(this)
    this.checkUser = this.checkUser.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    const {status} = nextProps
    if (status !== null && status !== undefined && status != -1 && status != 0) {
      this.props.history.replace("/")
    }
  }
  //
  // componentDidUpdate(prevProps) {
  //   const {status} = this.props
  //   if (status == 0) {
  //     const {_password} = this.refs
  //     _password.select()
  //   }
  // }

  submit(e) {
    const { _username, _password } = this.refs
    const {onUserLogin} = this.props
    e.preventDefault()
    onUserLogin(_username.value, _password.value)
  }

  checkUser() {
    const {_username} = this.refs
    if (_username.value.length > 0) {
      console.log("current user name (onblur)", _username.value)
      this.setState({nameHasValue: true})
    } else {
      this.setState({nameHasValue: false})
    }
  }

  checkPassword() {
    const {_password} = this.refs
    if (_password.value.length > 0) {
      console.log("current password (onblur)", _password.value)
      this.setState({passwordHasValue: true})
    } else {
      this.setState({passwordHasValue: false})
    }
  }

  render() {
    return (
      <div className="login-form-wrapper">
        <div className="login-form">
          <h1>Please Sign in.</h1>
          <form onSubmit={this.submit}>

            <div className="input-with-text">
              <input ref="_username" type="text" required onBlur={this.checkUser}/>
              <span className={(this.state.nameHasValue)? "hasValue": "hasNoValue"}>Username</span>
            </div>
            <div className="input-with-text">
              <input ref="_password" type="text" required onBlur={this.checkPassword}/>
              <span className={(this.state.passwordHasValue)? "hasValue": "hasNoValue"}>Password</span>
            </div>
            <Button variant="outline-primary" type="submit">Login</Button>
          </form>
          <p className="error" style= {{visibility: (this.props.status == 0)? 'visible':'hidden'}} >Wrong password or unknown user</p>
        </div>
      </div>
    )
  }
}

LoginUI.PropTypes = {
  onUserLogin: PropTypes.func
}

LoginUI.defaultProps = {
  onUserLogin: f=>f
}

export default LoginUI
