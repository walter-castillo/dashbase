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

    const {state:stateRole} = useRole
    const { checkAuthToken, state }  = useAuth();
    // console.log('first')
    // if(stateRole.isLoading){  return (<Loading />) }
    // if(state.isLoading){  return (<Loading />) }

    return (
        <>
            <Routes>
                <Route path='/auth/*' element={
                    // <PublicRoutes isLogged={true}>
                    <PublicRoutes isLogged={state.isLogged}>
                        <AuthLayout />
                    </PublicRoutes>
                } />

                <Route path='/*' element={
                    // <PrivateRoutes  isLogged={true}>
                    <PrivateRoutes  isLogged={state.isLogged}>
                        <GeneralLayout />
                    </PrivateRoutes>
                } />
            </Routes>
        </>
    )
}
