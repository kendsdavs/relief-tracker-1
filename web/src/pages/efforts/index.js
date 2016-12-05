const React = require('react')
const { Link } = require('react-router')
const xhr = require('xhr')

const Efforts = React.createClass({
  getInitialState() {
    return {
      efforts: []
    }
  },
  componentDidMount() {
    this.props.allDocs("efforts", (err, efforts) => {
      if(err) return console.log(err.message)
      this.setState({efforts})
    })
  },
  render() {
    const listEffort = effort =>
      <li key={effort.id}><Link to={`efforts/${effort.id}/show`}
      className="list-group-item">
        {effort.name}
      </Link></li>
    return (
      <div className="container">
        <div className="page-header">
          <h1>Relief Efforts</h1>
        </div>
        <div className="list-group">
          <ul className="list">
            {this.state.efforts.map(listEffort)}
          </ul>
        </div>
        <Link to="/" className="btn btn-primary">Home</Link>

        <Link to="/efforts/new" className="btn btn-primary">Create New Effort</Link>
      </div>
    )
  }
})

module.exports = Efforts
