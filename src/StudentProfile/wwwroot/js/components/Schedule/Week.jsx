'use strict';
var React = require('react');
var dateUtils = require('../../utils/date');

var Week = React.createClass({
    render: function() {
        var week = this.props.week,
            weekType = week.is_odd ? 'нечётная неделя' : 'чётная неделя';

        return (
            <h3 className="page__h3">Расписание с {dateUtils.humanDate(week.date_start)} по {dateUtils.humanDate(week.date_end)} ({weekType})
            </h3>
        )
    }
});

module.exports = Week;
