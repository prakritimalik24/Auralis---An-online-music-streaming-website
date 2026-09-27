import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import NetworkError from "./pages/NetworkError";
import AuthContext from "./context/AuthContext";

import Login from "./pages/Login";
import Landing from "./Landing/Landing";
import Register from "./pages/Register";
import RegisterArtist from "./pages/RegisterArtist";
import UserHome from "./User/UserHome";
import ArtistHome from "./Artist/ArtistHome";
import Fav from "./User/Fav";
import Uploadalbum from "./Artist/Uploadalbum";
import Uploadmusic from "./Artist/Uploadmusic";
import Playlistpage from "./User/Playlistspage";
import MusicPlayer from "./components/MusicPlayer";
import NotFound from "./pages/NotFound";


function ProtectedRoute({ children, role }) {

  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 bg-linear-to-br from-neutral-900 via-neutral-950 to-black transition-opacity duration-1000`}
      >

        <h1 className="font-bold text-8xl text-transparent bg-clip-text bg-linear-to-r to-mauve-600 via-mauve-500 from-mauve-300">
          Auralis
        </h1>

        <p className="text-2xl font-bold bg-linear-to-r bg-clip-text text-transparent to-mauve-700 via-mauve-600 from-mauve-500">
          A Space for Creating and Listening
        </p>

      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {

    if (user.role === "user") {
      return <Navigate to="/login" replace />;
    }

    if (user.role === "artist") {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}


function Appcontent() {

  const location = useLocation();

  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {

    const handleNetworkError = () => {
      setNetworkError(true);
    };

    window.addEventListener("network-error", handleNetworkError);

    return () => {
      window.removeEventListener("network-error", handleNetworkError);
    };

  }, []);

  const showPlayer =
    location.pathname === "/home/user" ||
    location.pathname === "/home/artist" ||
    location.pathname === "/favorites" ||
    location.pathname === "/playlists";

  return (
    <>
      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/register/artist" element={<RegisterArtist />} />


        {/* User Routes */}

        <Route
          path="/home/user"
          element={
            <ProtectedRoute role="user">
              <UserHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute role="user">
              <Fav />
            </ProtectedRoute>
          }
        />

        <Route
          path="/playlists"
          element={
            <ProtectedRoute role="user">
              <Playlistpage />
            </ProtectedRoute>
          }
        />


        {/* Artist Routes */}

        <Route
          path="/home/artist"
          element={
            <ProtectedRoute role="artist">
              <ArtistHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload/music"
          element={
            <ProtectedRoute role="artist">
              <Uploadmusic />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload/album"
          element={
            <ProtectedRoute role="artist">
              <Uploadalbum />
            </ProtectedRoute>
          }
        />


        {/* 404 */}

        <Route path="*" element={<NotFound />} />

      </Routes>

      {showPlayer && <MusicPlayer />}
      {networkError && <NetworkError/>}
    </>
  );
}


export default Appcontent;