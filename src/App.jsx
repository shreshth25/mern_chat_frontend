import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import './App.css'
import {
  AIChat,
  Attendance,
  Holiday,
  Layout,
  Login,
  Register,
  Logout,
  Page400,
  PrivateRoute,
  Profile,
  Progress,
  Users,
  Upload,
  Chat,
  PrivateChat,
} from "./pages/index";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute element={<Layout />} />}>
          <Route path="holiday" element={<Holiday />} />
          <Route path="logout" element={<Logout />} />
          <Route path="aichat" element={<AIChat />} />
          <Route path="users" element={<Users />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="progress" element={<Progress />} />
          <Route path="profile" element={<Profile />} />
          <Route path="upload" element={<Upload />} />
          <Route path="chat" element={<Chat />} />
          <Route path="privatechat" element={<PrivateChat />} />
          
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page400 />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
