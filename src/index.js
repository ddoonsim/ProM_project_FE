import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // pageTitle 설정
import ErrorPage from './pages/commons/ErrorPage';

import { UserProvider } from './modules/user';
import { MainClassProvider } from './modules/mainClass';
import { ModalProvider } from './modules/modalContext';

import reportWebVitals from './reportWebVitals';

import './i18n'; // 다국어 설정

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <UserProvider>
    <HelmetProvider>
      <ModalProvider>
        <BrowserRouter>
          <MainClassProvider>
            <ErrorPage>
              <App />
            </ErrorPage>
          </MainClassProvider>
        </BrowserRouter>
      </ModalProvider>
    </HelmetProvider>
  </UserProvider>,
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
