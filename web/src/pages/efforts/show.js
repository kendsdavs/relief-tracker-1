const React = require('react')
const xhr = require('xhr')
const {Link, Redirect} = require('react-router')

const Effort = React.createClass({
  getInitialState() {
    return {
      effort: {},
      removed: false
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
  handleRemove(e) {
    e.preventDefault()
    if (confirm('Are you sure?') ) {
      xhr.del('http://127.0.0.1:4000/efforts/' + this.state.effort.id, {
        json: this.state.effort
      }, (err, res, body) => {
        if (err) return console.log(err.message)
        this.setState({removed: true})
      })
    }
  },
  render() {
    return (
      <div>
        {this.state.removed ? <Redirect to="/efforts" /> : null}
        <h3>{this.state.effort.name}</h3>
        <Link to="/efforts">Return</Link>
        |
        <Link to={`/efforts/${this.state.effort.id}/edit`}>
          Edit Effort
        </Link>
        |
        |
        <a href="#" onClick={this.handleRemove}>Remove Effort</a>

      </div>
    )
  }
})

module.exports = Effort
