'use strict';
var React = require('react');
var Link = require('react-router').Link;

var Faculties = React.createClass({
    render: function() {
        return (
            <ul className="faculty-list__list">
            {this.props.faculties.map((faculty, i) =>
                    <li key={i} className="faculty-list__item">
                        <Link to={`/faculty/${faculty.id}/groups`} className="faculty-list__link">{faculty.name}</Link>
                    </li>
            )}
            </ul>
        )
    }
});

module.exports = Faculties;
