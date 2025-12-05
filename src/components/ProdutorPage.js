import React, { useState, useEffect } from 'react';
import './ProdutorPage.css';
import { adicionarFilme } from '../services/firebase';
import { db } from '../services/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';

const userUID = "OQXhNyiUgQgHpS1lwm7E68PTr083";

export default function ProdutorPage() {
  const navigate = useNavigate();

  const [filmes, setFilmes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [novoFilme, setNovoFilme] = useState({
    titulo: "",
    descricao: "",
    media: null,
    mediaUrl: "",
    mediaType: "",
    capa: null,
    capaUrl: ""
  });

  useEffect(() => {
    async function fetchFilmes() {
      const q = query(collection(db, "filmes"), where("produtorUid", "==", userUID));
      const querySnapshot = await getDocs(q);

      const filmesDoProdutor = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setFilmes(filmesDoProdutor);
    }
    fetchFilmes();
  }, []);

  function handleChange(e) {
    setNovoFilme({ ...novoFilme, [e.target.name]: e.target.value });
  }

  function handleMedia(e) {
    const file = e.target.files[0];
    if (!file) return;

    setNovoFilme({
      ...novoFilme,
      media: file,
      mediaUrl: URL.createObjectURL(file),
      mediaType: file.type.startsWith("video") ? "video" : "image"
    });
  }

  function handleCapa(e) {
    const file = e.target.files[0];
    if (!file) return;

    setNovoFilme({
      ...novoFilme,
      capa: file,
      capaUrl: URL.createObjectURL(file)
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let capaUrl = "";

    if (novoFilme.capa) {
      const storage = getStorage();
      const storageRef = ref(storage, `capas/${Date.now()}_${novoFilme.capa.name}`);
      await uploadBytes(storageRef, novoFilme.capa);
      capaUrl = await getDownloadURL(storageRef);
    }

    const filmeParaSalvar = {
      titulo: novoFilme.titulo,
      descricao: novoFilme.descricao,
      mediaUrl: novoFilme.mediaUrl,
      mediaType: novoFilme.mediaType,
      capaUrl,
      produtorUid: userUID
    };

    try {
      await adicionarFilme(filmeParaSalvar);
      setFilmes([...filmes, { id: Date.now(), ...filmeParaSalvar }]);
    } catch (err) {
      console.error('Erro ao salvar filme:', err);
    }

    setNovoFilme({
      titulo: "",
      descricao: "",
      media: null,
      mediaUrl: "",
      mediaType: "",
      capa: null,
      capaUrl: ""
    });
  }

  function handleRemove(id) {
    setFilmes(filmes.filter(f => f.id !== id));
  }

  function handleEdit(id) {
    const f = filmes.find(f => f.id === id);
    setEditId(id);
    setNovoFilme({
      titulo: f.titulo,
      descricao: f.descricao,
      media: null,
      mediaUrl: f.mediaUrl,
      mediaType: f.mediaType,
      capa: null,
      capaUrl: f.capaUrl
    });
  }

  function handleSaveEdit(e) {
    e.preventDefault();

    setFilmes(filmes.map(f =>
      f.id === editId
        ? { ...f, ...novoFilme }
        : f
    ));

    setEditId(null);
    setNovoFilme({
      titulo: "",
      descricao: "",
      media: null,
      mediaUrl: "",
      mediaType: "",
      capa: null,
      capaUrl: ""
    });
  }

  function handleCancelEdit() {
    setEditId(null);
  }

  return (
    <div className="produtor-bg">
      <div className="produtor-container">

        {/* BOTÃO VOLTAR */}
        <button
          className="produtor-backbtn"
          onClick={() => navigate('/perfil')}
        >
          ← Voltar
        </button>

        <h1 className="produtor-title">Área do Produtor</h1>

        {/* Formulário */}
        <form className="produtor-form" onSubmit={editId ? handleSaveEdit : handleSubmit}>
          <label>
            Título do Filme:
            <input type="text" name="titulo" value={novoFilme.titulo} onChange={handleChange} required />
          </label>

          <label>
            Descrição/Sinopse:
            <textarea name="descricao" value={novoFilme.descricao} onChange={handleChange} rows={4} required />
          </label>

          <label>
            Imagem ou Vídeo:
            <input type="file" accept="image/*,video/*" onChange={handleMedia} />
          </label>

          <label>
            Imagem da Capa/Cartaz:
            <input type="file" accept="image/*" onChange={handleCapa} required />
          </label>

          {novoFilme.mediaUrl && (
            <div className="produtor-preview">
              <h3>Prévia:</h3>
              {novoFilme.mediaType === "image" ? (
                <img src={novoFilme.mediaUrl} alt="Prévia" />
              ) : (
                <video src={novoFilme.mediaUrl} controls width="250" />
              )}
            </div>
          )}

          {novoFilme.capaUrl && (
            <div className="produtor-preview">
              <h3>Prévia do Cartaz:</h3>
              <img src={novoFilme.capaUrl} alt="Cartaz" />
            </div>
          )}

          <button type="submit" className="produtor-submitbtn">
            {editId ? "Salvar edição" : "Cadastrar Filme"}
          </button>

          {editId && (
            <button type="button" className="produtor-cancelbtn" onClick={handleCancelEdit}>
              Cancelar
            </button>
          )}
        </form>

        {/* Lista */}
        <div className="produtor-filmes-lista">
          <h2>Meus filmes cadastrados:</h2>

          {filmes.map(filme => (
            <div key={filme.id} className="produtor-filme-card">
              <div className="produtor-filme-media">
                {filme.mediaType === "image" ? (
                  <img src={filme.mediaUrl} alt="" />
                ) : (
                  <video src={filme.mediaUrl} controls width="140" />
                )}
              </div>

              <div>
                <div className="produtor-filme-titulo">{filme.titulo}</div>
                <div className="produtor-filme-desc">{filme.descricao}</div>

                <div className="produtor-filme-actions">
                  <button className="produtor-edit" onClick={() => handleEdit(filme.id)}>Editar</button>
                  <button className="produtor-remove" onClick={() => handleRemove(filme.id)}>Remover</button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
