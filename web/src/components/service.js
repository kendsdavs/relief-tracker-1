const React = require('react')
const xhr = require('xhr')
const API_URL = process.env.REACT_APP_API

const Service = (Component) => React.createClass({
  allDocs (model, callback) {
    xhr.get(`${API_URL}/${model}`, {json: true}, (err, response, body) => {
      callback(err, body)
    })
  },
  get (model, id, callback) {
    xhr.get(`${API_URL}/${model}/${id}`, {json: true}, (err, response, person) => {
      callback(err, person)
    })
  },
  post (model, doc, callback) {
    xhr.post(`${API_URL}/${model}`, { json: doc}, (e,r,b) => {
      callback(e,b)
    })
  },
  put (model, id, doc, callback) {
    xhr.put(`${API_URL}/${model}/${id}`, {json:doc}, (e, r, b) => {
      callback(e, b)
    })
  },
  remove (model, doc, callback) {
    xhr.del(`${API_URL}/${model}/${doc.id}`, {json: doc}, (err, response, person) => {
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
