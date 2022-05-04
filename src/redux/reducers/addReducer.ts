import { Action } from "../../types/action";

const initialState = {
    addForm: false,
};

const reducer = (state = initialState, action: Action) => {

  switch (action.type) {
    case "SHOW_ADDFROM":
      return {
        ...state,
        addForm: true,
      };
    case "HIDE_ADDFROM":
      return {
        ...state,
        addForm: false,
      };
    default:
      return state;
  }
};

export default reducer;
