import { createStore as reduxCreateStore } from 'redux';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SCENE': {
      return { ...state, scene: action.payload };
    }
    case 'TRIGGER': {
      return { ...state, trigger: action.payload };
    }
    case 'SLIDING': {
      return { ...state, sliding: action.payload };
    }
  }
  return state;
};

const initialState = {
  scene: true,
  trigger: false,
  sliding: false,
};
const createStore = () =>
  reduxCreateStore(
    reducer,
    initialState,
    // @ts-ignore
    window?.__REDUX_DEVTOOLS_EXTENSION__ &&
      // @ts-ignore
      window?.__REDUX_DEVTOOLS_EXTENSION__()
  );
export default createStore;
