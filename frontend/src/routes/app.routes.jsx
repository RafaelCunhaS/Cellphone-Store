import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { AddCellphone } from '../pages/AddCellphone';
import { Cellphone } from '../pages/Cellphone';
import { AddMultipleCellphones } from '../pages/AddMultipleCellphones';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/cellphones/add" element={<AddCellphone />} />
      <Route path="/cellphones/add-multiple" element={<AddMultipleCellphones />} />
      <Route path="/cellphone/:id" element={<Cellphone />} />
    </Routes>
  );
}
