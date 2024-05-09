import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Main from './pages/Main';
import ShowDetail from './pages/ShowDetail';

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <Routes>
          <Route index element={<Main />}></Route>
          <Route path="/show" element={<ShowDetail />}></Route>
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;

const AppContainer = styled.div`
  min-height: 100vh;
`;