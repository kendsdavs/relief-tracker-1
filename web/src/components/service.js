const React = require('react')
const xhr = require('xhr')
const API_URL = process.env.REACT_APP_API

const Service = Component => React.createClass({
  allDocs (callback) {
    xhr.get(API_URL + '/persons', {json: true}, (err, response, body) => {
      callback(err, body)
    })
  },
  get (id, callback) {
    xhr.get(`${API_URL}/persons/${id}`, {json: true}, (err, response, person) => {
      callback(err, person)
    })
  },
  remove (id, callback) {
    xhr.del(`${API_URL}/persons/${id}`, {json: true}, (err, response, person) => {
      callback(err, person)
    })
  },
  render () {
    return (
      <Component {...this.props}
        allDocs={this.allDocs}
        get={this.get}
        put={this.put}
        post={this.post}
        remove={this.remove}
      />
    )
  }
})


module.exports = Service
