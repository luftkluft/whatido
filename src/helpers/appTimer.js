export const appTimer = (function () {
  let counter = 0;
  let timeOff = 0;
  return {
    startTimer: function (intervalTime = 1000, offTime = 86400000) {
      // 86400000 = 1d
      console.log('timer start');
      timeOff = offTime;
      const timerId = setInterval(() => {
        console.log('counter= ' + counter);
        counter += 1;
        if (counter >= timeOff) {
          // alert('stopAppTimer');
          clearInterval(timerId);
        }
      }, intervalTime);
    },
    returnCount: function () {
      console.log('returnCount= ' + counter);
      return counter;
    },
    resetTimer: function () {
      counter = 0;
    },
    stopTimer: function () {
      timeOff = 0;
    }
  };
}());
