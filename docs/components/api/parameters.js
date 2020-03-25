import React from 'react';
import PropTypes from 'prop-types';

export default class Parameters extends React.Component {
    render() {
        const { section, formatType, md } = this.props;
        return (
            <div>
                <div className="py6 mt12 txt-m txt-bold">Parameters</div>
                <div>
                    {section.params.map((param, i) => (
                        <div key={i} className="mb6">
                            <div>
                                <span className="txt-code bg-transparent ml-neg3 txt-bold">
                                    {param.name}
                                </span>
                                <code className="color-gray">
                                    ({formatType(param.type)})
                                </code>
                                {param.default && (
                                    <span>
                                        {'('}
                                        default <code>{param.default}</code>
                                        {')'}
                                    </span>
                                )}
                                {md(param.description, true)}
                            </div>
                            {param.properties && (
                                <div className="mt6 mb12 scroll-auto">
                                    <table className="fixed-table">
                                        <colgroup>
                                            <col width="30%" />
                                            <col width="70%" />
                                        </colgroup>
                                        <thead>
                                            <tr className="txt-bold bg-gray-faint">
                                                <td
                                                    style={{
                                                        borderTopLeftRadius:
                                                            '4px'
                                                    }}
                                                >
                                                    Name
                                                </td>
                                                <td
                                                    style={{
                                                        borderTopRightRadius:
                                                            '4px'
                                                    }}
                                                >
                                                    Description
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody className="mt6">
                                            {param.properties.map(
                                                (property, i) => (
                                                    <tr key={i}>
                                                        <td>
                                                            <span className="txt-code txt-bold txt-break-word bg-white ml-neg3">
                                                                {property.name}
                                                            </span>
                                                            <br />
                                                            <code className="color-gray txt-break-word">
                                                                {formatType(
                                                                    property.type
                                                                )}
                                                            </code>
                                                            <br />
                                                            {property.default && (
                                                                <span className="color-gray txt-break-word">
                                                                    default{' '}
                                                                    <code>
                                                                        {
                                                                            property.default
                                                                        }
                                                                    </code>
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <span>
                                                                {md(
                                                                    property.description,
                                                                    true
                                                                )}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
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
        params: PropTypes.array
    }),
    formatType: PropTypes.func,
    md: PropTypes.func
};
