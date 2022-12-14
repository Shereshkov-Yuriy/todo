import React from "react"

class TodoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      project: props.projects[0].id,
      todo: "",
      user: 0,
    }
  }
  handleChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      }
    );
  }
  handleSubmit(event) {
    this.props.create_todo(
      this.state.project, this.state.todo, this.state.user)
    event.preventDefault()
  }
  render() {
    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        <div className="form-group">
          <label htmlFor="project">project</label>
          <select className="form-control" name="project" onChange={(event) =>
            this.handleChange(event)}>
            {this.props.projects.map((project_) => 
              <option value={project_.id}>{project_.title}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="todo">todo</label>
          <input type="text" className="form-control" name="todo"
            value={this.state.todo} onChange={(event) => 
            this.handleChange(event)}/>
        </div>
        <div className="form-group">
          <label htmlFor="user">user</label>
          <input type="number" className="form-control" name="user"
            value={this.state.user} onChange={(event) => 
            this.handleChange(event)}/>
        </div>
        <input type="submit" className="btn btn-primary" value="Save" />
      </form>
    );
  }
}

export default TodoForm