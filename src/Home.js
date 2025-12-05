import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';
import ProfileBox from './components/ProfileBox';
import { db } from './services/firebase';
import { collection, getDocs } from 'firebase/firestore';

const filmesDestaque = [
  { id: 157336, titulo: 'Interestelar', descricao: 'Viagem pelo espaço e tempo.', imagem: '/images/4238-cartaz.jpg' },
  { id: 911430, titulo: 'F1: O Filme', descricao: 'Documentário sobre Fórmula 1.', imagem: '/images/0506.jpg' },
  { id: 1078605, titulo: 'A Hora do Mal', descricao: 'Suspense sobrenatural.', imagem: '/images/0304.jpg' },
  { id: 842924, titulo: 'A Vida de Chuck', descricao: 'Drama baseado em Stephen King.', imagem: '/images/0203.jpg' },
  { id: 1038392, titulo: 'Invocação do Mal 4', descricao: 'O caso que encerrou tudo.', imagem: '/images/0102.jpg' },
];

const Home = () => {
  const [filmesProdutores, setFilmesProdutores] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [query, setQuery] = useState('');
  const wrapperRef = useRef(null);

  // Load filmes dos produtores (mantive sua lógica intacta)
  useEffect(() => {
    async function fetchFilmes() {
      try {
        const querySnapshot = await getDocs(collection(db, "filmes"));
        const filmes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFilmesProdutores(filmes);
      } catch (err) {
        console.error("Erro ao buscar filmes:", err);
      }
    }
    fetchFilmes();
  }, []);

  // Filtra somente os filmesDestaque para o carrossel (opção A)
  const filteredDestaque = filmesDestaque.filter(f =>
    f.titulo.toLowerCase().includes(query.trim().toLowerCase())
  );

  // Também filtra produtores para mostrar na lista abaixo
  const filteredProdutores = filmesProdutores.filter(f =>
    (f.titulo || '').toLowerCase().includes(query.trim().toLowerCase())
  );

  // Ajusta carouselIndex caso a lista filtrada tenha menos itens
  useEffect(() => {
    if (carouselIndex > Math.max(0, filteredDestaque.length - 1)) {
      setCarouselIndex(Math.max(0, filteredDestaque.length - 1));
    }
  }, [filteredDestaque, carouselIndex]);

  const nextSlide = () => {
    if (carouselIndex < filteredDestaque.length - 1) {
      setCarouselIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (carouselIndex > 0) {
      setCarouselIndex(prev => prev - 1);
    }
  };

  // Navegação por teclado (setas)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [carouselIndex, filteredDestaque]);

  // Clicar num card define-o como central
  const handleClickCard = (index) => {
    setCarouselIndex(index);
  };

  return (
    <div className="home-container">
      <ProfileBox />

      {/* topo com search bar */}
      <header className="home-top">
        <h1 className="cinema02-titulo">
          <span className="emoji-filme" role="img" aria-label="Filme">🎬</span>
          <span className="cinema02-gradient">CineClipse</span>
        </h1>

        <div className="search-wrapper" ref={wrapperRef}>
          <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden>
            <path fill="currentColor" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            className="search-input"
            placeholder="Buscar filmes..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              // reset index to 0 ao digitar
              setCarouselIndex(0);
            }}
            aria-label="Pesquisar filmes"
          />
        </div>
      </header>

      {/* CARROSSEL stacked */}
      <section className="carousel-section">
        <button className="carousel-arrow left" onClick={prevSlide} aria-label="Anterior">{'<'}</button>
        <div className="carousel-frame">
          {filteredDestaque.length === 0 ? (
            <div className="carousel-empty">Nenhum filme encontrado.</div>
          ) : (
            filteredDestaque.map((filme, i) => {
              // cálculo do offset relativo ao index central
              const offset = i - carouselIndex;
              // limitamos transformações visíveis
              const absOffset = Math.abs(offset);

              // mapeamento visual:
              // central: scale 1, translateY 0, opacity 1, zIndex alto
              // sides: scale decrescente, translateY crescente, opacity decrescente
              const scale = offset === 0 ? 1 : Math.max(0.82, 1 - 0.08 * absOffset);
              const translateX = offset * 40; // deslocamento horizontal
              const translateY = Math.min(30, absOffset * 14); // empilha verticalmente
              const opacity = Math.max(0.18, 1 - 0.32 * absOffset);
              const zIndex = 30 - absOffset; // central com maior z-index

              const style = {
                transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
                opacity,
                zIndex,
                transition: 'transform 450ms cubic-bezier(.22,.9,.3,1), opacity 350ms ease'
              };

              return (
                <div
                  key={filme.id}
                  className={`carousel-card ${offset === 0 ? 'active' : ''}`}
                  style={style}
                  onClick={() => handleClickCard(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleClickCard(i); }}
                  aria-label={`Abrir ${filme.titulo}`}
                >
                  <img src={filme.imagem} alt={filme.titulo} />
                  <div className="carousel-card-badge">
                    <strong>{filme.titulo}</strong>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <button className="carousel-arrow right" onClick={nextSlide} aria-label="Próximo">{'>'}</button>
      </section>

      {/* LISTA HORIZONTAL (Adicionados Recentemente) */}
      <h2 className="section-title">Adicionados Recentemente</h2>

      <div className="horizontal-list">
        {filteredDestaque.map(filme => (
          <div key={filme.id} className="horizontal-card">
            <div className="img-box">
              <img src={filme.imagem} alt={filme.titulo} />
            </div>
            <div>
              <div className="horizontal-card-title">{filme.titulo}</div>
              <p>{filme.descricao}</p>
              <Link to={`/detalhe/${filme.id}`}>Ver detalhes</Link>
            </div>
          </div>
        ))}

        {filteredProdutores.map(filme => (
          <div key={filme.id} className="horizontal-card">
            <div className="img-box">
              <img
                src={filme.capaUrl || "/images/placeholder.png"}
                alt={filme.titulo || 'Sem título'}
              />
            </div>
            <div>
              <div className="horizontal-card-title">{filme.titulo}</div>
              <p>{filme.descricao}</p>
              <Link to={`/detalhe-produtor/${filme.id}`}>Ver detalhes</Link>
            </div>
          </div>
        ))}
      </div>

      {/* NAV */}
      <nav className="nav-buttons">
        <Link to="/about"><button>Sobre</button></Link>
        <Link to="/faq"><button>FAQ</button></Link>
      </nav>
    </div>
  );
};

export default Home;
