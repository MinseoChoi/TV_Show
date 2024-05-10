import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Main from './pages/Main';
import ShowDetail from './pages/ShowDetail';
import ShowList from './pages/ShowList';
import ByGenre from './pages/ByGenre';
import UserFavorite from './pages/UserFavorite';

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
          <Route path="/favorite" element={<UserFavorite />}></Route>
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;