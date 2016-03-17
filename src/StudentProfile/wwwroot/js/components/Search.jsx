var React = require('react');
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../actions/SearchActions');
var TeachersList = require('./Search/TeachersList.jsx');

var Search = React.createClass({
    componentWillMount: function () {
        if (! this.props.teachers) {
            this.props.dispatch(actions.fetchTeachersList());
        }
    },

    componentDidUpdate: function() {

    },

    render: function() {
        let teachers = this.props.teachers;

        if (this.props.isFetching) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        if (! this.props.teachers) {
            return (
                <div className="schedule-page">
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        return (
            <div className="schedule-page">
                <TeachersList teachers={teachers} />
            </div>
        )
    }
});

Search.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isFetching: state.search.isFetching,
        teachers: state.search.data
    }
}

module.exports = reactRedux.connect(mapStateToProps)(Search);
