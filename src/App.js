
import { Container } from 'react-bootstrap';
import Header from './components/views/Header/Header';
import { Routers } from 'react-router-dom';

function App() {
  return (
    <Container>
      <Header />
      <Routers>

      </Routers>
      <Footer />
    </Container>
  );
}

export default App;
