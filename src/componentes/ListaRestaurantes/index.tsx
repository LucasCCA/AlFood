import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { IPaginacao } from "../../interfaces/IPaginacao";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");
  const [paginaAnterior, setpaginaAnterior] = useState("");
  const [ordenar, setOrdenar] = useState("nenhum");
  const [pesquisar, setPesquisar] = useState("");

  useEffect(() => {
    CarregarDados("http://localhost:8000/api/v1/restaurantes/");
  }, [ordenar, pesquisar]);

  const CarregarDados = (url: string) => {
    axios
      .get<IPaginacao<IRestaurante>>(url, {
        params: {
          search: pesquisar,
          ordering: ordenar !== "nenhum" && ordenar,
        },
      })
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setpaginaAnterior(resposta.data.previous);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <TextField
        sx={{ marginRight: "10px" }}
        margin="dense"
        label="Pesquisar"
        variant="outlined"
        onChange={(evento) => setPesquisar(evento.target.value)}
      />
      <FormControl margin="dense">
        <Select
          value={ordenar}
          onChange={(evento) => setOrdenar(evento.target.value)}
          fullWidth
          sx={{ width: "210px" }}
        >
          <MenuItem value={"nenhum"} selected>
            Nenhum filtro
          </MenuItem>
          <MenuItem value={"nome"}>Nome</MenuItem>
          <MenuItem value={"id"}>Id</MenuItem>
        </Select>
      </FormControl>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {paginaAnterior && (
        <button onClick={() => CarregarDados(paginaAnterior)}>
          Pagina anterior
        </button>
      )}
      {proximaPagina && (
        <button onClick={() => CarregarDados(proximaPagina)}>
          Proxima pagina
        </button>
      )}
    </section>
  );
};

export default ListaRestaurantes;
