import React from 'react';
import PropTypes from 'prop-types';

export default class Title extends React.Component {
    render() {
        return (
            <h4 className="unprose py6 mt12 txt-m txt-bold">
                {this.props.children}
            </h4>
        );
    }
}

Title.propTypes = {
    children: PropTypes.node.isRequired
};
