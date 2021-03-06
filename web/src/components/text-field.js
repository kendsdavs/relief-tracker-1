const React = require('react')

const TextField = React.createClass({
  render() {
    const labelStyle = {display: 'block', color: 'green'}
    return (
        <div className="form-group">
          <label className="col-sm-2">{this.props.label}</label>
          {/* //<label style={labelStyle}>{this.props.label}</label> */}
          <div className="col-sm-10">
            <input
              className="col-sm-6"
              type={this.props.type}
              value={this.props.value}
              onChange={this.props.onChange} />
          </div>
        </div>

    )
  }
})

module.exports = TextField
