const React = require('react')
const { BrowserRouter, Match, Miss, Link } = require('react-router')
const Home = require('./pages/home')
const About = require('./pages/about')
const Persons = require('./pages/persons')
const Person = require('./pages/persons/show')
const PersonForm = require('./pages/persons/form')
const Efforts = require('./pages/efforts')
const Effort = require('./pages/efforts/show')
const EffortForm = require('./pages/efforts/form')
const Locations = require('./pages/locations')
const Location = require('./pages/locations/show')
const LocationForm = require('./pages/locations/form')
const Service = require('./components/service')

const NoMatch = () => (
  <div>
    <h3>Page Not Found</h3>
    <Link to="/">Home</Link>
  </div>
)

const App = React.createClass({
  render () {
    return (
      <BrowserRouter>
        <div>
          <Match exactly pattern="/" component={Home} />
          <Match pattern="/about" component={About} />

          <Match exactly pattern="/persons" component={Service(Persons)} />
          <Match pattern="/persons/:id/show" component={Service(Person)} />
          <Match exactly pattern="/persons/new" component={Service(PersonForm)} />
          <Match pattern="/persons/:id/edit" component={Service(PersonForm)} />

          <Match exactly pattern="/efforts" component={Service(Efforts)} />
          <Match pattern="/efforts/:id/show" component={Service(Effort)} />
          <Match exactly pattern="/efforts/new" component={Service(EffortForm)} />
          <Match pattern="/efforts/:id/edit" component={Service(EffortForm)} />

          <Match exactly pattern="/locations" component={Service(Locations)} />
          <Match pattern="/locations/:id/show" component={Service(Location)} />
          <Match exactly pattern="/locations/new" component={Service(LocationForm)} />
          <Match pattern="/locations/:id/edit" component={Service(LocationForm)} />
          <Miss component={NoMatch} />
        </div>
      </BrowserRouter>
    )
  }
})

module.exports = App
