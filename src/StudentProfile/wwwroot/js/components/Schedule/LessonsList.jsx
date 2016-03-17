var React = require('react');
var Day = require('./Day.jsx');

var LessonsList = React.createClass({
    render: function () {
        let lessons = this.props.lessons;

        if (! lessons) {
            return <div></div>;
        }

        if (lessons.length) {
            return (
            <ul className="schedule">
                {lessons.map((day, i) =>
                <Day key={i} date={day.date} lessons={day.lessons} />
                )}
            </ul>
            )
        } else {
            return (
                <ul className="schedule">
                    <li className="schedule__empty">
                        На эту неделю занятия не поставлены
                    </li>
                </ul>
            )
        }
    }
});

module.exports = LessonsList;
