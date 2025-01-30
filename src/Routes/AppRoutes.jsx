import React, { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes'
import { GeneralLayout } from '../layouts/GeneralLayout'
import {AuthLayout} from '../layouts/AuthLayout'
import { PublicRoutes } from './PublicRoutes'
import { useAuth} from '../providers/AuthProvider'
import { Loading } from '../components/ui/Loading'
import { useRole } from '../providers/RoleProvider'

export const AppRoutes = () => {

    const {state:stateRole} = useRole();
    const { checkAuthToken, state }  = useAuth();

    // useEffect(() => { checkAuthToken()}, [checkAuthToken]);

    if (stateRole.isLoading || state.isLoading) { return <Loading />    }

    return (
        <>
            <Routes>

                if (state.isLogged) {
                    <Route path='/*' element={
                    //  <PrivateRoutes  isLogged={state.isLogged}>
                        <GeneralLayout />
                    // </PrivateRoutes>
                } />
                }else{
                    <Route path='/auth/*' element={
                        // <PublicRoutes isLogged={state.isLogged}>         
                            <AuthLayout />
                        // </PublicRoutes>
                    } />
                }
               
            </Routes>
        </>
    )
}
