import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import UserPage from './application/users/pages/UserPage';
//import { history } from "./helpers/history";

function App() {
  return (
      <Layout>
        <Routes>
          <Route exact path='/' element={<UserPage/>}>
          </Route>
        </Routes>
      </Layout>
  );
}

export default App;
