'use strict';
var React = require('react');
var Link = require('react-router').Link;

var Groups = React.createClass({
    render: function() {
        return (
            <ul className="groups-list">
                {this.props.groups.map((group, i) =>
                    <li key={i} className="groups-list__item">
                        <Link to={`/faculty/${this.props.facultyId}/groups/${group.id}`}
                            className="groups-list__link">{group.name}</Link>
                    </li>
                )}
            </ul>
        )
    }
});

module.exports = Groups;
