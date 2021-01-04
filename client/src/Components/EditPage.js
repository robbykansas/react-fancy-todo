import React from 'react'
import axios from 'axios'

class EditPage extends React.Component {
    constructor() {
        super();
        this.state={};
        this.handleInput = this.handleInput.bind(this)
        this.editData = this.editData.bind(this)
    }

    componentDidMount() {
        axios({
          method: "GET",  
          url: `http://localhost:3001/todos/${this.props.match.params.id}`,
          headers: {
              access_token: localStorage.getItem('access_token')
          }
        })
          .then(response => {
            this.setState(state => {
                state = response.data
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

    editData(e) {
        e.preventDefault()
        const title=this.state.title
        const description=this.state.description
        const status=this.state.status
        const due_date=this.state.due_date

        axios({
            method: 'PUT',
            url: `http://localhost:3001/todos/${this.props.match.params.id}`,
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
                this.props.history.push('/')
            })
            .catch(e => console.log(e))
    }
    render() {
    return (
        <div id="edit-page" style={{borderRadius: '25px', width: '75%', margin: 'auto', marginTop: '75px'}} className="bg-light">
            <h1 style={{textAlign: 'center'}}>Edit Todo</h1>
            <form id="edit-form" style={{marginLeft: '20px', marginRight: '20px'}} onSubmit={this.editData}>
                <div className="form-group">
                    <label htmlFor="edit-title">title</label>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleInput} id="edit-title" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-description">description</label>
                    <input type="text" name="description" value={this.state.description} onChange={this.handleInput} id="edit-description" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-status">status</label>
                    <input type="text" name="status" value={this.state.status} onChange={this.handleInput} id="edit-status" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="edit-due_date">due_date</label>
                    <input type="text" name="due_date" value={this.state.due_date} onChange={this.handleInput} id="edit-due_date" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
      )
  }
}

export default EditPage