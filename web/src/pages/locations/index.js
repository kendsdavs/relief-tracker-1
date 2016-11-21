const React = require('react')
const xhr = require('xhr')
const {Link} = require('react-router')

const Locations = React.createClass({
  getInitialState() {
    return {
      locations: []
    }
  },
  componentDidMount() {
    xhr.get("http://127.0.0.1:4000/locations", {
      json: true
    }, (err, res, locations) => {
      if (err) return console.log(err.message)
      this.setState({locations})
    })
  },
  render() {
    const listLocations = location =>
      <li key={location.id}><Link to={`/locations/${location.id}/show`}>
      {location.name}
        </Link>
      </li>
    return (
      <div className="container">
        <h1>Locations</h1>
        <ul>
          {this.state.locations.map(listLocations)}
        </ul>
        <Link to="/">Home</Link>
      </div>
    )
  }
})

module.exports = Locations
