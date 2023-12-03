const asyncInterval = async () => {
    const diffArray = [];
    let prevTime = 0;
    let run = true;

    setTimeout(() => {
        run = false;
    }, 240_000);

    while (run) {
        const newTime = performance.now();
        const diff = newTime - prevTime;
        if(prevTime) {
          diffArray.push(diff);
        };
        prevTime = newTime;
        await new Promise((resolve) => setTimeout(() => resolve(), 3))
    }

    const results = diffArray.reduce((accum, curr) => {
        accum.sum += curr;
        if(curr > accum.high) accum.high = curr;
        if(curr < accum.low) accum.low = curr;
        return accum;
      }, {sum: 0, high: 0, low: Infinity})
      results.average = results.sum / diffArray.length;
      console.log('AsyncWorker', results);
}


let running = false;
onmessage = (e) => {
    if(!running) {
        running = true;
        asyncInterval();
    }
}