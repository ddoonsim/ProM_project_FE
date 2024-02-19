import Header from '../../outlines/front/Header';
import { Outlet } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import MainClassContext from '../../modules/mainClass';
import UserContext from '../../modules/user';
import Side from '../../outlines/front/Side';

const CommonLayout = () => {
  const { mainClass, update } = useContext(MainClassContext);

  useEffect(() => {
    update();
  }, [update]);

  const {
    state: { isLogin },
  } = useContext(UserContext);

  return isLogin ? (
    <>
      <Header />
      <main className={mainClass}>
        <Side />
        <Outlet />
      </main>
    </>
  ) : (
    <>
      <Header />
      <main className={mainClass}>
        <Outlet />
      </main>
    </>
  );
};

export default CommonLayout;
