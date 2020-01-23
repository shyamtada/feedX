export default function reducer(state = [], action) {
    console.log("abcd");
  
    switch (action.type) {
      case "RECEIVED_DATA":
        return [
          ...state,
          {
            posts: action.json
          }
        ];
      case "GET_DATA":
        return state;
      default:
        return state;
    }
  }
  