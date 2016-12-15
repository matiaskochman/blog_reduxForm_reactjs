import {FETCH_POSTS,FETCH_POST} from '../actions/index';

const INITIAL_STATE = {all:[],post:null};

export default function (state = INITIAL_STATE,action){


  switch (action.type) {
    case FETCH_POST:
    return {...state,post:action.payload.data};

    break;
    
    case FETCH_POSTS:
      // new object , take whatever current state is
      // and add to all property the blogposts fetched in
      // action.payload.data
      console.log("reducer FETCH_POSTS");
      console.log("action.payload.data: "+action.payload.data);
      return {...state,all:action.payload.data}
      break;
    default:
      return state;
  }
}
