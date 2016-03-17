'use strict';
var React = require('react');
var Link = require('react-router').Link;
var dateUtils = require('../../utils/date');

var Day = React.createClass({
    render: function() {
        let week = this.props.week;
        let nextDate = dateUtils.getNextWeekStartString(week);
        let prevDate = dateUtils.getPrevWeekStartString(week);
        let link = this.props.link;

        return (
            <div className="switcher">
                <div className="switcher__item">
                    <Link to={link}
                          query={{date: prevDate}}
                          className="switcher__link"
                          activeClassName="switcher__link_active">Предыдущая неделя</Link>
                </div>
                <div className="switcher__item">
                    <Link to={link}
                          className="switcher__link"
                          activeClassName="switcher__link_active">Текущая неделя</Link>
                </div>
                <div className="switcher__item">
                    <Link to={link}
                          query={{date: nextDate}}
                          className="switcher__link"
                          activeClassName="switcher__link_active">Следующая неделя</Link>
                </div>
            </div>
        )
    }
});

module.exports = Day;
