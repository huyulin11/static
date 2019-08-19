var UserLogin = React.createClass({
    getDefaultProps: function() {
        return {
            labelUsername: "用户名",
            labelPassword: "密码",
        };
    },

    render: function() {
        return <div style={{ marginTop: 20, marginLeft: 20 }}>
            <div>
                <label>{this.props.labelUsername}</label>
                <input type="text" style={{ marginLeft: 20 }} />
            </div>
            <div style={{ marginTop: 10 }}>
                <label>{this.props.labelPassword}</label>
                <input type="text" style={{ marginLeft: 36 }} />
            </div>
        </div>;
    },
});