import React from 'react';
import PropTypes from 'prop-types';

export default class Returns extends React.Component {
    render() {
        const { section, formatType, md } = this.props;
        return section.returns.map((ret, i) => (
            <div key={i}>
                <div className="py6 mt12 txt-m txt-bold">Returns</div>
                <code>{formatType(ret.type)}</code>
                {ret.description && <span>: {md(ret.description, true)}</span>}
            </div>
        ));
    }
}

Returns.propTypes = {
    section: PropTypes.shape({
        returns: PropTypes.array
    }).isRequired,
    formatType: PropTypes.func.isRequired,
    md: PropTypes.func.isRequired
};
