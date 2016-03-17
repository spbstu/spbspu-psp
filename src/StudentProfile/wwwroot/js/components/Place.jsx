var React = require('react');
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../actions/PlaceActions');
var Day = require('./Schedule/Day.jsx');
var Week = require('./Schedule/Week.jsx');
var Pager = require('./Schedule/Pager.jsx');
var LessonsList = require('./Schedule/LessonsList.jsx');

var Place = React.createClass({
    componentWillMount: function () {
        var placeId = parseInt(this.props.params.placeId, 10);
        var buildingId = this.props.params.buildingId;

        var location = this.props.location;
        this.date = location.query && location.query.date;

        if (! this.props.place || this.props.place.id !== placeId) {
            this.props.dispatch(actions.fetchPlace(buildingId, placeId, this.date));
        }
    },

    componentDidUpdate: function() {
        var placeId = this.props.params.placeId;
        var buildingId = this.props.params.buildingId;
        var location = this.props.location;
        var date = location.query && location.query.date;

        if (this.date !== date) {
            this.date = date;
            this.props.dispatch(actions.fetchPlace(buildingId, placeId, this.date));
        }
    },

    render: function() {
        var placeId = parseInt(this.props.params.placeId, 10);
        var buildingId = parseInt(this.props.params.buildingId, 10);
        var lessons = this.props.lessons && this.props.lessons[placeId];
        var place = this.props.place;
        var week = this.props.week;
        var pagerLink = `/places/${buildingId}/${placeId}`

        if (this.props.isFetching) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        if (! place) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        return (
            <div className="schedule-page">
                <h2 className="page__h2">
                    {place.building && <span>{place.building.name}, {place.building.address} </span> }
                    {place.name && <span>ауд. {place.name}</span> }
                </h2>

                <Week week={week} />

                <Pager week={week} link={pagerLink} />

                <LessonsList lessons={lessons} />

                <Pager week={week} link={pagerLink} />
            </div>
        )
    }
});

Place.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isFetching: state.places.isFetching,
        place: state.places.place,
        lessons: state.places.data,
        week: state.places.week
    }
}

module.exports = reactRedux.connect(mapStateToProps)(Place);
