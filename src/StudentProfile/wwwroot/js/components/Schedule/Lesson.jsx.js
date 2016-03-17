'use strict';
var React = require('react');
var Teachers = require('./Teachers.jsx');
var Groups = require('./Groups.jsx');
var Place = require('./Place.jsx');

var Lesson = React.createClass({
    render: function() {
        return (
            <li className="lesson">
                <div className="lesson__subject"><span className="lesson__time">{this.props.data.time_start}-{this.props.data.time_end}</span> {this.props.data.subject}</div>
                <div className="lesson__params">
                    <div className="lesson__type">{this.props.data.typeObj.name}</div>
                    {this.props.data.groups && <Groups data={this.props.data.groups} additional={this.props.data.additional_info} />}
                    {this.props.data.teachers && <Teachers data={this.props.data.teachers} />}
                    {this.props.data.auditories && <Place data={this.props.data.auditories} />}
                </div>
            </li>
        )
    }
});

module.exports = Lesson;
