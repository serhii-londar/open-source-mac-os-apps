import React, { FC, useContext } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext';
import PathBuilder from '../../services/PathBuilder';

const CategoriesList: FC = () => {
  const {state: {categories }} = useContext(AppContext);

  console.log(categories);

  return (
    <div>
      <p>Categotries</p>
      {categories.loading && <span>Loading...</span>}
      <p><Link to={PathBuilder.build('/')}>HOME</Link></p>
      <p><Link to={PathBuilder.build(`/${'some_category_id'}`)}>CATEGORY</Link></p>
      <p><Link to={PathBuilder.build(`/${'some_category_id'}/${'some_app_id'}`)}>APPLICATION</Link></p>
    </div>
  )
}

export default CategoriesList;
