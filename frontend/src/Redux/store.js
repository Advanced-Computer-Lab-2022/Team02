import {configureStore} from '@reduxjs/toolkit'
import countryReducer from './CountryReducer'
export default configureStore({
    reducer: {
      rate: countryReducer,
    },
  })