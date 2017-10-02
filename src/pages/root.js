import React, { Component } from 'react';

class Root extends Component {

    /*
        This component wraps your entire application.

        You can pass in props, context etc here.
     */

    render() {
        return (
            <div>
                { this.props.children }
            </div>
        );
    }
}

export default Root;
