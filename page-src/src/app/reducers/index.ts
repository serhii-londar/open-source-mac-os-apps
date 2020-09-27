import { combineReducers } from 'redux';

import {applications} from "./applications";
import {categories} from "./categories";

export default combineReducers({
  applications,
  categories
})
