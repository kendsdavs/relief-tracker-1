const React = require('react')
const xhr = require('xhr')
const {Link, Redirect} = require('react-router')

const Effort = React.createClass({
  getInitialState() {
    return {
      effort: {
        members: []
      },
      removed: false,
      persons: []
    };
  },
  componentDidMount() {
    this.props.get(this.props.params.id, (e, effort) => {
      if(e) return console.log(e.message)
      if (!effort.members) effort.members = []
      this.setState({effort})
    })
    xhr.get('http://127.0.0.1:4000/persons', { json: true}, (err, res, body) => {
      if(err) return console.log(err.message)
      this.setState({persons: [].concat(this.state.persons, body)})
    })
    // this.props.allDocs((e, res, persons) => {
    //   if(e) return console.log(e.message)
    //   this.setState({persons: [].concat(persons)})
    // })
  },
  addMember (person) {
    return (e) => {
      let members = this.state.effort.members.filter(member =>
        member.id !== person.id)
      let effort = {...this.state.effort}
      effort.members = [person, ...members]
      this.setState({effort})
    }
  },
  removeMember (m) {
    return (e) => {
      let members = this.state.effort.members.filter(member =>
        member.id !== m.id)
      let effort = {...this.state.effort}
      effort.members = members
      this.setState({effort})
    }
  },
  updateTeam (e) {
    e.preventDefault()
    this.props.put(this.state.effort.id, this.state.effort, (err, res) => {
      if (err) return console.log(err.message)
      alert('Successfully updated team!')
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
      <div className="container">
        {this.state.removed ? <Redirect to="/efforts" /> : null}
        <h3>{this.state.effort.name}</h3>
        <div>
          <h2>Add People to Team</h2>
            <ul>

              {this.state.persons.map(p =>
                <li key={p.id}>
                  {p.firstName + ' ' + p.lastName}
                  <button onClick={this.addMember(p)}>Add</button>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h3>Team</h3>
              <ul>
                {this.state.effort.members.map(m =>
                  <li key={m.id}>
                    {m.firstName + ' ' + m.lastName}
                    <button onClick={this.removeMember(m)}>Remove</button>
                  </li>
                )}
              </ul>
          </div>
          <div>
            <hr />
            <button onClick={this.updateTeam}>Update Team</button>
          </div>
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
