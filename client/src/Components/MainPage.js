import React from 'react'
import ListTodo from './ListTodo'
import Nav from './Nav'
import AddPage from './AddPage'
import axios from 'axios'

class MainPage extends React.Component {
  constructor() {
    super()
    this.state = {
      quote: ''
    };
    this.handleInput = this.handleInput.bind(this)
    this.getQuote = this.getQuote.bind(this)
  }

  getQuote() {
  axios({
    url: 'http://localhost:3001/quote',
    method: 'GET'
  })
    .then(response => {
      this.setState(state => {
        state.quote = response.data.text
        return state
      })
    })
    .catch(e => console.log(e))
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <Nav />
        <AddPage />
        <div id="list-todo">
        <h1 style={{textAlign: 'center'}}>LIST TODO</h1>
          <table border="1" style={{width: '80%', marginRight: 'auto', marginLeft: 'auto', textAlign: 'center'}}>
              <thead>
                  <tr>
                      <td style={{width: '20%'}}>Title</td>
                      <td style={{width: '20%'}}>Description</td>
                      <td style={{width: '20%'}}>Status</td>
                      <td style={{width: '20%'}}>Due Date</td>
                      <td style={{width: '20%'}}>Action</td>
                  </tr>
              </thead>   
          </table>
          <ListTodo />
          <br />
          <br />
          {/* <div className="form-group">
            <input type="text" name='quote' value={this.state.quote} onChange={this.handleInput} className="form-control" style={{marginLeft: '20px', marginRight: '20px', width: '97%'}} />
          </div> */}
          <div style={{textAlign: 'center'}}>
            <h3 value={this.state.quote} onChange={this.handleInput}>{this.state.quote}</h3>
            <button id="quote-btn" type="button" onClick={this.getQuote} className="btn btn-primary" style={{margin: 'auto'}}>Elevate yourself with random quote</button>
          </div>
          </div>
      </div>
      
      )
  }
}

export default MainPage;