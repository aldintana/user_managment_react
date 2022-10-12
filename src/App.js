import { Route, Routes } from 'react-router-dom';
import UserEditPage from './application/users/pages/UserEditPage';
import Layout from './components/layout/Layout';
import UserPage from './application/users/pages/UserPage';
import UserPermissionPage from "./application/userPermissions/pages/UserPermissionPage";
//import { history } from "./helpers/history";

function App() {
  return (
      <Layout>
        <Routes>
          <Route exact path='/' element={<UserPage/>}>
          </Route>
          <Route exact path='/create-user' element={<UserEditPage/>}>
          </Route>
          <Route exact path='/edit-user/:id' element={<UserEditPage/>}>
          </Route>
          <Route exact path='/userPermissions/:id' element={<UserPermissionPage/>}>
          </Route>
        </Routes>
      </Layout>
  );
}

export default App;
