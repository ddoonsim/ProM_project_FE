import React, { useEffect, useState } from 'react';
import getList from '../../api/project/ProjectList';
import ListForm from '../../components/project/ListForm';

const ProjectListContainer = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getList()
      .then((items) => {
        setItems(() => items);
      })
      .catch((err) => console.error(err));
  }, []);

  return <ListForm items={items} />;
};

export default React.memo(ProjectListContainer);
