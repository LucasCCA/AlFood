import { Button, TableContainer } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { http } from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http.get("restaurantes/").then((resposta) => {
      setRestaurantes(resposta.data);
    });
  });

  const excluir = (restauranteASerExcluido: IRestaurante) => {
    http.delete(`restaurantes/${restauranteASerExcluido.id}/`).then(() => {
      const listaRestaurante = restaurantes.filter(
        (restaurante) => restaurante.id !== restauranteASerExcluido.id
      );
      setRestaurantes([...listaRestaurante]);
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((restaurante) => (
            <TableRow key={restaurante.id}>
              <TableCell>{restaurante.nome}</TableCell>
              <TableCell>
                [{" "}
                <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link>{" "}
                ]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(restaurante)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoRestaurantes;
