import React from 'react';
import PropTypes from 'prop-types';
import ApiItemMember from './item-member';

export default class MembersList extends React.Component {
    render() {
        const { title, members } = this.props;
        return (
            <div>
                <div className="py6 mt12 txt-m txt-bold">{title}</div>
                <div className="mb18">
                    {members.map((member, i) => (
                        <ApiItemMember {...this.props} key={i} {...member} />
                    ))}
                </div>
            </div>
        );
    }
}

MembersList.propTypes = {
    title: PropTypes.string.isRequired,
    members: PropTypes.array.isRequired
};
