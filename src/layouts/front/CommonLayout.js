import Header from '../../outlines/front/Header';
import Footer from '../../outlines/front/Footer';
import { Outlet } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import MainClassContext from '../../modules/mainClass';

const CommonLayout = () => {
  const { mainClass, update } = useContext(MainClassContext);

  useEffect(() => {
    update();
  }, [update]);

  return (
    <>
      <Header />
      <main className={mainClass}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default CommonLayout;
