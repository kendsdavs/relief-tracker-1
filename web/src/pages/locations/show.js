const React = require('react')
const xhr = require('xhr')
const{Link} = require('react-router')

const Location = React.createClass({
  getInitialState() {
    return {
      location: {}
    }
  },
  componentDidMount() {
    xhr.get('http://127.0.0.1:4000/locations/' +
      this.props.params.id, {
      json: true
    }, (err, res, location) => {
      if(err) return console.log(err.message)
      this.setState({location})
    }
   )
 },
  render() {
    return (
      <div className="container">
        <h3>{this.state.location.name}</h3>
        <h1>{this.state.location.lat + '/' + this.state.location.lng}</h1>
        <Link to="/locations">Return</Link>
      </div>
    )
  }
})

module.exports = Location
