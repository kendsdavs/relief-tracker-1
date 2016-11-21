const React = require('react')
const xhr = require('xhr')
const { Link, Redirect } = require('react-router')

const Person = React.createClass({
  getInitialState() {
    return {
      person: {},
      removed: false
    }
  },
  componentDidMount() {
    this.props.get(this.props.params.id, (err, person) => {
      if (err) return console.log(err.message)
      this.setState({person})
    })
    // xhr.get('http://127.0.0.1:4000/persons/' +
    //   this.props.params.id, {
    //     json: true
    //   }, (err, response, person) => {
    //     if (err) return console.log(err.message)
    //     this.setState({person})
    //   }
    // )
  },
  handleRemove(e) {
    e.preventDefault()
    if(confirm('Are you sure?') )

    {
      xhr.del('http://127.0.0.1:4000/persons/' + this.state.person.id, {
        json: this.state.person
      }, (err, response, body) => {
        if (err) return console.log(err.message)
        this.setState({removed: true})
      })
    }
  },
  render() {
    return (
      <div className="container">
        { this.state.removed ? <Redirect to="/persons" /> : null}
        <h3>{this.state.person.firstName
          + " " + this.state.person.lastName}</h3>
        <Link to={`/persons/${this.state.person.id}/edit`}>Edit Person</Link>
        |
        <button onClick={this.handleRemove}>Remove Person</button>
        |
        <Link to="/persons">Return</Link>
      </div>
    )
  }
})

module.exports = Person
