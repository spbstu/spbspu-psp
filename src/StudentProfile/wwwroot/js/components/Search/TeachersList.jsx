var React = require('react');
var Teacher = require('./Teacher.jsx');
var LettersNav = require('./LettersNav.jsx');
var _ = require('lodash');

var TeachersList = React.createClass({
    render: function () {
        let teachers = this.props.teachers;
        let groups = _.groupBy(teachers, (teacher) => { return teacher.full_name[0] });
        let letters = Object.keys(groups);

        if (! teachers) {
            return <div></div>;
        }

        if (teachers.length) {
            return (
            <div>
                <LettersNav letters={letters} />
                {
                    letters.map((letter, i) => {
                        return (
                        <div id={letter} key={i}>
                            <h2>{letter}</h2>

                            <ul className="search-result">
                            {groups[letter].map((teacher, i) => {
                                return <Teacher teacher={teacher} key={i} />
                            })}
                            </ul>
                        </div>
                        );
                    }
                )}
            </div>
            )
        } else {
            return (
                <ul>
                    <li>
                        Ничено не найдено
                    </li>
                </ul>
            )
        }
    }
});

module.exports = TeachersList;
