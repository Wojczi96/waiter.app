import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Tables from './components/pages/Tables/Tables';
import NotFound from './components/pages/NotFound/NotFound';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchTables } from './redux/tableRedux';
import SingleTableDetails from './components/pages/SingleTableDetails/SingleTableDetails';

function App() {

  const dispatch = useDispatch();
  useEffect(() => {dispatch(fetchTables())}, [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Tables />} />
        <Route path="table/:tableId" element={<SingleTableDetails />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
