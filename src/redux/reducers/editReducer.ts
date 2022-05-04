import { Action } from "../../types/action";

const initialState = {
    editForm: false,
};

const reducer = (state = initialState, action: Action) => {

  switch (action.type) {
    case "SHOW_EDITFROM":
      return {
        ...state,
        editForm: true,
      };
    case "HIDE_EDITFROM":
      return {
        ...state,
        editForm: false,
      };
    default:
      return state;
  }
};

export default reducer;
