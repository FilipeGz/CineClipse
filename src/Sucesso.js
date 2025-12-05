import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Pagamento.css";

const Sucesso = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/home"), 3000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div>
      <h1>Pagamento realizado com sucesso!</h1>
      <p>Redirecionando para a página inicial...</p>
    </div>
  );
};

export default Sucesso;
