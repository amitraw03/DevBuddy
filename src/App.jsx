// App.js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Components/Body";
import Feed from "./Components/Feed";
import Profile from "./Components/Profile";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";
import LoginSignup from "./Components/LoginSignup";
import PrivateRoute from "./Components/PrivateRoute";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Premium from "./Components/Premium";
import Chats from "./Components/Chats";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          {/* Body is a parent route with child routes rendered via <Outlet> */}
          <Route path="/" element={<Body />}>
            {/* Public Home Feed route */}
            <Route path="/" element={<Feed />} />
            {/* Public LoginSignup route */}
            <Route path="/login" element={<LoginSignup />} />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/connections"
              element={
                <PrivateRoute>
                  <Connections />
                </PrivateRoute>
              }
            />
            <Route
              path="/requests"
              element={
                <PrivateRoute>
                  <Requests />
                </PrivateRoute>
              }
            />
            <Route
              path="/premium"
              element={
                <PrivateRoute>
                  <Premium />
                </PrivateRoute>
              }
            />
            <Route
              path="/chat/:targetId"
              element={
                <PrivateRoute>
                  <Chats/>
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
