/** @jsx React.DOM */

var HelloMessage = React.createClass( {
    getInitialState: function() {
        return { value: 'Hello Runoob!' };
    },
    handleChange: function( event ) {
        this.setState( { value: event.target.value });
    },
    render: function() {
        var value = this.state.value;
        return <div>
            <input type="text" value={value} onChange={this.handleChange} />
            <h4>{value}</h4>
        </div>;
    }
});