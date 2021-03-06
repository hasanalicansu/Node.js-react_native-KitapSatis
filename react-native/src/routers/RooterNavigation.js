import React from 'react';
import {StackActions} from '@react-navigation/native';
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function push(name) {
  navigationRef.current?.dispatch(StackActions.push(name));
}

export function pop() {
  navigationRef.current?.dispatch(StackActions.pop());
}

export function reset(name) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: name}],
  });
}
