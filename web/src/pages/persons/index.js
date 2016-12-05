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
    this.props.allDocs('persons', (err, persons) => {
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
      <li key={person.id}><Link to={`/persons/${person.id}/show`} className="list-group-item">
        {person.firstName + ' ' + person.lastName}
        </Link>
      </li>
    return (
      <div className="container">
        <div className="page-header">
          <h1>Persons</h1>
        </div>
        <div className="list-group">
          <ul className="list">
            {this.state.persons.map(listPerson)}
          </ul>
        </div>
        <Link to="/" className="btn btn-primary">Home</Link>
        <Link to="/persons/new" className="btn btn-primary">NewPerson</Link>
      </div>
    )
  }
})

module.exports = Persons
