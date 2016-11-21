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
    if (this.state.id) {
      xhr.put("http://127.0.0.1:4000/locations/" + this.state.id, {
        json: this.state
      }, (err, res, body) => {
        if (err) return console.log(err.message)
        this.setState({success: true})
      } )
    } else {
      xhr.post("http://127.0.0.1:4000/locations", {
        json: this.state
      }, (err, res, body) => {
        if (err) return console.log(err.message)
        this.setState({success: true})
      })
    }
  },
  componentDidMount() {
    if (this.props.params.id) {
      xhr.get("http://127.0.0.1:4000/locations/" +
        this.props.params.id, {
        json: true
      }, (err, res, location) => {
        if(err) return console.log(err.message)
        this.setState(location)
      })
    }
  },
  render() {
    const formState = this.state.id ? "Edit" : "New"
    return (
      <div className="container">
        {this.state.success && this.state.id ?
          <Redirect to={`/locations/${this.state.id}/show`} /> : null}
        {this.state.success && !this.state.id ?
          <Redirect to="/locations" /> : null}
        <h1>{formState} Location Form</h1>
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
          <Link to="/locations">Cancel</Link>
        </form>
      </div>
    )
  }
})
module.exports = LocationForm
