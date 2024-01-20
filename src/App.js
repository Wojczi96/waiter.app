import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Tables from './components/pages/Tables/Tables';
import NotFound from './components/pages/NotFound/NotFound';

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Tables />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
