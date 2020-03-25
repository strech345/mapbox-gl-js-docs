import React from 'react';
import PropTypes from 'prop-types';
import createFormatters from 'documentation/src/output/util/formatters';
import LinkerStack from 'documentation/src/output/util/linker_stack';
import GithubSlugger from 'github-slugger';
import { highlightJavascript } from '../../components/prism_highlight.js';
import docs from '../api.json'; // eslint-disable-line
import ApiItemMember from './item-member';
import IconText from '@mapbox/mr-ui/icon-text';
import Parameters from './parameters';
import Properties from './properties';
import Returns from './returns';

const linkerStack = new LinkerStack({}).namespaceResolver(docs, namespace => {
    const slugger = new GithubSlugger();
    return `#${slugger.slug(namespace)}`;
});

const formatters = createFormatters(linkerStack.link);

class Augments extends React.Component {
    render() {
        const { section } = this.props;
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
    })
};

class Heading extends React.Component {
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

Heading.propTypes = {
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

class ApiItem extends React.Component {
    md = (ast, inline) => {
        if (
            inline &&
            ast &&
            ast.children.length &&
            ast.children[0].type === 'paragraph'
        ) {
            ast = {
                type: 'root',
                children: ast.children[0].children.concat(ast.children.slice(1))
            };
        }
        return (
            <span
                dangerouslySetInnerHTML={{
                    __html: `${formatters.markdown(ast)}`
                }}
            />
        );
    };
    formatType = type => (
        <span
            dangerouslySetInnerHTML={{ __html: `${formatters.type(type)}` }}
        />
    );

    render() {
        const section = this.props;

        const empty = members => !members || members.length === 0;

        const membersList = (members, title) =>
            !empty(members) && (
                <div>
                    <div className="py6 mt12 txt-m txt-bold">{title}</div>
                    <div className="mb18">
                        {members.map((member, i) => (
                            <ApiItemMember
                                {...this.props}
                                key={i}
                                {...member}
                            />
                        ))}
                    </div>
                </div>
            );

        return (
            <section className="prose mb24">
                {!this.props.nested && <Heading section={section} />}

                {this.md(section.description)}

                {!empty(section.augments) && <Augments section={section} />}

                {section.kind === 'class' &&
                    !section.interface &&
                    (!section.constructorComment ||
                        section.constructorComment.access !== 'private') && (
                        <div
                            className="txt-code px6 py6 txt-s round bg-gray-faint my18"
                            dangerouslySetInnerHTML={{
                                __html: `new ${
                                    section.name
                                }${formatters.parameters(section)}`
                            }}
                        />
                    )}

                {!empty(section.params) &&
                    (section.kind !== 'class' ||
                        !section.constructorComment ||
                        section.constructorComment.access !== 'private') && (
                        <Parameters
                            formatType={this.formatType}
                            md={this.md}
                            section={section}
                        />
                    )}

                {!empty(section.properties) && (
                    <Properties
                        formatType={this.formatType}
                        md={this.md}
                        section={section}
                    />
                )}

                {section.returns && (
                    <Returns
                        formatType={this.formatType}
                        md={this.md}
                        section={section}
                    />
                )}

                {!empty(section.throws) && (
                    <div>
                        <div className="py6 mt12 txt-m txt-bold">Throws</div>
                        <ul>
                            {section.throws.map((throws, i) => (
                                <li key={i}>
                                    {this.formatType(throws.type)}:{' '}
                                    {this.md(throws.description, true)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {!empty(section.examples) && (
                    <div>
                        <div className="py6 mt12 txt-m txt-bold">Example</div>
                        {section.examples.map((example, i) => (
                            <div key={i}>
                                {example.caption && (
                                    <p>{this.md(example.caption)}</p>
                                )}
                                {highlightJavascript(example.description)}
                            </div>
                        ))}
                    </div>
                )}

                {membersList(section.members.static, 'Static Members')}
                {membersList(section.members.instance, 'Instance Members')}
                {membersList(section.members.events, 'Events')}

                {!empty(section.sees) && (
                    <div>
                        <div className="py6 mt12 txt-m txt-bold">Related</div>
                        <ul>
                            {section.sees.map((see, i) => (
                                <li key={i}>{this.md(see, true)}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
        );
    }
}

ApiItem.propTypes = {
    nested: PropTypes.string,
    namespace: PropTypes.string,
    name: PropTypes.string,
    context: PropTypes.object,
    augments: PropTypes.array,
    kind: PropTypes.string,
    constructorComment: PropTypes.shape({
        access: PropTypes.string
    }),
    version: PropTypes.string,
    license: PropTypes.string,
    author: PropTypes.string,
    copyright: PropTypes.string,
    location: PropTypes.object,
    description: PropTypes.object,
    interface: PropTypes.string,
    since: PropTypes.string,
    params: PropTypes.array,
    properties: PropTypes.array,
    returns: PropTypes.array,
    throws: PropTypes.array,
    examples: PropTypes.array,
    members: PropTypes.object,
    sees: PropTypes.array
};

export default ApiItem;
