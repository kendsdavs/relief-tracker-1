const React = require('react')
const xhr = require('xhr')
const {Link} = require('react-router')

const Effort = React.createClass({
  getInitialState() {
    return {
      effort: {}
    }
  },
  componentDidMount() {
    xhr.get('http://127.0.0.1:4000/efforts/' +
     this.props.params.id, {
      json: true
    }, (err, res, effort) => {
      if(err) return console.log(err.message)
      this.setState({effort})
    })
  },
  render() {
    return (
      <div>
        <h3>{this.state.effort.name}</h3>
        <Link to="/efforts">Return</Link>
      </div>
    )
  }
})

module.exports = Effort
