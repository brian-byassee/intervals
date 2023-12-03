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
    }, 5);
  
    setTimeout(() => {
      clearInterval(interval)
      const results = diffArray.reduce((accum, curr) => {
        accum.sum += curr;
        if(curr > accum.high) accum.high = curr;
        if(curr < accum.low) accum.low = curr;
        return accum;
      }, {sum: 0, high: 0, low: Infinity})
      results.average = results.sum / diffArray.length;
      console.log('IntervalWorker', results);
    }, 120_000)
  }

let running = false;
onmessage = (e) => {
    if(!running) {
        console.log(e)
        running = true;
        intervalMainThread();
    }
    postMessage('return message');
  };

  export {}