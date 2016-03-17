var React = require('react');
var Link = require('react-router').Link;

var Teacher = React.createClass({
    render: function () {
        let teacher = this.props.teacher;

        return (<li className="search-result__item">
            <div className="search-result__title">
                <Link to={`/teachers/${teacher.id}`}
                      className="search-result__link"
                      activeClassName="">
                    {teacher.full_name}
                </Link>
            </div>

            <div className="search-result__comment">{teacher.chair}</div>
        </li>);
    }
});

module.exports = Teacher;
