import React from 'react';
import PropTypes from 'prop-types';

export default class Augments extends React.Component {
    render() {
        const { section, formatters } = this.props;
        return (
            <div className="mt12">
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
            </div>
        );
    }
}

Augments.propTypes = {
    section: PropTypes.shape({
        augments: PropTypes.array.isRequired
    }).isRequired,
    formatters: PropTypes.shape({
        autolink: PropTypes.func.isRequired
    }).isRequired
};
