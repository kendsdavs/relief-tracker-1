const React = require('react')
const {Link, Redirect} = require('react-router')
const labelStyle = { display: 'block'}
const xhr = require('xhr')

const EffortForm = React.createClass({
  getInitialState() {
    return {
      name: '',
      phase: '',
      organizationID: '',
      desc: '',
      start: '',
      end: '',
      success: false
    }
  },
  handleChange(field) {
    return e => {
      const newState = {}
      newState[field] = e.target.value
      this.setState(newState)
    }
  },
  handleSubmit(e) {
    e.preventDefault()
    xhr.post("http://127.0.0.1:4000/efforts", {
      json: this.state
    }, (err, response, body) => {
      if(err) return console.log(err.message)
      this.setState({success: true})
    })
  },
  render() {
    return (
      <div className="container">
        { this.state.success ? <Redirect to="/efforts" /> : null }
        <h1>New Relief Effort Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label style={labelStyle}>Effort Name</label>
            <input
              onChange={this.handleChange('name')}
              value={this.state.name}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>Phase
              <select value={this.state.phase} onChange={this.handleChange('phase')}>
                <option value="started">Started</option>
                <option value="in-progress">In-Progress</option>
                <option value="completed">Completed</option>
              </select>
            </label>
          </div>
          <div>
            <label style={labelStyle}>Organization Name</label>
            <input
              onChange={this.handleChange('organizationID')}
              value={this.state.organizationID}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>Description</label>
            <input
              onChange={this.handleChange('desc')}
              value={this.state.desc}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>Start Date</label>
            <input
              onChange={this.handleChange('start')}
              value={this.state.start}
              type="date" />
          </div>
          <div>
            <label style={labelStyle}>End Date</label>
            <input
              onChange={this.handleChange('end')}
              value={this.state.end}
              type="date" />
          </div>
          <div>
            <button>Save</button>
            <Link to="/effort">Cancel</Link>
          </div>
        </form>
      </div>
    )
  }
})

module.exports = EffortForm
