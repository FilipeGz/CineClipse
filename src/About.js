import React from 'react';
import './styles/About.css';

const About = () => (
  <div className="about-container">
    <h1 className="about-title"><span role="img" aria-label="filme">🎬</span> Sobre o Cinema02</h1>
    <p className="about-description">
      O <b>Cinema02</b> é o seu portal para descobrir os melhores filmes, ver detalhes, avaliações e sinopses de obras marcantes do cinema mundial.
      <br /><br />
      Desenvolvido como um projeto educacional, utiliza ReactJS e integra busca de informações de filmes por API. 
      Explore, crie sua lista, compartilhe e viva a paixão pelo cinema!
    </p>
    <div className="about-info">
      <h3>Recursos:</h3>
      <ul>
        <li>Visualização de filmes populares</li>
        <li>Sinopse e avaliação de filmes</li>
        <li>Busca detalhada e navegação fácil</li>
        <li>Interface moderna e responsiva</li>
      </ul>
    </div>
    <div id="mycompiler-embed-8EJOAY6AgwB"></div>
    <div className="about-author">
      <span>Projeto desenvolvido por <a href="https://github.com/oedos" target="_blank" rel="noopener noreferrer">oedos</a></span>
    </div>
  </div>
);

export default About;