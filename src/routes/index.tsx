import { Button } from "@mui/material";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAppThemeContext } from "../shared/contexts";
import { useContext } from "react";

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();

  return (
    <Routes>
      <Route
        path="/pagina-inicial"
        element={
          <Button variant="contained" color="primary" onClick={toggleTheme}>
            Teste
          </Button>
        }
      />

      <Route path="*" element={<Navigate to={"/pagina-inicial"} />} />
      <Route path="/outra-rota" element={<h1>Outra Rota</h1>} />
    </Routes>
  );
};
