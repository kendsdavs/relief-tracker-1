const React = require('react')
const { Link } = require('react-router')

const Home = React.createClass({
  render() {
    return (
      <div className="tc pb3">
        <h1 className="dim black b f2 f-headline-ns tc db mb3 mb4-ns">
          Relief Tracker</h1>

        <ul>
          <li className="link dim gray f3 f2-ns dib mr3">
            <Link to="/persons">Persons</Link></li>
          <li className="link dim gray f3 f2-ns dib mr3">
            <Link to="/efforts">Efforts</Link></li>
          <li className="link dim gray f3 f2-ns dib mr3">
            <Link to="/locations">Locations</Link></li>
          <li className="link dim gray f3 f2-ns dib mr3">
            <Link to="/about">About</Link></li>
        </ul>

      </div>
    )
  }
})

module.exports = Home
