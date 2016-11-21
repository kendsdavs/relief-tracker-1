const React = require('react')
const {Link} = require('react-router')
//const xhr = require('xhr')

const Persons = React.createClass({
  getInitialState: function() {
    return {
      persons: []
    }
  },
  componentDidMount() {
    this.props.allDocs((err, persons) => {
      if (err) return console.log(err.message)
      this.setState({persons})
    })
    // xhr.get('http://127.0.0.1:4000/persons', {
    //   json: true
    // }, (err, response, persons) => {
    //   if (err) return console.log(err.message)
    //   this.setState({persons})
    // })
  },
  render() {
    //use tag template in Link
    const listPerson = person =>
      <li key={person.id}><Link to={`/persons/${person.id}/show`}>
        {person.firstName + ' ' + person.lastName}
        </Link>
      </li>
    return (
      <div className="container">
        <h1>Persons</h1>
        <Link to="/persons/new">NewPerson</Link>
        <ul>
          {this.state.persons.map(listPerson)}
        </ul>
        <Link to="/">Home</Link>
      </div>
    )
  }
})

module.exports = Persons
