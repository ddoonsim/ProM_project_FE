import { createContext, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const MainClassContext = createContext({
  mainClass: '',
  setMainClass: null,
});

const MainClassProvider = ({ children }) => {
  const location = useLocation();

  const [mainClass, setMainClass] = useState('');

  const update = useCallback(() => {
    const path = location.pathname.split('/');
    path.shift();
    let _mainClass = path.join('_');
    _mainClass = _mainClass ? `${_mainClass}_page` : 'main_page';
    setMainClass(() => _mainClass);
  }, [location]);

  const value = { mainClass, setMainClass, update };

  return (
    <MainClassContext.Provider value={value}>
      {children}
    </MainClassContext.Provider>
  );
};

const { Consumer: MainClassConsumer } = MainClassContext;

export { MainClassProvider, MainClassConsumer };

export default MainClassContext;