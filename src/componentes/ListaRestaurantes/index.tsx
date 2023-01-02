import { TextField } from "@mui/material";
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

  useEffect(() => {
    CarregarDados("http://localhost:8000/api/v1/restaurantes/");
  }, []);

  const CarregarDados = (url: string, busca?: string) => {
    axios
      .get<IPaginacao<IRestaurante>>(url, {
        params: {
          search: busca,
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
        label="Pesquisar"
        variant="outlined"
        onChange={(evento) =>
          CarregarDados(
            "http://localhost:8000/api/v1/restaurantes/",
            evento.target.value
          )
        }
      />
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
