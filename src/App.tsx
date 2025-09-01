import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import UserProfiles from "./pages/UserProfiles";
import { ProtectedRoute } from './components/middleware/protectedRoute';
import { PublicRoute } from './components/middleware/PublicRoute';
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import DataUser from "./pages/DataUser/DataUser";
import ListRole from "./pages/HakAkses/ListRole";
import Perangkat from "./pages/Perangkat/Perangkat";
import DaftarKategori from "./pages/Pesan/DaftarKategori";
import DaftarGroup from "./pages/Pesan/DaftarGroup";
import DaftarKontak from "./pages/Pesan/DaftarKontak";
import DaftarPesan from "./pages/Pesan/DaftarPesan";
import BalasOtomatis from "./pages/Pesan/BalasOtomatis";
import JadwalPesan from "./pages/Pesan/JadwalPesan";
import KirimPesan from "./pages/Pesan/KirimPesan";


export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route index path="/" element={<PublicRoute><SignIn /></PublicRoute>} />
          <Route element={<AppLayout />}>

            {/* dashboard */}
            <Route index path="/dashboard" element={<ProtectedRoute role={["admin", "member"]}>
              <Home />
            </ProtectedRoute>} />


            {/* Data User Page */}
            <Route index path="/data-user" element={<ProtectedRoute role={["admin"]}>
              <DataUser />
            </ProtectedRoute>
            } />

            {/* List Role Page */}
            <Route index path="/list-role" element={<ProtectedRoute role={["admin"]}>
              <ListRole />
            </ProtectedRoute>} />


            {/* Data User Page */}
            <Route index path="/Perangkat" element={<ProtectedRoute role={["admin", "member"]}>
              <Perangkat />
            </ProtectedRoute>} />


            {/* Data User Page */}
            <Route index path="/daftar-kategori" element={<ProtectedRoute role={["admin", "member"]}>
              <DaftarKategori />
            </ProtectedRoute>} />


            {/* Data User Page */}
            <Route index path="/daftar-group" element={<ProtectedRoute role={["admin", "member"]}>
              <DaftarGroup />
            </ProtectedRoute>} />


            {/* Data User Page */}
            <Route index path="/daftar-kontak" element={<ProtectedRoute role={["admin", "member"]}>
              <DaftarKontak />
            </ProtectedRoute>} />


            {/* Data User Page */}
            <Route index path="/daftar-pesan" element={<ProtectedRoute role={["admin", "member"]}>
              <DaftarPesan />
            </ProtectedRoute>} />


            {/* Data User Page */}
            <Route index path="/balas-otomatis" element={<ProtectedRoute role={["admin", "member"]}>
              <BalasOtomatis />
            </ProtectedRoute>} />


            {/* Data User Page */}
            <Route index path="/jadwal-pesan" element={<ProtectedRoute role={["admin", "member"]}>
              <JadwalPesan />
            </ProtectedRoute>} />


            {/* Data User Page */}
            <Route index path="/kirim-pesan" element={<ProtectedRoute role={["admin", "member"]}>
              <KirimPesan />
            </ProtectedRoute>} />


            {/* Data User Page */}
            <Route index path="/data-user" element={<ProtectedRoute role={["admin", "member"]}>
              <DataUser />
            </ProtectedRoute>} />


            {/* Others Page */}
            <Route path="/profile" element={<ProtectedRoute role={["admin", "member"]}>
              <UserProfiles />
            </ProtectedRoute>} />


          </Route>
        </Routes>
      </Router>
    </>
  );
}
