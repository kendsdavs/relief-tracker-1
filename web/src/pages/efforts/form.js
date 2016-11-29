const React = require('react')
const {Link, Redirect} = require('react-router')
const labelStyle = { display: 'block'}
const xhr = require('xhr')
const TextField = require('../../components/text-field')


const EffortForm = React.createClass({
  getInitialState() {
    return {
      effort: {
        name: '',
        phase: '',
        organizationID: '',
        desc: '',
        start: '',
        end: '',
        location_id:''
      },
      locations: [],
      success: false
    }
  },
  componentDidMount() {
    if (this.props.params.id) {
      this.props.get("efforts", this.props.params.id, (e, effort) => {
        if(e) return console.log(e.message)
        this.setState(effort)
      })
    }
      this.props.allDocs("locations", (err, body) => {
        if(err) return console.log(err.message)
        this.setState({locations: body})

      })
      // xhr.get('http://127.0.0.1:4000/locations', { json: true}, (err, res, body) => {
      //   if(err) return console.log(err.message)
      //   this.setState({locations: [].concat(this.state.locations, body)})
      // })
  },
  handleChange(field) {
    return e => {
      let effort = this.state.effort
      effort[field]= e.target.value
      this.setState({effort})
    }
  },
  handleSubmit(e) {
    e.preventDefault()
    // let effort = {}
    // effort.name = this.state.name
    // effort.description = this.state.description
    // effort.phase = this.state.phase
    // effort.location_id = this.state.location_id
    // effort.startDate = this.state.startDate
    // effort.id = this.state.id


    if(this.state.id) {
      this.props.put("efforts", this.state.id, this.state, (err, effort) => {
        if (err) return console.log(err.message)
        this.setState({success: true})
      })
    } else {
      //console.log("this is the this.state", this.state)
      this.props.post("efforts", this.state.effort, (err, effort) => {
        if (err) return console.log(err.message)
        this.setState({success: true})
      })
    }
  },
<<<<<<< HEAD
  componentDidMount() {
    if (this.props.params.id) {
      xhr.get('http://127.0.0.1:4000/efforts/' +
        this.props.params.id, {json: true}, (err, res, effort) => {
        if(err) return console.log(err.message)
        this.setState({effort})
      })
    }
  },
=======

>>>>>>> ready-to-merge-with-master
  render() {
    const formState = this.state.id ? 'Edit' : 'New'
    const locationList = location =>
      <option key={location.id} value={location.id}>{location.name}</option>
    return (
      <div className="container">
        { this.state.success && this.state.id ?
          <Redirect to={`/efforts/${this.state.id}/show`} /> : null }
        { this.state.success && !this.state.id ?
          <Redirect to={`/efforts`} /> : null }
        <h1>{formState} Relief Effort Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label style={labelStyle}>Effort Name</label>
            <input
              onChange={this.handleChange('name')}
              value={this.state.effort.name}
              type="text" />
          </div>
          <div>
            <label style={labelStyle}>Phase
              <select value={this.state.effort.value} onChange={this.handleChange('phase')}>
                <option value="started">Started</option>
                <option value="in-progress">In-Progress</option>
                <option value="completed">Completed</option>
              </select>
            </label>
          </div>
          <div>
            <label style={labelStyle}>Location
              <select value={this.state.effort.location_id}
                onChange={this.handleChange('location_id')}>
                {this.state.locations.map(locationList)}
              </select>
            </label>
          </div>
          <TextField label="Organization Name"
            type="text"
            value={this.state.effort.organizationID}
            onChange={this.handleChange('organizationID')} />
          {/* <div>
            <label style={labelStyle}>Organization Name</label>
            <input
              onChange={this.handleChange('organizationID')}
              value={this.state.organizationID}
              type="text" />
          </div> */}
          <TextField label="Description"
            type="text"
            value={this.state.effort.desc}
            onChange={this.handleChange('desc')} />
          {/* <div>
            <label style={labelStyle}>Description</label>
            <input
              onChange={this.handleChange('desc')}
              value={this.state.desc}
              type="text" />
          </div> */}
          <TextField label="Start Date"
            type="date"
            value={this.state.effort.start}
            onChange={this.handleChange('start')} />
          {/* <div>
            <label style={labelStyle}>Start Date</label>
            <input
              onChange={this.handleChange('start')}
              value={this.state.start}
              type="date" />
          </div> */}
          <TextField label="End Date"
            type="date"
            value={this.state.effort.end}
            onChange={this.handleChange('end')} />
          {/* <div>
            <label style={labelStyle}>End Date</label>
            <input
              onChange={this.handleChange('end')}
              value={this.state.end}
              type="date" />
          </div> */}
          <div>
            <button>Save</button>
            <Link to="/efforts">Cancel</Link>
          </div>
        </form>
      </div>
    )
  }
})

module.exports = EffortForm
