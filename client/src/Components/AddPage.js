import React from 'react'
import axios from 'axios'

function AddPage() {
  const addTodos = {
    title: '',
    description: '',
    status: '',
    due_date: ''
  }

  const [todo, setTodo] = React.useState(addTodos)
  
  function handleInput(event) {
    const { name, value } = event.target
    setTodo({...todo, [name]: value})
  }

  function AddTodos() {
    const title = todo.title
    const description = todo.description
    const status = todo.status
    const due_date = todo.due_date
    axios({
      method: 'POST',
      url: "http://localhost:3001/todos",
      headers: {
          access_token: localStorage.getItem('access_token')
      },
      data: {
          title,
          description,
          status,
          due_date
      }
    })
      .then(response => {
        console.log(response.data)
      })
      .catch(e => console.log(e))
  }
  return (
    <div style={{borderRadius: '25px', width: '75%', margin: 'auto', marginTop: '75px'}} className="bg-light">
      <div id="add-page">
        <form id="add-form" style={{marginLeft: '20px', marginRight: '20px'}}>
            <h1 style={{textAlign: 'center'}}>Add Todo</h1>
            <div className="form-group">
                <label htmlFor="title">title</label>
                <input type="text" name="title" value={todo.title} onChange={handleInput} id="add-title" className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="description">description</label>
                <input type="text" name="description" value={todo.description} onChange={handleInput} id="add-description" className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="status">status</label>
                <input type="text" name="status" value={todo.status} onChange={handleInput} id="add-status" className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="due_date">due_date</label>
                <input type="text" name="due_date" value={todo.due_date} onChange={handleInput} id="add-due_date" className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary" onClick={AddTodos}>Submit</button>
        </form>
    </div>
  </div>
  )
}

export default AddPage