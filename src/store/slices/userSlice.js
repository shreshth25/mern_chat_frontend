import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAPI, postAPI } from "../../helpers/apis";
const storedUser = JSON.parse(localStorage.getItem("manaze_user"));

export const loginUser = createAsyncThunk("user/login", async (userData) => {
  let login_response = {
    token: null,
    user: null,
  };
  try {
    const data = await postAPI("auth/login", userData);
    login_response = {
      token: data.token,
      user: data.user,
      message: data.message,
      status: data.status,
    };
    if (data.status) {
      const json_token = { token: data.token, user: data.user };
      localStorage.setItem("manaze_user", JSON.stringify(json_token));
    }
    return login_response;
  } catch (e) {
    return login_response;
  }
});

export const updateUser = createAsyncThunk("user/updateUser", async () => {
  try {
    const token_data =  JSON.parse(localStorage.getItem("manaze_user"));
    const data = await getAPI("auth",token_data.token);
    const json_token = { token: token_data.token, user: data.user };
    localStorage.setItem("manaze_user", JSON.stringify(json_token));
    return data.user;
  } catch (e) {
    return "";
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: storedUser ? storedUser.user : null,
    token: storedUser ? storedUser.token : null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.token = null;
        state.user = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
