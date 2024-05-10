import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Main from './pages/Main';
import ShowDetail from './pages/ShowDetail';
import ShowList from './pages/ShowList';
import ByGenre from './pages/ByGenre';

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <Routes>
          <Route index element={<Main />}></Route>
          <Route path="/show/:id" element={<ShowDetail />}></Route>
          <Route path="/all" element={<ShowList />}></Route>
          <Route path="/latest" element={<ShowList />}></Route>
          <Route path="/bygenre" element={<ByGenre />}></Route>
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;

const AppContainer = styled.div`
  min-height: 100vh;
`;