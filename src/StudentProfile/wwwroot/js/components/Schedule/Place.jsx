'use strict';
var React = require('react');
var Link = require('react-router').Link;

var Place = React.createClass({
    render: function() {
        return (
            <div className="lesson__places">
                {this.props.data.map(function(place, i) {
                    return (
                        <div key={i}>
                            <Link to={`/places/${place.building.id}/${place.id}`}
                                className="lesson__link"
                                activeClassName="lesson__link_active">
                                    {place.building && <span>{place.building.name}, {place.building.address} </span> }
                                    {place.name && <span>ауд. {place.name}</span> }
                            </Link>
                        </div>
                    )
                })}
            </div>
        )
    }
});

module.exports = Place;
