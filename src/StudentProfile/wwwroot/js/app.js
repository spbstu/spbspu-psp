var React = require('react');
var render = require('react-dom').render;
var ScheduleNav = require('./components/ScheduleNav.jsx');

render(React.createElement(ScheduleNav, { groupId: '19834' }), document.getElementById('schedule'));
