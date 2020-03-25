import React from 'react';
import PropTypes from 'prop-types';
import IconText from '@mapbox/mr-ui/icon-text';

export default class SectionHeading extends React.Component {
    render() {
        const { section } = this.props;
        return (
            <div className="mb24">
                <h3 className="mb12" id={section.namespace.toLowerCase()}>
                    <a
                        className="unprose color-blue-on-hover"
                        href={`#${section.namespace.toLowerCase()}`}
                    >
                        {section.name}
                    </a>
                </h3>
                {section.context && section.context.github && (
                    <a
                        className="pt6 link--gray txt-s unprose"
                        href={section.context.github.url}
                    >
                        <IconText iconBefore="github">
                            {section.context.github.path}
                        </IconText>
                    </a>
                )}
            </div>
        );
    }
}

SectionHeading.propTypes = {
    section: PropTypes.shape({
        namespace: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        context: PropTypes.shape({
            github: PropTypes.shape({
                url: PropTypes.string.isRequired,
                path: PropTypes.string.isRequired
            })
        })
    }).isRequired
};
