const initialState = {
  isLoading: false,
};

export const LoadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DISPLAY_LOAD":
      state.isLoading = true;
      return { ...state };
    case "HIDE_LOAD":
      state.isLoading = false;
      return { ...state };
    default:
      return { ...state };
  }
};
