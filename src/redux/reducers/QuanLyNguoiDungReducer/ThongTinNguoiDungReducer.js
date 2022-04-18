import { TOKEN } from "../../../util/config";

let userLocal = {};
if (localStorage.getItem("USER_LOCAL")) {
  userLocal = JSON.parse(localStorage.getItem("USER_LOCAL"));
}

const initialState = {
  thongTinNguoiDung: userLocal,
};

export const ThongTinNguoiDungReducer = (state = initialState, action) => {
  switch (action.type) {
    case "THONG_TIN_NGUOI_DUNG":
      state.thongTinNguoiDung = action.thongTinNguoiDung;
      localStorage.setItem(
        "USER_LOCAL",
        JSON.stringify(action.thongTinNguoiDung)
      );
      localStorage.setItem(TOKEN, action.thongTinNguoiDung.accessToken);

      return { ...state };
    case "DANG_XUAT":
      state.thongTinNguoiDung = null;
      return { ...state };

    default:
      return { ...state };
  }
};
