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
        if (this.state.type == 'textarea') {
            return (
                <span>
                    {this.state.text}：<textarea id={this.state.id}
                        className={this.state.id}
                        name={this.state.id}
                        defaultValue={this.props.init.initValue}
                        onChange={this.handleChange}
                        placeholder={this.state.text} ></textarea></span>
            );
        } else if (this.state.type == 'select') {
            return (
                <span>
                    {this.state.text}：<select id={this.state.id}
                        className={this.state.id}
                        name={this.state.id}
                        defaultValue={this.props.init.initValue}
                        onChange={this.handleChange}
                        placeholder={this.state.text} ></select></span>
            );
        } else {
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
    }
});

var GeneralForm = React.createClass({
    getInitialState: function () {
        return {
            arr: [],
            form: {}
        };
    },

    componentDidMount: function () {
        $.get(this.props.source, function (result) {
            var o = result;
            if (this.isMounted()) {
                this.setState({
                    arr: o.form.itemlist,
                    form: o.form
                });
            }
        }.bind(this));
    },

    render: function () {
        var input = this.state.arr.map(function (o, i) {
            return <div><Input init={o} key={i} /></div>;
        });

        return (
            <div><form id={this.state.form.id}
                action={this.state.form.action}
                method={this.state.form.method} >
                {input}</form>
            </div>
        );
    }
});

ReactDOM.render(
    <GeneralForm source="formData.json" />,
    document.getElementById('example')
);