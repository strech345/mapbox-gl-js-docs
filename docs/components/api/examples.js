import React from 'react';
import PropTypes from 'prop-types';
import Title from './title';
import { highlightJavascript } from '../../components/prism_highlight.js';

export default class Examples extends React.Component {
    render() {
        const { section, md } = this.props;
        return (
            <React.Fragment>
                <Title>Example</Title>
                {section.examples.map((example, i) => (
                    <React.Fragment key={i}>
                        {example.caption && <p>{md(example.caption)}</p>}
                        {highlightJavascript(example.description)}
                    </React.Fragment>
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
