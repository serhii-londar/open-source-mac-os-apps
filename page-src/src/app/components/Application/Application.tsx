import React, { FC, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';

const Application: FC = () => {
  const {state: {applications }} = useContext(AppContext);

  console.log(applications);

  return (
    <div>
      Application {applications.loading && <>Loading...</>}
    </div>
  )
}

export default Application;
