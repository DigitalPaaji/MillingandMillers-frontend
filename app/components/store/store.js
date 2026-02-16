import {configureStore} from "@reduxjs/toolkit"
import category from "./categorySlice"
import adds from "./adds"

const store = configureStore({
    reducer:{
category,adds
    }
})

export default store