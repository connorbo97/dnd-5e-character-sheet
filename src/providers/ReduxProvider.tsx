import { useMemo } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { reducers } from './ReduxProvider/reduxReducers';

export const ReduxProvider = (props) => {
  const store = useMemo(() => {
    return configureStore(reducers);
  }, []);

  return <Provider store={store} {...props} />;
};
