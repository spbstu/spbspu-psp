var _ = require('underscore');
var aja = require('aja');
var React = require('react');
var moment = require('moment');
require('moment/locale/ru');
moment().locale('ru');

var ruzApiUrl = 'http://ruz.spbstu.ru/api/v1/ruz/';

var Schedule = React.createClass({
    render: function() {
        if(this.state.loading) return <div className="alert text-center">Загрузка...</div>;
        var lessons = _.map(this.state.lessons, function(l) {
            return <Lesson
                key={l.time_start + l.subject + l.typeObj.abbr + l.additional_info}
                startTime={l.time_start}
                subject={l.subject}
                type={l.typeObj.name}
                building={l.auditories ? l.auditories[0].building.name : ''}
                room={l.auditories ? l.auditories[0].name : ''}
                teacher={l.teachers ? l.teachers[0].full_name : ''}
                additionalInfo={l.additional_info}
                />;
        });
        if (lessons.length === 0) return <div className="alert text-center">Нет занятий</div>;
        return <ul className="schedule">
            <li className="schedule__day">
                <ul className="schedule__lessons">{lessons}</ul>
            </li>
        </ul>;
    },

    getInitialState: function() {
        return {
            lessons: [],
            loading: true
        };
    },

    componentDidMount: function() {
        this.loadData();
    },

    componentWillReceiveProps: function(nextProps) {
        if(nextProps.daysFromToday !== this.props.daysFromToday) {
            this.setState(this.getInitialState());
            this.loadData(nextProps);
        }
    },

    loadData: function (props) {
        var self = this;
        props = props || this.props;
        var targetDay = moment().add(props.daysFromToday, 'days');
        var targetDayString = targetDay.format('YYYY-MM-DD');
        var targetDayNumber = targetDay.weekday() + 1;

        var url = ruzApiUrl + 'scheduler/' + props.groupId + '?date=' + targetDayString;
        aja().url(url).on('success', function(json) {
            var day = _.detect(json.days, function (d) {
                return d.weekday === targetDayNumber;
            });
            if (day == null) {
                self.setState({
                    lessons: [],
                    loading: false
                });
            } else {
                self.setState({
                    lessons: day.lessons,
                    loading: false
                });
            }
        }).go();
    }
});

var Lesson = React.createClass({
    render: function() {
        var l = this.props;
        return <li className="lesson">
            <div className="lesson__subject">
                <span className="lesson__time">{l.startTime}</span>
                {l.subject}
            </div>
            <div className="lesson__params">
                <div className="lesson__type">{l.type}</div>
                <Place building={l.building} room={l.room} />
            </div>
        </li>;
    }
});

var Place = React.createClass({
    render: function () {
        var text = this.props.building;
        if (this.props.room !== '') {
            text += ', ауд. ' + this.props.room;
        }
        return <div className="lesson__places"><a className="lesson__link">{text}</a></div>;
    }
});

var Day = React.createClass({
    render: function() {
        var offset = this.props.daysFromToday;
        var d = moment().add(offset, 'days');
        return (
            <h2 className="panel-title text-center">{d.format('D MMMM')}</h2>
        );
    }
});

var ScheduleNav = React.createClass({
    render: function() {
        return <div className="schedule-page">
            <a className="" onClick={this.onClick_prev}>Prev</a>
            <Day daysFromToday={this.state.daysFromToday} />
            <a className="" onClick={this.onClick_next}>Next</a>
            <Schedule groupId={this.props.groupId} daysFromToday={this.state.daysFromToday} />
        </div>;
    },

    onClick_prev: function() {
        this.setState({
            daysFromToday: this.state.daysFromToday - 1
        });
    },
    onClick_next: function() {
        this.setState({
            daysFromToday: this.state.daysFromToday + 1
        });
    },

    getInitialState: function() {
        return {daysFromToday: 0};
    }
});

module.exports = ScheduleNav