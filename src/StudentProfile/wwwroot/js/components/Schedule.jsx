var React = require('react');
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../actions/FacultyActions');
var Week = require('./Schedule/Week.jsx');
var Pager = require('./Schedule/Pager.jsx');
var LessonsList = require('./Schedule/LessonsList.jsx');

var Schedule = React.createClass({
    componentWillMount: function () {
        var facultyId = this.props.params.facultyId;
        var groupId = this.props.params.groupId;

        this.date = this.props.query && this.props.query.date;

        if (! this.props.lessons || ! this.isCurrentGroup(groupId)) {
            this.props.dispatch(actions.fetchLessons(facultyId, groupId, this.date));
        }
    },

    componentDidUpdate: function() {
        var facultyId = this.props.params.facultyId;
        var groupId = parseInt(this.props.params.groupId, 10);
        var location = this.props.location;
        var date = location.query && location.query.date;

        if (this.date !== date || ! this.isCurrentGroup(groupId)) {
            this.date = date;
            this.props.dispatch(actions.fetchLessons(facultyId, groupId, date));
        }
    },

    isCurrentGroup(groupId) {
        if (this.props.group) {
            return (this.props.group.id === groupId);
        } else {
            return true;
        }
    },

    render: function() {
        var groupId = parseInt(this.props.params.groupId, 10);
        var facultyId = parseInt(this.props.params.facultyId, 10);
        var group = this.props.group;
        var faculty = group && group.faculty;
        var lessons = this.props.lessons && this.props.lessons[groupId];
        var week = this.props.week;
        var pagerLink = `/faculty/${facultyId}/groups/${groupId}`;

        if (this.props.isFetching && faculty && group) {
            if (this.isCurrentGroup(groupId)) {
                return (
                    <div className="schedule-page">
                        {faculty.name && <h2 className="page__h2">{faculty.name}</h2>}
                        {group.name && <h3 className="page__h3">Группа № {group.name}</h3>}
                        <div>Данные загружаются...</div>
                    </div>
                )
            } else {
                return (
                    <div className="schedule-page">
                        {faculty.name && <h2 className="page__h2">{faculty.name}</h2>}
                        <div>Данные загружаются...</div>
                    </div>
                )
            }

        }

        if (!faculty || !group || !week) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        return (
            <div className="schedule-page">
                <h2 className="page__h2">{faculty.name}</h2>
                <h3 className="page__h3">Группа № {group.name}</h3>

                <Week week={week} />

                <Pager week={week} link={pagerLink} />

                <LessonsList lessons={lessons} />

                <Pager week={week} link={pagerLink} />
            </div>
        )
    }
});

Schedule.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isFetching: state.lessons.isFetching,
        group: state.lessons.group,
        lessons: state.lessons.data,
        week: state.lessons.week
    }
}

module.exports = reactRedux.connect(mapStateToProps)(Schedule);
