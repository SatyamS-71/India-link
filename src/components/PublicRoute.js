import React from 'react'
import {Route, Redirect} from 'react-router-dom'

function PublicRoute({children}) {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
        window.location.href = '/'
    }else{
        return children
    }
  

}

export default PublicRoute