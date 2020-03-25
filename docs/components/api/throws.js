import React from 'react';
import PropTypes from 'prop-types';

export default class Throws extends React.Component {
    render() {
        const { section, formatType, md } = this.props;
        return (
            <div>
                <div className="py6 mt12 txt-m txt-bold">Throws</div>
                <ul>
                    {section.throws.map((throws, i) => (
                        <li key={i}>
                            {formatType(throws.type)}:{' '}
                            {md(throws.description, true)}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

Throws.propTypes = {
    section: PropTypes.shape({
        throws: PropTypes.array
    }).isRequired,
    formatType: PropTypes.func.isRequired,
    md: PropTypes.func.isRequired
};
