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
    xhr.get("http://127.0.0.1:4000/efforts", {
      json: true
    }, (err, response, efforts) => {
      if(err) return console.log(err.message)
      this.setState({efforts})
    })
    // this.props.allDocs((err, efforts) => {
    //   if(err) return console.log(err.message)
    //   this.setState({efforts})
    // })
  },
  render() {
    const listEffort = effort =>
      <li>{effort.name}</li>
    return (
      <div>
        <h1>Relief Efforts</h1>
        <ul>
          {this.state.efforts.map(listEffort)}
        </ul>
        <Link to="/">Home</Link>
      </div>
    )
  }
})

module.exports = Efforts
