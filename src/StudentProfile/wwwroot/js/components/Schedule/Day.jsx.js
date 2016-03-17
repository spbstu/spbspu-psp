'use strict';
var React = require('react');
var Lesson = require('./Lesson.jsx');
var moment = require('moment');
require('moment/locale/ru');

moment.locale('ru');

var Day = React.createClass({
    render: function() {
        var date = moment(this.props.date, "YYYY-MM-DD").format("DD MMM, ddd");

        return (

            <li className="schedule__day">
                <div className="schedule__date">{date}</div>
                {this.props.lessons && <ul className="schedule__lessons">
                    {this.props.lessons.map((lesson, i) =>
                        <Lesson key={i} data={lesson} />
                    )}
                </ul>}</li>
        )
    }
});

module.exports = Day;
