import React, { useState } from "react";

const Faq = () => {
  const [search, setSearch] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [aberto, setAberto] = useState(null);

  const perguntas = [
    {
      id: 1,
      pergunta: "Como faço para comprar um ingresso?",
      resposta:
        "Escolha o filme, o horário, selecione a cadeira desejada e finalize o pagamento. O ingresso chega no seu e-mail imediatamente.",
      categoria: "Ingresso",
    },
    {
      id: 2,
      pergunta: "Quais formas de pagamento são aceitas?",
      resposta:
        "Atualmente aceitamos cartão de crédito, débito, PIX e carteiras digitais como Google Pay e Apple Pay.",
      categoria: "Pagamento",
    },
    {
      id: 3,
      pergunta: "Posso cancelar ou alterar meu ingresso?",
      resposta:
        "Ingressos podem ser cancelados até 1 hora antes da sessão. Alterações dependem de disponibilidade da sala.",
      categoria: "Ingresso",
    },
    {
      id: 4,
      pergunta: "Como recebo meu ingresso após a compra?",
      resposta:
        "Você receberá o ingresso por e-mail e também poderá acessá-lo na aba 'Meus Ingressos' dentro do site.",
      categoria: "Conta",
    },
    {
      id: 5,
      pergunta: "Meu pagamento não foi aprovado. O que fazer?",
      resposta:
        "Tente usar outro método de pagamento. Se continuar, entre em contato com nosso suporte.",
      categoria: "Pagamento",
    },
    {
      id: 6,
      pergunta: "A meia-entrada é aplicada automaticamente?",
      resposta:
        "Sim! Basta selecionar a opção de meia-entrada e apresentar o documento necessário na entrada.",
      categoria: "Regras",
    },
  ];

  const categorias = ["Todas", "Ingresso", "Pagamento", "Conta", "Regras"];

  const filtradas = perguntas.filter((p) => {
    const correspondeCategoria =
      categoriaFiltro === "Todas" || p.categoria === categoriaFiltro;

    const correspondeBusca = p.pergunta
      .toLowerCase()
      .includes(search.toLowerCase());

    return correspondeCategoria && correspondeBusca;
  });

  const toggle = (id) => {
    setAberto(aberto === id ? null : id);
  };

  return (
    <div className="container">

      {/* Botão Voltar */}
      <button className="btnVoltar" onClick={() => window.history.back()}>
        Voltar
      </button>

      <h1>Central de Ajuda — Perguntas Frequentes</h1>
      <p className="lead">Tire dúvidas sobre ingressos, pagamentos e mais.</p>

      {/* Controles */}
      <div className="controls">
        <input
          type="search"
          placeholder="Pesquise uma pergunta..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setCategoriaFiltro(e.target.value)}>
          {categorias.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="faqGrid">

        {/* Lista */}
        <div className="list">
          {filtradas.length === 0 && (
            <p className="noResults">Nenhuma pergunta encontrada.</p>
          )}

          <div className="accordion">
            {filtradas.map((item) => (
              <div
                key={item.id}
                className={`item ${aberto === item.id ? "open" : ""}`}
              >
                <button className="trigger" onClick={() => toggle(item.id)}>
                  <span>
                    <span className="question">{item.pergunta}</span>
                    <div className="meta">Categoria: {item.categoria}</div>
                  </span>
                  <span className="chev">▶</span>
                </button>

                <div className="panel">{item.resposta}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="card">
            <h3>Categorias</h3>
            <div className="tags">
              {categorias.map((c) => (
                <button
                  key={c}
                  className={`tag ${categoriaFiltro === c ? "active" : ""}`}
                  onClick={() => setCategoriaFiltro(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="footer">
        Ainda com dúvidas?{" "}
        <a className="link" href="#">
          Fale com o suporte.
        </a>
      </div>

      {/* 🎨 ESTILO CINEMA02 */}
      <style jsx>{`
        :root {
          --yellow: #ffd600;
          --yellow-dark: #e6c200;
          --red: #ff3b1f;
          --bg: #000;
          --card: #111;
          --text-muted: #c9c9c9;
        }

        .container {
          max-width: 980px;
          margin: 32px auto;
          padding: 30px;
          background: #000;
          min-height: 100vh;
          color: white;
          font-family: Inter, sans-serif;
        }

        .btnVoltar {
          background: var(--yellow);
          border: none;
          padding: 10px 20px;
          font-weight: 700;
          border-radius: 8px;
          cursor: pointer;
          color: black;
          margin-bottom: 20px;
          transition: 0.2s;
        }
        .btnVoltar:hover {
          background: var(--yellow-dark);
        }

        h1 {
          font-size: 2rem;
          font-weight: 800;
          color: var(--yellow);
        }

        .lead {
          margin-top: 6px;
          color: var(--text-muted);
        }

        .controls {
          display: flex;
          gap: 14px;
          margin: 25px 0;
          flex-wrap: wrap;
        }

        input[type="search"],
        select {
          padding: 12px;
          border-radius: 10px;
          background: #111;
          border: 1px solid #333;
          color: white;
          width: 100%;
        }

        select {
          max-width: 250px;
        }

        .faqGrid {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 22px;
        }

        @media (max-width: 900px) {
          .faqGrid {
            grid-template-columns: 1fr;
          }
        }

        .list {
          background: #111;
          padding: 20px;
          border-radius: 10px;
          border: 1px solid #333;
        }

        .item {
          border-bottom: 1px solid #333;
        }

        .trigger {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding: 16px;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          text-align: left;
        }

        .question {
          color: var(--yellow);
          font-weight: 700;
        }

        .meta {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .chev {
          transition: 0.3s;
        }

        .item.open .chev {
          transform: rotate(90deg);
        }

        .panel {
          max-height: 0;
          overflow: hidden;
          padding: 0 16px;
          color: #ddd;
          transition: 0.3s ease;
        }

        .item.open .panel {
          max-height: 200px;
          padding-bottom: 14px;
        }

        .sidebar .card {
          background: #111;
          border: 1px solid #333;
          padding: 16px;
          border-radius: 10px;
        }

        .tags {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .tag {
          background: #222;
          color: white;
          padding: 8px 14px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
        }

        .tag.active {
          background: linear-gradient(90deg, var(--yellow), var(--red));
          color: black;
          font-weight: 700;
        }

        .footer {
          margin-top: 25px;
          color: var(--text-muted);
        }

        .link {
          color: var(--yellow);
          text-decoration: none;
          font-weight: 600;
        }

        .noResults {
          padding: 12px;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};

export default Faq;
