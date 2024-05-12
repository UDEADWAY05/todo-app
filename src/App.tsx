import { Login } from './components/auth/Login';
import { Routes, Route } from 'react-router-dom';
import { Todos } from './components/todos/Todos';
import { NotFound } from './components/not-found/NotFound';
import { useEffect } from 'react';
import { ProtectedRoutes } from './ProtectedRoutes';
import { authStore } from './store/authStore';


function App() {
  useEffect(() => {
    authStore.checkAuth()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedRoutes/>}>
          <Route path='/' element={<Login />} />
        </Route>
        <Route element={<ProtectedRoutes auth={true} />}>
          <Route path='/todos' element={<Todos />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
