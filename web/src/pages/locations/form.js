const React = require('react')
const {Link, Redirect} = require('react-router')
const xhr = require('xhr')
const TextField = require('../../components/text-field')


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
      this.props.put("locations", this.state.id, this.state, (err, effort) => {
        if (err) return console.log(err.message)
        this.setState({success: true})
      })
      // xhr.put("http://127.0.0.1:4000/locations/" + this.state.id, {
      //   json: this.state
      // }, (err, res, body) => {
      //   if (err) return console.log(err.message)
      //   this.setState({success: true})
      // } )
    } else {
      this.props.post("locations", this.state, (err, effort) => {
        if (err) return console.log(err.message)
        this.setState({success: true})
      })
      // xhr.post("http://127.0.0.1:4000/locations", {
      //   json: this.state
      // }, (err, res, body) => {
      //   if (err) return console.log(err.message)
      //   this.setState({success: true})
      // })
    }
  },
  componentDidMount() {
    if (this.props.params.id) {
      this.props.get("locations", this.props.params.id, (e, effort) => {
        if(e) return console.log(e.message)
        this.setState(effort)
      })
      // xhr.get("http://127.0.0.1:4000/locations/" +
      //   this.props.params.id, {
      //   json: true
      // }, (err, res, location) => {
      //   if(err) return console.log(err.message)
      //   this.setState(location)
      // })
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
        <div className="page-header">
          <h1 className="col-sm-offset-1">{formState} Location Form</h1>
        </div>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <TextField label="Relief Location"
            type="text"
            value={this.state.name}
            onChange={this.handleChange('name')} />
          {/* <div>
            <label>Location</label>
            <input
              onChange={this.handleChange('name')}
              value={this.state.name}
              type="text" />
          </div> */}
          <TextField label="Latitude"
            type="text"
            value={this.state.lat}
            onChange={this.handleChange('lat')} />
          {/* <div>
            <label>Latitude</label>
            <input
              onChange={this.handleChange('lat')}
              value={this.state.lat}
              type="text" />
          </div> */}
          <TextField label="Longitude"
            type="text"
            value={this.state.lng}
            onChange={this.handleChange('lng')} />
          {/* <div>
            <label>Longitude</label>
            <input
              onChange={this.handleChange('lng')}
              value={this.state.lng}
              type="text" />
          </div> */}
          <div>
            <p>
              <button className="btn btn-primary col-sm-offset-1 col-sm-2">Save</button>
            </p>
            <p>
              <Link className="btn btn-default col-sm-offset-1 col-sm-2" to="/locations">Cancel</Link>
            </p>
          </div>
          {/* <button>Add</button>
          <Link to="/locations">Cancel</Link> */}
        </form>
      </div>
    )
  }
})
module.exports = LocationForm
