var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var LettersNav = React.createClass({
    componentDidMount: function() {
        var node = ReactDOM.findDOMNode(this);
        this.offset = node.offsetTop;

        window.addEventListener('scroll', _.throttle(this.handleScroll, 100));
    },

    componentWillUnmount() {
        window.removeEventListener('scroll', _.throttle(this.handleScroll, 100));
    },

    getInitialState: function() {
        return {
            affix: false
        }
    },

    handleScroll: function(e) {
        let scrollTop = document.body.scrollTop;

        if (scrollTop >= this.offset) {
            this.setState({
                affix: true
            });
        }

        if (scrollTop < this.offset) {
            this.setState({
                affix: false
            });
        }
    },

    render: function () {
        let letters = this.props.letters;
        let classNames = ['letters-nav'];
        if (this.state.affix) {
            classNames.push('letters-nav_affix');
        }

        return (<div className={classNames.join(' ')}>
            <div className="letters-nav__affix">
            {letters.map((letter, i) => {
                let hash = '#' + letter;

                return <a className="letters-nav__item" href={hash} key={i}>{letter}</a>
                })
            }
            </div>
            <div className="letters-nav__push"></div>
        </div>);
    }
});

module.exports = LettersNav;
