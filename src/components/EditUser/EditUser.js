import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            phone: ''
        }
    };

    render() {
        return (
            <div>
                A place to edit.
            </div>
        )
    }
}