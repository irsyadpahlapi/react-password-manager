import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect } from "react-router-dom"
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import Enyzme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Login from './components/Login'
import Register from './components/Register'
import PasswordChecker from './components/PasswordChecker'
import Home from './components/Home'
import {auth} from './store'
Enyzme.configure({ adapter: new Adapter() })

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><App /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('should have <Route /> <Redirect />', () => {
    const wrapper = shallow(<Provider store={store}><App /></Provider>)
    expect(wrapper.containsAllMatchingElements([
      <Route />
    ]))
  })
  it('the first page should be Login', () => {
    const wrapper = mount(
      <Provider store={store}>
        <App auth={{isLogin: false}}/>
      </Provider>
    )
    expect(wrapper.containsMatchingElement(<Login />)).toBeTruthy()
    expect(wrapper.containsMatchingElement(<Home />)).toBeFalsy()
    expect(wrapper.containsMatchingElement(<Register />)).toBeFalsy()
  })
})
describe('store', () => {
  const wrapperStore = mount(
    <Provider store={store}>
      <Home />
    </Provider>
  )

  it('password list should mount data at start', () => {
    expect(wrapperStore.props().store.getState().data).toEqual({
      data: [],
      loading: true,
      error: false
    })
  })
})

describe('register', () => {
  const wrapperform = mount(
    <Provider store={store}>
      <Register />
    </Provider>
  )
  it('PasswordForm should have form', () => {
    expect(wrapperform.find('input')).toBeTruthy()
  })
  it('PasswordForm should have button Submit', () => {
    expect(wrapperform.find('button').text()).toEqual('Signin')
  })
})
