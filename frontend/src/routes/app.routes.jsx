import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { AddCellphone } from '../pages/AddCellphone';
import { Cellphone } from '../pages/Cellphone';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/add-cellphone" element={<AddCellphone />} />
      <Route path="/cellphone/:id" element={<Cellphone />} />
    </Routes>
  );
}
