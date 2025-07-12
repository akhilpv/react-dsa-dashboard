import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Toast from './components/organisms/Toast';
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toast />
    </BrowserRouter>
  );
}

export default App;
