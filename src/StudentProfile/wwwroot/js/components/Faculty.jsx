var React = require('react');
var _ = require('lodash');
var reactRedux = require('react-redux');
var actions = require('../actions/FacultyActions');
var Groups = require('./Groups.jsx');

var Faculty = React.createClass({
    componentWillMount: function () {
        var facultyId = this.props.params.facultyId;

        if (! this.props.groups || ! this.props.groups[ facultyId ]) {
            this.props.dispatch(actions.fetchGroups(facultyId));
        }
    },

    getGroupPart: function (group, part) {
        return parseInt(group.name.split('/')[ part ]);
    },

    getGroupNum: function (group) {
        return this.getGroupPart(group, 0);
    },

    getSubgroupNum: function (group) {
        return this.getGroupPart(group, 1);
    },

    groupGroupsByLevel: function(groups) {
        if (groups) {
            return _.chain(groups)
                .sortBy('level')
                .sortByOrder([ this.getGroupNum, this.getSubgroupNum ])
                .groupBy('level')
                .value();
        } else {
            return null;
        }
    },

    render: function () {
        var facultyId = parseInt(this.props.params.facultyId, 10);
        var faculty = this.props.faculty;
        var groups = this.props.groups && this.props.groups[ facultyId ];
        var levels = this.groupGroupsByLevel(groups);

        if (this.props.isFetching && faculty) {
            return (
                <div className="faculty">
                    <h2 className="page__h2">{faculty.name}</h2>
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        if (!faculty) {
            return (
                <div className="faculty">
                    <div>Данные загружаются...</div>
                </div>
            )
        }

        return (
            <div className="faculty">
                <h2 className="page__h2">{faculty.name}</h2>
                {
                    levels &&
                    <div className="faculty__levels">
                        {
                            Object.keys(levels)
                                .map(function(level, i) {
                                return (
                                <div key={i} className="faculty__level">
                                    <h3 className="page__h3">{level} курс</h3>
                                    <Groups groups={levels[level]} facultyId={facultyId}/>
                                </div>
                                    );
                                }
                                )
                            }
                    </div>
                    }
            </div>
        )
    }
});

Faculty.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isFetching: state.groups.isFetching,
        faculty: state.groups.faculty,
        groups: state.groups.data
    }
}

module.exports = reactRedux.connect(mapStateToProps)(Faculty);
