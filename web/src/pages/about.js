const React = require('react')
const { Link } = require('react-router')

const About = React.createClass({
  render() {
    return (
      <div>
      <h1>About Relief Tracker</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
    )
  }
})

module.exports = About
