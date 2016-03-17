'use strict';
var React = require('react');
var Link = require('react-router').Link;

var Groups = React.createClass({
    getInitialState: function() {
        return {
            showAdditional: Boolean(this.props.additional),
            showGroups: !Boolean(this.props.additional)
        }
    },

    showGroupsHandler: function() {
        this.setState({
            showAdditional: false,
            showGroups: true
        })
    },

    render: function() {
        let classNames = ['lesson__groups', 'lesson-groups'];
        if (this.state.showAdditional) {
            classNames.push('lesson-groups_with-additional');
        }

        let groupsList = (<div className="lesson-groups__list">
            Группы:&nbsp;
            {this.props.data.map(function(group, i) {
                return (
                <span key={i} className="lesson__group">
                            <Link to={`/faculty/${group.faculty.id}/groups/${group.id}`}
                                  className="lesson__link"
                                  activeClassName="lesson__link_active">
                                {group.name}
                            </Link>
                        </span>
                    )
                })}
        </div>);

        return (
            <div className={classNames.join(' ')}>
                <span className="lesson-groups__additional">
                    {this.props.additional}
                    <span className="lesson-groups__toggle"
                          onClick={this.showGroupsHandler}
                    >показать группы</span>
                </span>
                {groupsList}
            </div>
        )
    }
});

module.exports = Groups;
