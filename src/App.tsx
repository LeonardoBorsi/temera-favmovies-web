
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { routes } from './routes/routes';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.href} element={route.component} />
          ))}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
