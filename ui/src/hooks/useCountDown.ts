import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import throttle from 'lodash/throttle';

const useCountDown = () => {
  const [timer, setTimer] = React.useState<number | undefined>(undefined);

  const [time, setTime] = React.useState(timer || 0);

  const convertSeconds = () => {
    setTime(value => {
      const countdown = cloneDeep(value) - 1;
      return countdown >= 0 ? countdown : 0;
    });
  };

  const updateTime = (time: number | undefined) => {
    setTimer(time);
    setTime(time || 0);
  };

  const throttleConvertSeconds = throttle(convertSeconds, 1000);

  React.useEffect(() => {
    if (timer === undefined) return;
    const interval = setInterval(throttleConvertSeconds, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return { counter: time, updateTime };
};

export default useCountDown;
