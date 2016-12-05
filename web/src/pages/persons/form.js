const React = require('react')
const {Link, Redirect} = require('react-router')
const xhr = require('xhr')
const TextField = require('../../components/text-field')

const labelStyle = { display: 'block'}
const PersonForm = React.createClass({
  getInitialState() {
    return {
        // firstName: '',
        // lastName: '',
        // email: '',
        // phone: '',
        person: {},
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
    if (this.state.id) {
      this.props.put('persons', this.state.id, this.state, (err, res, body) => {
        if(err) return console.log(err.message)
        this.setState({success: true})
      })
    } else {
      this.props.post('persons', this.state, (err, res, body) => {
        if(err) return console.log(err.message)
        this.setState({success: true})
      })
      // xhr.post('http://127.0.0.1:4000/persons', {
      //   json: this.state
      // }, (err, response, body) => {
      //   if (err) return console.log(err.message)
      //   this.setState({success: true})
      // })
    }

  },
  componentDidMount() {
    if (this.props.params.id) {
      this.props.get('persons', this.props.params.id, (err, person) => {
        if (err) return console.log(err.message)
        this.setState(person)
      })
      // xhr.get('http://127.0.0.1:4000/persons/' +
      // this.props.params.id, {json: true}, (err, response, person) => {
      //   if (err) return console.log(err.message)
      //   this.setState(person)
      // })
    }
  },
  render() {
    const formState = this.props.params.id ? 'Edit' : 'New'
    return (
      <div className="container">
        { this.state.success && this.state.id ?
          <Redirect to={`/persons/${this.state.id}/show` }/> : null }
        { this.state.success && !this.state.id ?
          <Redirect to={`/persons`} /> : null }
        <div className="page-header">
          <h1 className="col-sm-offset-1">{formState} Person Form</h1>
        </div>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <TextField label="First Name"
            type="text"
            value={this.state.firstName}
            onChange={this.handleChange('firstName')} />
          {/* <div>
            <label style={labelStyle}>First Name</label>
            <input
              onChange={this.handleChange('firstName')}
              value={this.state.firstName}
              type="text" />
          </div> */}
          <TextField label="Last Name"
            type="text"
            value={this.state.lastName}
            onChange={this.handleChange('lastName')} />
          {/* <div>
            <label style={labelStyle}>Last Name</label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              onChange={this.handleChange('lastName')}
              value={this.state.lastName}
              type="text" />
          </div> */}
          <TextField label="Email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange('email')} />
          {/* <div>
            <label style={labelStyle}>E-mail</label>
            <input
              onChange={this.handleChange('email')}
              value={this.state.email}
              type="email" />
          </div> */}
          <TextField label="Phone Number"
            type="text"
            value={this.state.phone}
            onChange={this.handleChange('phone')} />
          {/* <div>
            <label style={labelStyle}>Phone</label>
            <input
              onChange={this.handleChange('phone')}
              value={this.state.phone}
              type="text" />
          </div> */}
          <div>
            <p>
              <button className="btn btn-primary col-sm-offset-1 col-sm-2">Save</button>
            </p>
            <p>
              <Link className="btn btn-default col-sm-offset-1 col-sm-2" to="/persons">Cancel</Link>
            </p>
          </div>
            {/* <button>Save</button>
            <Link to="/persons">Cancel</Link> */}
        </form>
      </div>
    )
  }
})

module.exports = PersonForm
