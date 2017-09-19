// React
import React from 'react';

export const waitFor = (props, component) => {
  let waitForProps = props;

  if (!Array.isArray(waitForProps)) {
    waitForProps = [waitForProps];
  }

  return (props) => {
    let ready = [];

    for (let waitForProp of waitForProps) {
      if (props.hasOwnProperty(waitForProp)) {
        if (props[waitForProp]) {
          ready.push(true);
        } else {
          ready.push(false);
        }
      } else {
        ready.push(false);
      }
    }

    if (ready.indexOf(false) < 0) {
      return React.createElement(component, props);
    }

    return null;
  }
};

export default waitFor;