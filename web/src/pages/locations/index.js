const React = require('react')
//const xhr = require('xhr')
const {Link} = require('react-router')

const Locations = React.createClass({
  getInitialState() {
    return {
      locations: []
    }
  },
  componentDidMount() {
  //   xhr.get("http://127.0.0.1:4000/locations", {
  //     json: true
  //   }, (err, res, locations) => {
  //     if (err) return console.log(err.message)
  //     this.setState({locations})
  //   })
  // },
  this.props.allDocs("locations", (err, locations) => {
    if (err) return console.log(err.message)
    this.setState({locations})
  })
},

  render() {
    const listLocations = location =>
      <li key={location.id}><Link to={`/locations/${location.id}/show`}
      className="list-group-item">
      {location.name}
        </Link>
      </li>
    return (
      <div className="container">
        <div className="page-header">
          <h1>Locations</h1>
        </div>
        <div className="list-group">
          <ul className="list">
            {this.state.locations.map(listLocations)}
          </ul>
        </div>
        <Link to="/" className="btn btn-primary">Home</Link>

        <Link to="/locations/new" className="btn btn-primary">Add Location</Link>
      </div>
    )
  }
})

module.exports = Locations
