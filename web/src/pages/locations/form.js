const React = require('react')
const {Link, Redirect} = require('react-router')
const xhr = require('xhr')

const LocationForm = React.createClass({
  getInitialState() {
    return {
      name: '',
      lat: '',
      lng: '',
      success: false
    }
  },
  handleChange(input) {
    return e => {
      const newState = {}
      newState[input] = e.target.value
      this.setState(newState)
    }
  },
  handleSubmit(e) {
    e.preventDefault()
    xhr.post("http://127.0.0.1:4000/locations", {
      json: this.state
    }, (err, res, body) => {
      if (err) return console.log(err.message)
      this.setState({success: true})
    })
  },
  render() {
    return (
      <div className="container">
        {this.state.success ? <Redirect to="/locations" /> : null}
        <h1>New Location Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Location</label>
            <input
              onChange={this.handleChange('name')}
              value={this.state.name}
              type="text" />
          </div>
          <div>
            <label>Latitude</label>
            <input
              onChange={this.handleChange('lat')}
              value={this.state.lat}
              type="text" />
          </div>
          <div>
            <label>Longitude</label>
            <input
              onChange={this.handleChange('lng')}
              value={this.state.lng}
              type="text" />
          </div>
          <button>Add</button>
        </form>
      </div>
    )
  }
})
module.exports = LocationForm
