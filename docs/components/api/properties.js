import React from 'react';
import PropTypes from 'prop-types';

export default class Parameters extends React.Component {
    render() {
        const { section, formatType, md } = this.props;
        return (
            <div>
                <div className="py6 mt12 txt-m txt-bold">Properties</div>
                <div>
                    {section.properties.map((property, i) => (
                        <div key={i} className="mb6">
                            <span className="txt-code txt-bold bg-white mr3 ml-neg3">
                                {property.name}
                            </span>
                            <code className="color-gray">
                                ({formatType(property.type)})
                            </code>
                            {property.default && (
                                <span>
                                    {'('}
                                    default <code>{property.default}</code>
                                    {')'}
                                </span>
                            )}
                            {property.description && (
                                <span>: {md(property.description, true)}</span>
                            )}
                            {property.properties && (
                                <ul>
                                    {property.properties.map((property, i) => (
                                        <li key={i}>
                                            <code>{property.name}</code>{' '}
                                            {formatType(property.type)}
                                            {property.default && (
                                                <span>
                                                    {'('}
                                                    default{' '}
                                                    <code>
                                                        {property.default}
                                                    </code>
                                                    {')'}
                                                </span>
                                            )}
                                            {md(property.description)}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

Parameters.propTypes = {
    section: PropTypes.shape({
        properties: PropTypes.array
    }).isRequired,

    formatType: PropTypes.func.isRequired,
    md: PropTypes.func.isRequired
};
