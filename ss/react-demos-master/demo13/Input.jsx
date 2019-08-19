var Input = React.createClass({
    getInitialState: function () {
        return {
            value: '',
            name: ''
        };
    },

    componentDidMount: function () {
        if (this.isMounted()) {
            this.setState({
                id: this.props.init.id,
                type: this.props.init.type,
                name: this.props.init.id,
                text: this.props.init.text,
                initValue: this.props.init.initValue,
            });
        }
    },

    handleChange: function (event) {
        this.setState({ value: event.target.value });
    },

    render: function () {
        return (
            <span>
                {this.state.text}：<input id={this.state.id}
                    className={this.state.id}
                    type={this.state.type}
                    name={this.state.id}
                    defaultValue={this.props.init.initValue}
                    onChange={this.handleChange}
                    placeholder={this.state.text} /></span>
        );
    }
});
