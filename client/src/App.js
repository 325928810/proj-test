import "./App.css";
import Login from "./auth/Login";
import Home from "./common/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./auth/register";
import CourseList from "./courses/coursesList";
import Logo from "./common/logo";
import Basket from "./orders/basket";
import LoginToEnterCourses from "./auth/LoginToEnterCourses";
import EditKategories from "./manager/kategory/editKategories";
import EditLecturers from "./manager/lecturer/editLecturers";
import EditUsers from "./manager/user/editUserd";
import SeverityDemo from "./stam/b";
import ActiveCourseList from "./courses/activeCoursesList";
import EditCourses from "./manager/course/editCourses";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Logo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/LoginToEnterCourses" element={<LoginToEnterCourses />} />
            <Route path="/register" element={<Register />} />
            <Route path="/course" element={<CourseList />} />
            <Route path="/activeCourses" element={<ActiveCourseList/>} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/kategories" element={<EditKategories/>} />
            <Route path="/lecturers" element={<EditLecturers/>} />
            <Route path="/users" element={<EditUsers/>} />
            <Route path="/mCourses" element={<EditCourses/>} />
            {/* <Route path="/b" element={<SeverityDemo/>} /> */}

            {/* <Route path="/Posts" element={<PostsList />} />
            <Route path="/Photos" element={<PhotosList />} />
            <Route path="/Users" element={<UsersList />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
