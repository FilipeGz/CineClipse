import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "./services/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const ROWS = 5;
const COLS = 8;

export default function SelecionarCadeira() {
  const { filmeId, shopping, horario } = useParams();
  const [selecionada, setSelecionada] = useState(null);
  const [ocupadas, setOcupadas] = useState([]);
  const navigate = useNavigate();

  // Buscar cadeiras ocupadas ao abrir a tela
  useEffect(() => {
    async function fetchOcupadas() {
      const q = query(
        collection(db, "reservas"),
        where("filmeId", "==", filmeId),
        where("shopping", "==", decodeURIComponent(shopping)),
        where("horario", "==", horario)
      );
      const snapshot = await getDocs(q);
      setOcupadas(snapshot.docs.map(doc => doc.data().cadeira));
    }
    fetchOcupadas();
  }, [filmeId, shopping, horario]);

  function handleSelecionar(row, col) {
    setSelecionada(`${String.fromCharCode(65 + row)}${col + 1}`);
  }

  async function handleConfirmar() {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      alert("Você precisa estar logado para reservar uma cadeira.");
      return;
    }
    try {
      await addDoc(collection(db, "reservas"), {
        filmeId,
        shopping: decodeURIComponent(shopping),
        horario,
        cadeira: selecionada,
        uid,
        criadoEm: new Date()
      });
      alert(`Cadeira ${selecionada} reservada com sucesso!`);
      navigate(
  `/pagamento?filmeId=${filmeId}&shopping=${shopping}&horario=${horario}&cadeira=${selecionada}`
);


    } catch (err) {
      alert("Erro ao reservar cadeira.");
    }
  }

  // Para simular corredores, defina colunas de corredor (exemplo: entre 3-4 e 5-6)
  const corredorEsquerda = 3;
  const corredorDireita = 5;

  return (
    <div style={{
      maxWidth: 480,
      margin: "2rem auto",
      background: "#18141c",
      borderRadius: 18,
      padding: 28,
      color: "#fff",
      boxShadow: "0 6px 32px #000a",
      border: "2.5px solid #ffd700"
    }}>
      <h2 style={{ color: "#ffd700", textAlign: "center", marginBottom: 8 }}>Selecione sua cadeira</h2>
      <div style={{ margin: "1.2rem 0", textAlign: "center" }}>
        <b>Shopping:</b> {decodeURIComponent(shopping)}<br />
        <b>Horário:</b> {horario}
      </div>
      {/* Tela do cinema */}
      <div style={{
        width: "90%",
        margin: "0 auto 28px auto",
        height: 22,
        background: "linear-gradient(90deg, #ffd700 60%, #fffbe0 100%)",
        borderRadius: "0 0 40px 40px",
        boxShadow: "0 8px 24px #ffd70055",
        textAlign: "center",
        fontWeight: "bold",
        color: "#a1072e",
        fontSize: "1.08rem",
        letterSpacing: 1.2,
        lineHeight: "22px"
      }}>
        TELA
      </div>
      {/* Sala de cadeiras */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        background: "#232323",
        borderRadius: 12,
        padding: "18px 0 10px 0",
        boxShadow: "0 2px 12px #0004"
      }}>
        {[...Array(ROWS)].map((_, row) => {
          let cadeiraNum = 1;
          return (
            <div key={row} style={{ display: "flex", gap: 10 }}>
              {[...Array(COLS)].map((_, col) => {
                if (col === corredorEsquerda || col === corredorDireita) {
                  return (
                    <div key={`corredor-${col}`} style={{ width: 18 }} />
                  );
                }
                const code = `${String.fromCharCode(65 + row)}${cadeiraNum}`;
                const ocupada = ocupadas.includes(code);
                const btn = (
                  <button
                    key={code}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "8px 8px 12px 12px",
                      border: ocupada
                        ? "2.2px solid #a1072e"
                        : selecionada === code
                        ? "2.2px solid #a1072e"
                        : "1.5px solid #ffd700",
                      background: ocupada
                        ? "#a1072e"
                        : selecionada === code
                        ? "#ffd700"
                        : "#2d0b26",
                      color: ocupada
                        ? "#fff"
                        : selecionada === code
                        ? "#a1072e"
                        : "#fff",
                      fontWeight: "bold",
                      fontSize: "1.03rem",
                      cursor: ocupada ? "not-allowed" : "pointer",
                      opacity: ocupada ? 0.6 : 1,
                      boxShadow: selecionada === code
                        ? "0 0 10px #ffd70099"
                        : "0 2px 8px #0007",
                      transition: "all 0.15s"
                    }}
                    onClick={() => !ocupada && setSelecionada(code)}
                    aria-label={`Cadeira ${code}`}
                    disabled={ocupada}
                  >
                    {code}
                  </button>
                );
                cadeiraNum++;
                return btn;
              })}
            </div>
          );
        })}
        <div style={{ marginTop: 18, display: "flex", gap: 18, justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{
              display: "inline-block",
              width: 22,
              height: 22,
              borderRadius: 6,
              background: "#ffd700",
              border: "1.5px solid #a1072e"
            }} /> <span style={{ fontSize: 13 }}>Selecionada</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{
              display: "inline-block",
              width: 22,
              height: 22,
              borderRadius: 6,
              background: "#2d0b26",
              border: "1.5px solid #ffd700"
            }} /> <span style={{ fontSize: 13 }}>Livre</span>
          </div>
        </div>
      </div>
      <button
        style={{
          width: "100%",
          padding: "13px 0",
          borderRadius: 10,
          background: selecionada ? "linear-gradient(90deg, #a1072e 60%, #ffd700 100%)" : "#888",
          color: selecionada ? "#fff" : "#eee",
          fontWeight: "bold",
          fontSize: "1.08rem",
          border: "none",
          cursor: selecionada ? "pointer" : "not-allowed",
          marginTop: 18,
          boxShadow: selecionada ? "0 4px 18px #ffd70077" : "none",
          transition: "all 0.18s"
        }}
        disabled={!selecionada}
        onClick={handleConfirmar}
      >
        Confirmar cadeira
      </button>
    </div>
  );
}
