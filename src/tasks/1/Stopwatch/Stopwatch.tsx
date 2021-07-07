import React, { Component, useState } from 'react';

interface IStopwatchProps {}

interface IStopwatchState {
    status: boolean;
    runningTime: number;
}



function Watch() {
    const [status, setStatus] = useState(false);
    const [runningTime, setRunningTime] = useState(0);
    const [timer, setTimer] = useState(0);

    const handleReset = () => {
         clearInterval(timer);
        setRunningTime(0);
    };

    const handleLap = () => {
        console.log(getUnits(runningTime));
    };

    function getUnits(time: number) {
        const seconds = time / 1000;

        const min = Math.floor(seconds / 60).toString();
        const sec = Math.floor(seconds % 60).toString();
        const msec = (seconds % 1).toFixed(3).substring(2);

        return `${min}:${sec}:${msec}`;
    }

    function handleClick() {
        console.log('timer',timer);
        if (status) {
            console.log('clearInterval');
            clearInterval(timer);
        } else {
            console.log('setInterval');
            const startTime = Date.now() - runningTime;
            setTimer(setInterval(() => {
                console.log('setInterval');
                setRunningTime( Date.now() - startTime);
            }));
        }
        console.log('timer',timer);
        setStatus(!status)

    }

    return (
      <div>
          <p>{getUnits(runningTime)}</p>
          <button onClick={handleClick}>
              {status ? "Stop" : "Start"}
          </button>
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleLap}>Lap</button>
      </div>
    );
}

// class Stopwatch extends Component<IStopwatchProps, IStopwatchState> {
//     timer: any;
//
//     state = {
//         status: false,
//         runningTime: 0,
//     };
//
//     getUnits(time: number) {
//         const seconds = time / 1000;
//
//         const min = Math.floor(seconds / 60).toString();
//         const sec = Math.floor(seconds % 60).toString();
//         const msec = (seconds % 1).toFixed(3).substring(2);
//
//         return `${min}:${sec}:${msec}`;
//     }
//
//     handleClick = () => {
//         if (this.state.status) {
//             clearInterval(this.timer);
//         } else {
//             const startTime = Date.now() - this.state.runningTime;
//             this.timer = setInterval(() => {
//                 this.setState({runningTime: Date.now() - startTime});
//             });
//         }
//         this.setState((state) => {
//             return {status: !state.status};
//         });
//     };
//
//     handleReset = () => {
//         clearInterval(this.timer);
//         this.setState({runningTime: 0, status: false});
//     };
//
//     handleLap = () => {
//         console.log(this.getUnits(this.state.runningTime));
//     };
//
//     componentWillUnmount() {
//         clearInterval(this.timer);
//     }
//
//     // leftPad = (width, n) => {
//     //     if ((n + '').length > width) {
//     //         return n;
//     //     }
//     //     const padding = new Array(width).join('0');
//     //     return (padding + n).slice(-width);
//     // };
//
//     render() {
//         const {status, runningTime} = this.state;
//
//         return (
//             <div>
//                 <p>{this.getUnits(runningTime)}</p>
//                 <button onClick={this.handleClick}>
//                     {status ? "Stop" : "Start"}
//                 </button>
//                 <button onClick={this.handleReset}>Reset</button>
//                 <button onClick={this.handleLap}>Lap</button>
//             </div>
//         );
//     }
// }

export default Watch;
