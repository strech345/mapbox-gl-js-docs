import React from 'react';
import PropTypes from 'prop-types';

export default class ClassName extends React.Component {
    render() {
        const { section, formatters } = this.props;
        return (
            <div
                className="txt-code px6 py6 txt-s round bg-gray-faint my18"
                dangerouslySetInnerHTML={{
                    __html: `new ${section.name}${formatters.parameters(
                        section
                    )}`
                }}
            />
        );
    }
}

ClassName.propTypes = {
    section: PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired,
    formatters: PropTypes.shape({
        parameters: PropTypes.func.isRequired
    }).isRequired
};
