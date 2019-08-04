import React from 'react'
import moment from 'moment-timezone'
import './Clock.css'


class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = { time: new Date() }; // initialise the state
    }

    componentDidMount() { // create the interval once component is mounted
        this.update = setInterval(() => {
            this.setState({ time: new Date() });
        }, 1 * 1000); // every 1 seconds
    }

    componentWillUnmount() { // delete the interval just before component is removed
        clearInterval(this.update);
    }

    render() {
        const { time } = this.state; // retrieve the time from state

        return (<div className='container'>
            
            <h2>
                {''}
                {moment(time).tz(this.props.time).format('LTS')}
            </h2>
        </div>);
    }
}

export default Clock