import { number } from "yup";
import { Action } from "../../types/action";

const initialState = {
    isEditForm: false,
    data: {},
};

const reducer = (state = initialState, action: Action) => {

  switch (action.type) {
    case "SHOW_EDITFROM":
      return {
        ...state,
        data: { ...action.payload },
        isEditForm: true,
      };
    case "HIDE_EDITFROM":
      return {
        ...state,
        isEditForm: false,
      };
    default:
      return state;
  }
};

export default reducer;
