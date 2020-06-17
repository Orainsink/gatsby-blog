import { createStore as reduxCreateStore } from "redux"

const reducer = (state, action) => {
  switch(action.type){
    case 'SCENE': {
        if (!action.payload && typeof window !== 'undefined') {
          window.sessionStorage.setItem('skipscene', '1');
        }
        return { ...state, scene: action.payload };
      }
      case 'TRIGGER': {
        return { ...state, trigger: action.payload };
      }
      case 'SLIDING': {
        return { ...state, sliding: action.payload };
      }
  }
  return state
}

const initialState = { count: 0 }

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore;