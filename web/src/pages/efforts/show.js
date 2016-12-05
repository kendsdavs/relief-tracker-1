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
    this.props.allDocs('persons', (e, persons) => {
      if(e) return console.log(e.message)
      this.setState({persons})
    })

    this.props.get('efforts', this.props.params.id, (e, effort, body) => {
      if(e) return console.log(e.message)
      if (!effort.members) effort.members = []
      this.setState({effort})
    })
  },
  addMember (person) {
    return (e) => {
      let members = this.state.effort.members.filter(member =>
        member.id !== person.id)
      let effort = {...this.state.effort}
      effort.members = [person, ...members] //spread operator
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
    this.props.put('efforts',this.state.effort.id, this.state.effort, (err, res, body) => {
      if (err) return console.log(err.message)
      alert('Successfully updated team!')
    })
  },
  handleRemove(e) {
    e.preventDefault()
    if (confirm('Are you sure?') ) {
      this.props.remove('efforts', this.state.effort, (err, response, body) => {
        if (err) return console.log(err.message)
        this.setState({removed: true})
      })
    }
  },
  render() {
    return (
      <div className="container">
        {this.state.removed ? <Redirect to="/efforts" /> : null}
        <div className="container">
          <div className="page-header">
            <h1>{this.state.effort.name}</h1>
          </div>
        </div>
        <div>
          <h2>Add People to Team</h2>
           {this.state.persons.map(p =>
             <article className="mw5 dib bg-white br3 pa3 pa4-ns ma3 ba b--black-10">
              <div className="tc">
                <img src="http://tachyons.io/img/avatar_1.jpg" className="br-100 h4 w4 dib ba b--black-05 pa2" title="Kitty staring at you" />
                <h1 className="f3 mb2">{p.firstName + p.lastName}</h1>
                <button onClick={this.addMember(p)}>Add</button>
              </div>
            </article>
           )}
          </div>
          <div>
            <h3>Team</h3>
                {this.state.effort.members.map(m =>
                  <article className="dt w-50 bb b--black-05 pb2 mt2" href="#0">
                    <div className="dtc w2 w3-ns v-mid">
                      <img src="http://tachyons.io/img/avatar_1.jpg" className="ba b--black-10 db br2 w2 w3-ns h2 h3-ns" />
                    </div>
                    <div className="dtc v-mid pl2 pa2">
                      <h1 className="f6 f5-ns fw6 lh-title black mv0">{m.firstName + m.lastName}</h1>
                      <h2 className="f6 fw4 mt0 mb0 black-60">{m.email}</h2>
                    </div>
                    <div className="dtc v-mid">
                      <form className="w-100 tr">
                        <button className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60" onClick={this.removeMember(m)}>Remove</button>
                      </form>
                    </div>
                  </article>

                //   <article className="mw5 dib bg-white br3 pa3 pa4-ns ma3 ba b--black-10">
                //    <div className="tc">
                //      <img src="http://tachyons.io/img/avatar_1.jpg" className="br-100 h4 w4 dib ba b--black-05 pa2" title="Kitty staring at you" />
                //      <h1 className="f3 mb2">{m.firstName + m.lastName}</h1>
                //      <button onClick={this.removeMember(m)}>Remove</button>
                //    </div>
                //  </article>
                )}
                {/* <li key={m.id}>
                  {m.firstName + ' ' + m.lastName}
                  <button onClick={this.removeMember(m)}>Remove</button>
                </li> */}
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
