import React, { Component } from 'react';
import { connect } from 'react-redux'
import { db } from './../firebase/firebase'
import swal from 'sweetalert2'
import { adddata } from './../store/data/data.action'

class PasswordChecker extends Component {
    constructor() {
        super();
        this.state = {
          besar: false,
          kecil: false,
          angka: false,
          symbol: false,
          total: false
        }
    }

    pswCheck = () => {
      let uppercase = RegExp(/([A-Z])/g)
      if (this.props.pswVal.pass.match(uppercase)) {
          let uppar = document.querySelectorAll('.uppar');
          uppar[0].classList.add('line-through');
          this.state.besar = true
      } else {
          let uppar = document.querySelectorAll('.uppar')
          if (uppar.length !== 0){
            uppar[0].classList.remove('line-through');
            this.state.besar = false
          }
      }

      let lowercase = RegExp(/([a-z])/g)
      if (this.props.pswVal.pass.match(lowercase)) {
          let lower = document.querySelectorAll('.lower');
          lower[0].classList.add('line-through');
          this.state.kecil = true

      } else {
          let lower = document.querySelectorAll('.lower')
          if (lower.length !== 0){
            lower[0].classList.remove('line-through');
            this.state.kecil = false
          }
      }

      let special = RegExp(/[^A-Za-z0-9\s]/g)
      if (this.props.pswVal.pass.match(special)) {
          let secial = document.querySelectorAll('.secial');
          secial[0].classList.add('line-through');
          this.state.symbol = true

      } else {
          let secial = document.querySelectorAll('.secial')
          if (secial.length !== 0){
            secial[0].classList.remove('line-through');
            this.state.kecil = false
          }
      }

      let number = RegExp(/[0-9]/g)
      if (this.props.pswVal.pass.match(number)) {
          let nomor = document.querySelectorAll('.nomor');
          nomor[0].classList.add('line-through');
          this.state.angka = true
      } else {
          let nomor = document.querySelectorAll('.nomor')
          if (nomor.length !== 0){
            nomor[0].classList.remove('line-through');
            this.state.kecil = false
          }
      }

      if (this.props.pswVal.pass.length >= 5) {
          let panjang = document.querySelectorAll('.panjang');
          panjang[0].classList.add('line-through');
          this.state.total = true
      } else {
          let panjang = document.querySelectorAll('.panjang')
          if (panjang.length !== 0) {
            panjang[0].classList.remove('line-through');
            this.state.kecil = false
          }
      }
    }

    addpassword = (e) => {
      if (this.state.besar && this.state.kecil && this.state.angka && this.state.symbol && this.state.total) {
        
        this.props.addlist({password:this.props.pswVal.pass,url:this.props.pswVal.url,userid:this.props.pswVal.userid})
        swal({
          position: 'center',
          type: 'success',
          title: 'add succes',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        swal({
          position: 'center',
          type: 'error',
          title: 'Sorry Password belum memenuhi ketentuan',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }

    changelist = (e) => {
      if (this.state.besar && this.state.kecil && this.state.angka && this.state.symbol && this.state.total) {
        db.ref(`listpassword/${this.props.pswVal.key}`).update({password:this.props.pswVal.pass,email:this.props.pswVal.url})
        swal({
          position: 'center',
          type: 'success',
          title: 'update succes',
          showConfirmButton: false,
          timer: 1500
        })

      } else {
        swal({
          position: 'center',
          type: 'error',
          title: 'Sorry Password belum memenuhi ketentuan',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
    render() {
        return (
          <div>
            <div className="notifikasi">
                {this.pswCheck()}
                <p><strong>Password Strength :</strong></p>
                <span className="uppar">Harus ada satu huruf besar<br/></span>
                <span className="lower">Harus ada 1 huruf kecil <br/></span>
                <span className="nomor">harus ada angka<br/></span>
                <span className="secial">harus ada symbol (#$@!%...)<br/></span>
                <span className="panjang">total password minimal 5 character<br/></span>
            </div>
            {this.props.pswVal.status ?
              <div className="buttonsubmit" >
                <button onClick={this.changelist}>change</button>
              </div> :
              <div className="buttonsubmit" >
                <button onClick={this.addpassword}>Add Password</button>
              </div>
            }
          </div>
        )
    }
}

function mapDispatchToProps (dispatch) {
  return {
    addlist: (payload) => dispatch(adddata(payload))
  }
}

export default connect(null, mapDispatchToProps)(PasswordChecker)
