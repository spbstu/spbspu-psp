'use strict';
var React = require('react');
var Link = require('react-router').Link;

var Teachers = React.createClass({
    render: function() {
        return (
            <div className="lesson__teachers">
                {this.props.data.map(function(person, i) {
                    return (
                        <div key={i}>
                            <Link to={`/teachers/${person.id}`}
                                  className="lesson__link"
                                  activeClassName="lesson__link_active">
                                    {person.grade} {person.full_name}
                                </Link>
                        </div>
                    )
                })}
            </div>
        )
    }
});

module.exports = Teachers;
