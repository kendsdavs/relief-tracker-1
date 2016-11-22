const React = require('react')
const xhr = require('xhr')
const API_URL = process.env.REACT_APP_API

const Service = (Component, model) => React.createClass({
  allDocs (callback) {
    xhr.get(`${API_URL}/${model}`, {json: true}, (err, response, body) => {
      callback(err, body)
    })
  },
  get (id, callback) {
    xhr.get(`${API_URL}/${model}/${id}`, {json: true}, (err, response, person) => {
      callback(err, person)
    })
  },
  post (doc, callback) {
    xhr.post(`${API_URL}/${model}`, { json: doc}, (e,r,b) => {
      callback(e,b)
    })
  },
  put (id, doc, callback) {
    xhr.put(`${API_URL}/${model}/${id}`, {json:doc}, (e, r, b) => {
      callback(e,b)
    })
  },
  remove (id, body, callback) {
    xhr.del(`${API_URL}/${model}/${id}`, {json: body}, (err, response, person) => {
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
