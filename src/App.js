import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import MovieDetail from './MovieDetail';
import About from './About';
import NotFound from './NotFound';
import ProfilePage from './components/ProfilePage';
import ProdutorPage from './components/ProdutorPage'; 
import CadastroUsuario from './components/CadastroUsuario';
import Login from './components/Login';
import Faq from "./Faq";
import SelecionarCadeira from "./SelecionarCadeira";
import Pagamento from "./Pagamento";
import Sucesso from "./Sucesso";
import Cancelamento from "./Cancelamento";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/detalhe/:id" element={<MovieDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/produtor" element={<ProdutorPage />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/home" element={<Home />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/selecionar-cadeira/:filmeId/:shopping/:horario" element={<SelecionarCadeira />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/sucesso" element={<Sucesso />} />
        <Route path="/cancelamento" element={<Cancelamento />} />


      </Routes>
    </Router>
  );
}

export default App;