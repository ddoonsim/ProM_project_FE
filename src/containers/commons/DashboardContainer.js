import { useEffect, useState } from 'react';
import DashboardForm from '../../components/commons/DashboardForm';
import getList from '../../api/project/ProjectList';

const DashboardContainer = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getList()  // 프로젝트 리스트 가져오기
      .then((items) => {
        setItems(() => items);
      })
      .catch((err) => console.error(err));
  }, []);


  return <DashboardForm items={items} />;
};

export default DashboardContainer;
