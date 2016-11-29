const React = require('react')

const TextField = React.createClass({
  render() {
    const labelStyle = {display: 'block', color: 'green'}
    return (
      <div>
        <label style={labelStyle}>{this.props.label}</label>
        <input type={this.props.type}
          value={this.props.value}
          onChange={this.props.onChange} />
      </div>
    )
  }
})

module.exports = TextField
