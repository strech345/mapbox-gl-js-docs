import React from 'react';
import PropTypes from 'prop-types';
import { highlightJavascript } from '../../components/prism_highlight.js';

export default class Examples extends React.Component {
    render() {
        const { section, md } = this.props;
        return (
            <React.Fragment>
                <div className="py6 mt12 txt-m txt-bold">Example</div>
                {section.examples.map((example, i) => (
                    <div key={i}>
                        {example.caption && <p>{md(example.caption)}</p>}
                        {highlightJavascript(example.description)}
                    </div>
                ))}
            </React.Fragment>
        );
    }
}

Examples.propTypes = {
    section: PropTypes.shape({
        examples: PropTypes.array.isRequired
    }).isRequired,
    md: PropTypes.func.isRequired
};
