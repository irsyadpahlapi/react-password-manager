import React, { Component } from 'react'
import Header from './Header'
import { BrowserRouter, Link } from "react-router-dom"
import { db } from './../firebase/firebase'
import './../assets/css/home.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import swal from 'sweetalert2'
import PasswordChecker from './PasswordChecker';
import { showdatas } from './../store/data/data.action'


class Home extends Component{

  constructor() {
    super();
    this.state = {
      statuspassword: false,
      url: '',
      search: '',
      passwordValue: '',
      dataupdate:[]
    }
  }

  componentDidMount() {
    this.props.showdatas(this.props.user.userId)
  }
  checker = (e) => {
     this.setState({
       [e.target.name]: e.target.value
     })
   }
   convert (str) {
     let leng = str.length
     let txtpsw = String.fromCharCode(0x2022)
     return txtpsw.repeat(leng)
  }

  changesp = (e) => {
     let data
     if (this.state.statuspassword) {
       data = false
     } else {
       data = true
     }
     swal.mixin({
      input: 'password',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Input your email',
      },
      'input your password'
    ]).then((result) => {
      if (result.value) {
        let datas = result.value
        if (this.props.user.email === datas[0] && this.props.user.password.toString() === datas[1]){
          this.setState({
            statuspassword : data
          })
        } else {
          swal({
            position: 'center',
            type: 'error',
            title: 'email or password salah',
            showConfirmButton: false,
            timer: 1500
          })
        }
      }
    })

  }

  searchlist = (e) => {
    let updatedata = this.props.data.data.filter(value => {
      return value.email.toLowerCase().indexOf(e.target.value) !== -1
    })
    this.setState({
      dataupdate: updatedata
    })
  }

  deletelist = (key) => {
    db.ref(`listpassword/${key}`).remove(function (error) {
        console.log(error ? 'Uh oh!' : 'delete Success!')
      })
    this.props.showdatas(this.props.user.userId)
  }

  render () {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="listpassword">
            <div className="searching">
              <input type="text" name="search" placeholder="search your url" onChange={this.searchlist}/>
            </div>
            <table>
              <tbody>
                <tr>
                  <th>url</th>
                  <th>password</th>
                  <th>show</th>
                  <th>action</th>
                </tr>
                {
                  this.state.dataupdate.length > 0 ?
                  this.state.dataupdate.map( list => {
                    return (
                      <tr key={list.email}>
                        <td><i>{list.email}</i></td>
                        { this.state.password ?
                        <td >	{list.password} </td>:
                        <td>	{this.convert(list.password)} </td>
                        }
                        <td><img src="https://png.icons8.com/cotton/2x/visible.png" width="30" onClick={this.changesp}/></td>
                        <td>
                          <button>update</button>
                          <button>delete</button>
                        </td>
                    </tr>
                    )
                  }) :
                  this.props.data.data.map( list => {
                    return (
                      <tr key={list.id}>
                        <td><i>{list.email}</i></td>
                        { this.state.statuspassword ?
                        <td >	{list.password} </td>:
                        <td>	{this.convert(list.password)} </td>
                        }
                        <td><img src="https://png.icons8.com/cotton/2x/visible.png" width="30" onClick={this.changesp}/></td>
                        <td>
                          <Link to={`/editform/${list.key}`}><button >update</button></Link>
                          <button onClick={() => this.deletelist(list.key)}>delete</button>
                        </td>
                    </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>

          <div className="addpassword">
            <div className="formadd">
              <div className="forminput">
                <input type="text" id="url" name="url" placeholder="your url" onChange={this.checker}/>
              </div>
              <div className="forminput">
                <input type="password" name="passwordValue" placeholder="your password" onChange={this.checker}/>
              </div>
              <PasswordChecker pswVal={{pass:this.state.passwordValue,url:this.state.url,userid:this.props.user.userId}} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ready: state.password,
  user: state.auth,
  data: state.data
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  showdatas
}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(Home);
