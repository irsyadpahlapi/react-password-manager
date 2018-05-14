import React, { Component } from 'react'
import PasswordChecker from './PasswordChecker';
import { connect } from 'react-redux'

class EditForm extends Component{
  constructor() {
    super();
    this.state = {
      buttonupdate: true,
      url: '',
      passwordValue: '',
      dataupdate:[]
    }
  }
  componentDidMount() {
    console.log();
    this.props.data.data.map( datas => {
      if (datas.key === this.props.match.params.id){
        this.setState({
          url:datas.email,
          passwordValue:datas.password
        })
      }
    })
  }

  checker = (e) => {
     this.setState({
       [e.target.name]: e.target.value
     })
   }

   back = (e) => {
     this.props.history.push("/")
   }
  render () {
    return (
      <div>
        <div className="addpassword">
          <div className="formadd">
            <div className="forminput">
              <input type="text" name="url" placeholder="your url" value={this.state.url} onChange={this.checker}/>
            </div>
            <div className="forminput">
              <input type="password" name="passwordValue" placeholder="your password" value={this.state.passwordValue} onChange={this.checker}/>
            </div>
            <PasswordChecker pswVal={{pass:this.state.passwordValue,url:this.state.url,status:this.state.buttonupdate,key:this.props.match.params.id}} />
            <button onClick={this.back}>back</button>
        </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  data: state.data
})

export default connect(mapStateToProps,null)(EditForm);
