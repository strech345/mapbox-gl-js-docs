import React from 'react';
import PropTypes from 'prop-types';

export default class Augments extends React.Component {
    render() {
        const { section, formatters } = this.props;
        return (
            <p>
                Extends{' '}
                {section.augments.map((tag, i) => (
                    <span
                        key={i}
                        dangerouslySetInnerHTML={{
                            __html: `${formatters.autolink(tag.name)}`
                        }}
                    />
                ))}
                .
            </p>
        );
    }
}

Augments.propTypes = {
    section: PropTypes.shape({
        augments: PropTypes.array
    }).isRequired,
    formatters: PropTypes.object.isRequired
};
