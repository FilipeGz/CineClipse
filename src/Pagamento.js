import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Pagamento.css";

const Pagamento = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Recupera parâmetros enviados pela URL
  const params = new URLSearchParams(location.search);
  const filmeId = params.get("filmeId");
  const shopping = params.get("shopping");
  const horario = params.get("horario");
  const cadeira = params.get("cadeira");

  const [ingresso, setIngresso] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [valorFinal, setValorFinal] = useState(0);
  const [detalhesFilme, setDetalhesFilme] = useState(null);

  // Carrega o nome do filme pela API do TMDB
  useEffect(() => {
    async function fetchFilme() {
      try {
        const req = await fetch(
          `https://api.themoviedb.org/3/movie/${filmeId}?api_key=03e81f84616e91119defeb48cf87d32b&language=pt-BR`
        );
        const data = await req.json();
        setDetalhesFilme(data);
      } catch (err) {
        console.error("Erro ao carregar filme", err);
      }
    }

    fetchFilme();
  }, [filmeId]);

  // Atualiza o preço do ingresso
  useEffect(() => {
    if (ingresso === "meia") setValorFinal(20);
    else if (ingresso === "inteira") setValorFinal(30);
    else setValorFinal(0);
  }, [ingresso]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!ingresso || !pagamento) {
      alert("Preencha todos os campos antes de continuar!");
      return;
    }

    navigate("/sucesso");
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div className="pagamento-container">
      <h1>Pagamento</h1>

      {/* Resumo da Compra */}
      <div className="resumo-compra">
        <h2>Resumo da Compra</h2>

        <p><b>Filme:</b> {detalhesFilme ? detalhesFilme.title : "Carregando..."}</p>
        <p><b>Shopping:</b> {shopping}</p>
        <p><b>Horário:</b> {horario}</p>
        <p><b>Cadeira Selecionada:</b> {cadeira}</p>

        {ingresso && (
          <p><b>Tipo de Ingresso:</b> {ingresso === "meia" ? "Meia (R$20)" : "Inteira (R$30)"}</p>
        )}

        {valorFinal > 0 && (
          <p><b>Valor Final:</b> R$ {valorFinal},00</p>
        )}
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="pagamento-form">

        <label>
          Tipo de Ingresso:
          <select value={ingresso} onChange={(e) => setIngresso(e.target.value)}>
            <option value="">Selecione</option>
            <option value="meia">Meia — R$20</option>
            <option value="inteira">Inteira — R$30</option>
          </select>
        </label>

        <label>
          Método de Pagamento:
          <select value={pagamento} onChange={(e) => setPagamento(e.target.value)}>
            <option value="">Selecione</option>
            <option value="pix">Pix</option>
            <option value="debito">Débito</option>
            <option value="credito">Crédito</option>
          </select>
        </label>

        <div className="pagamento-buttons">
          <button type="submit" className="btn-pagar">
            Pagar
          </button>

          <button type="button" onClick={handleCancel} className="btn-cancelar">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Pagamento;
