import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext";
import { NavProvider } from "./context/NavContext";

import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import Profile from "./pages/MyPost/Profile";
import FeaturedPost from "./pages/FeaturedPosts/FeaturedPost";
import AllPost from "./pages/AllPost/AllPost";
import OnePost from "./pages/OnePost/OnePost";
import CreatePost from "./pages/CreatePost/CreatePost";
import EditPost from "./pages/CreatePost/EditPost";
import AboutPage from "./pages/AboutPage";
import AboutPriv from './pages/AboutPriv'
import AboutTerms from './pages/AboutTerms'
import AboutLinks from "./components/AboutLinks";

function App() {
  return (
    <NavProvider>
      <PostProvider>
        <AuthProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/add-post" element={<CreatePost />} />
              <Route path="/edit-post/:id" element={<EditPost />} />
              <Route path="/featured-posts" element={<FeaturedPost />} />
              <Route path="/all-post" element={<AllPost />} />
              <Route path="post/:id" element={<OnePost />} />
              <Route path="/about-page/content" element={<AboutPage />} />
              <Route path="/about-page/priv" element={<AboutPriv />} />
              <Route path="/about-page/terminos" element={<AboutTerms />} />
              <Route path="/about-page" element={<AboutLinks />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </PostProvider>
    </NavProvider>
  );
}

export default App;
