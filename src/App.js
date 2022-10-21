/*
  Coding with Fatih Delice
  GitHub: https://github.com/fatihdelice
  Twitter: https://twitter.com/fatihdelicejs
*/

import "./assets/css/style.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./views/Home";
import Page404 from "./views/404";
import AdminLogin from "./views/admin/AdminLogin";
import AdminPanel from "./views/admin/AdminPanel";
import UpdateProfile from "./views/admin/UpdateProfile";
import CreateBlog from "./views/admin/CreateBlog";
import AdminLayout from "./views/admin";
import BlogLayout from "./views/blog";
import Blog from "./views/blog/Blog";
import Post from "./views/blog/Post";
import Modal from "./components/Modal";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import UpdateBlog from "./views/admin/UpdateBlog";
import Footer from "./components/Footer";

function App() {

  const { user } = useSelector(state => state.auth)
  const { open, data } = useSelector(state => state.modal)

  return (
    <>
      <Toaster position="top-center" />
      <div className="app_feature">
        <Sidebar />
        {open && <Modal name={open} data={data} />}
        <main className="app_inner">
          <div className="app_content">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/admin" element={<AdminLogin />} />
              {user && <Route exact path="/admin-panel" element={<AdminLayout />} >
                <Route index={true} element={<AdminPanel />} />
                <Route path="profile" element={<UpdateProfile />} />
                <Route path="create-blog" element={<CreateBlog />} />
                <Route path="update-blog" element={<UpdateBlog />} />
                <Route path="*" element={<Page404 />} />
              </Route>}
              <Route exact path="/blog" element={<BlogLayout />} >
                <Route index={true} element={<Blog />} />
                <Route path="/blog/:url" element={<Post />} />
                <Route path="*" element={<Page404 />} />
              </Route>

              <Route path="*" element={<Page404 />} />
            </Routes>
            {!user &&<Footer/>}
          </div>
        </main>
        {!user && <Rightbar />}
      </div>
    </>
  );
}

export default App;
