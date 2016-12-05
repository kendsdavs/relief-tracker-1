const React = require('react')
const { Link } = require('react-router')

const Home = React.createClass({
  render() {
    return (
    <div>
      <nav className="navbar navbar-default">
        <div className="tc pb3">
          <h1 className="dim black b f2 f-headline-ns tc db mb3 mb4-ns">
            Relief Tracker</h1>
        </div>
      </nav>

      <div className="main">
       <div className="row">
          <div className="col-lg-4">
            <img className="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140" />
            <h2>Persons</h2>
            <p>A complete list of the wonderful people, giving their time and effort for a cause.</p>
            <p><Link to="/persons" className="btn btn-default">View details &raquo;</Link></p>
          </div>
          {/* <!-- /.col-lg-4 --> */}
          <div className="col-lg-4">
            <img className="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140" />
            <h2>Efforts</h2>
            <p>The world needs you. Find projects.</p>
            <p><Link to="/efforts" className="btn btn-default">View details &raquo;</Link></p>
          </div>
          {/* <!-- /.col-lg-4 --> */}
          <div className="col-lg-4">
            <img className="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140" />
            <h2>Locations</h2>
            <p>Where in the world will you go?</p>
            <p><Link to="/locations" className="btn btn-default">View details &raquo;</Link></p>
          </div>
          {/* <!-- /.col-lg-4 --> */}
        </div>
      </div>
    </div>





        /* /* /* /* <div className="tc pb3">
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
      </nav> */
    )
  }
})

module.exports = Home
