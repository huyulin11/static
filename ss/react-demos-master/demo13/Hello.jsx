var Hello = React.createClass({
    getInitialState: function () {
        return {
            greeting: '',
            from: ''
        };
    },

    componentDidMount: function () {
        this.setState({
            greeting: this.props.greeting,
            from: this.props.from
        });
    },

    render: function () {
        return (
            <div>
                greeting:{this.state.greeting}<p/>
                from:{this.state.from}<p/>
            </div>
        );
    }
});

ReactDOM.render(
    <Hello greeting="22" from="33" />,
    document.getElementById('example2')
);