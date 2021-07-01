import React, {Component} from "react";

interface IStopwatchProps {}

interface IStopwatchState {
    status: boolean;
    runningTime: number;
}

class Stopwatch extends Component<IStopwatchProps, IStopwatchState> {
    timer: any;

    state = {
        status: false,
        runningTime: 0,
    };

    getUnits(time: number) {
        const seconds = time / 1000;

        const min = Math.floor(seconds / 60).toString();
        const sec = Math.floor(seconds % 60).toString();
        const msec = (seconds % 1).toFixed(3).substring(2);

        return `${min}:${sec}:${msec}`;
    }

    handleClick = () => {
        this.setState((state) => {
            if (state.status) {
                clearInterval(this.timer);
            } else {
                const startTime = Date.now() - this.state.runningTime;
                this.timer = setInterval(() => {
                    this.setState({runningTime: Date.now() - startTime});
                });
            }
            return {status: !state.status};
        });
    };

    handleReset = () => {
        clearInterval(this.timer);
        this.setState({runningTime: 0, status: false});
    };

    handleLap = () => {
        console.log(this.getUnits(this.state.runningTime));
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const {status, runningTime} = this.state;

        return (
            <div>
                <p>{this.getUnits(runningTime)}</p>
                <button onClick={this.handleClick}>
                    {status ? "Stop" : "Start"}
                </button>
                <button onClick={this.handleReset}>Reset</button>
                <button onClick={this.handleLap}>Lap</button>
            </div>
        );
    }
}

export default Stopwatch;
