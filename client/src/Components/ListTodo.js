import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class ListTodo extends React.Component {
  state = {
    list: []
  }

  componentDidMount() {
    axios({
      method: "GET",  
      url: "http://localhost:3001/todos",
      headers: {
          access_token: localStorage.getItem('access_token')
      }
    })
      .then(response => {
        this.setState({ list: response.data })
      })
      .catch(e => console.log(e))
  }

  render() {
    return (
      <table border="1" style={{width: '80%', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
        <tbody>
          {this.state.list.map(data => 
            <tr key={data.id}>
              <td style={{width: '20%'}}>{ data.title }</td>
              <td style={{width: '20%'}}>{ data.description }</td>
              <td style={{width: '20%'}}>{ data.status }</td>
              <td style={{width: '20%'}}>{ data.due_date }</td>
              <td style={{width: '20%'}}>
                <Link to={`/Edit/${ data.id }`}>
                  <button className="btn btn-outline-primary">Edit</button>
                </Link>
                <button className="btn btn-outline-danger" onClick={() => 
                axios({
                  method: 'DELETE',
                  url: `http://localhost:3001/todos/${data.id}`,
                  headers:{
                    access_token: localStorage.getItem('access_token')
                  }
                })
                  .then(response => {
                    let id = `${data.id}`
                    let list = this.state.list.filter((post) => {
                      return post.id !== Number(id)
                    })
                    this.setState(state => {
                      state.list = list
                      return state
                    })
                  })
                  .catch(e => console.log(e))
                }>Delete</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}