import { createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { Navbar } from "./components/Navbar";
import CreatePost from "./pages/CreatePost";
import SavedBlogs from "./pages/SavedBlogs";
import { Toaster } from "sonner";
import MyBlogs from "./pages/MyBlogs";
import EditPost from "./pages/EditPost";

export const Appcontext = createContext(null);
function App() {
  return (
    <>
      <div>
        <Toaster richColors />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/saved-blogs" element={<SavedBlogs />} />
            <Route path="/my-blogs" element={<MyBlogs />} />
            <Route path="/edit-post/:blogId" element={<EditPost />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
