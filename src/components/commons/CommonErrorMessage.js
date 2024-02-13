import React from 'react';

const CommonErrorMessage = ({ error }) => {
  return <h1>{error.message}</h1>;
};

export default React.memo(CommonErrorMessage);
