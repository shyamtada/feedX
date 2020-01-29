export default function reducer(state = [], action) {
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
      // case 'ADD_COMMENT':
      // return [
      //   ...state,
      //   {
      //     id: action.id,
      //     text: action.text
      //   }
      // ]
      default:
        return state;
    }
    
  }
  