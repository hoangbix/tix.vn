const initialState = {
  chuyenHuong: "",
};

export const ChuyenHuongReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHUYEN_HUONG":
      state.chuyenHuong = "right-panel-active";
      return { ...state };
    case "CHUYEN_HUONG_NULL":
      state.chuyenHuong = "";
      return { ...state };
    default:
      return { ...state };
  }
};
