import { Outlet } from 'react-router-dom';
import { AboutComponent, Toolbar } from './Home/Components';

function App() {
  // dotenv.config();
  return (
    <>
      <div className="flex bg-black text-white min-h-dvh">
        <div className="flex-1">
          <Toolbar />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
        <div className="flex-1">
          <AboutComponent />
        </div>
      </div>
    </>
  );
}

export default App;
