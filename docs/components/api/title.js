import React from 'react';
import PropTypes from 'prop-types';

export default class Title extends React.Component {
    render() {
        const { children } = this.props;
        return <div className="py6 mt12 txt-m txt-bold">{children}</div>;
    }
}

Title.propTypes = {
    children: PropTypes.node.isRequired
};
