import logo from './logo.svg';
import './App.css';
import { useEffect, useMemo } from 'react';

const intervalMainThread = () => {
  let prevTime = 0;
  const diffArray = [];
  const interval = setInterval(() => {
    const newTime = performance.now();
    const diff = newTime - prevTime;
    if(prevTime) {
      diffArray.push(diff);
    };
    prevTime = newTime;
  }, 2);

  setTimeout(() => {
    clearInterval(interval)
    const results = diffArray.reduce((accum, curr) => {
      accum.sum += curr;
      if(curr > accum.high) accum.high = curr;
      if(curr < accum.low) accum.low = curr;
      return accum;
    }, {sum: 0, high: 0, low: Infinity})
    results.average = results.sum / diffArray.length;
    console.log(results);
  }, 30_000)
}

intervalMainThread();

// const myWorker = new Worker("./IntervalWorker.js");

// myWorker.postMessage([1, 2]);
// console.log("Message posted to worker");



function App() {
  const worker = useMemo(() => new Worker(new URL("./Workers/AsyncWorker", import.meta.url)), [])

  useEffect(() => {
    if (window.Worker) {
      worker.postMessage('run');
    }
  }, [worker]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Interval Testing App
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Running a function on an small interval is tricky business in JS since the event loop is single threaded
          and timers can drift. This app is to test the accuracy and percision of running an 'interval' in a worker thread
        </a>
      </header>
    </div>
  );
}

export default App;
