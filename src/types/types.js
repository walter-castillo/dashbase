export const types =  {

    auth: {
        onLogin:    '[AUTH]-LOGIN',
        onLogout:   '[AUTH]-LOGOUT',
        onRegister: '[AUTH]-REGISTER',
        userAuth:   '[AUTH]-USER AUTH',
        onToken:    '[AUTH]-TOKEN',
        onLoading:  '[AUTH]-LOADING',
        stopLoading:'[AUTH]-STOP LOADING',
        error:      '[AUTH]-ERROR',
        success:    '[AUTH]-SUCCESS',
    },

    role: {
        getRoles:       '[ROLES]-ROLES ALL',
        editRole:       '[ROLES]-ROLE UPDATE',
        createRole:     '[ROLES]-ROLE CREATE',
        deleteRole:     '[ROLES]-ROLE DELETE',
        allPermissions: '[ROLES]-ALL PERMISSIONS',
        getRoleById:    '[ROLES]-ROLE BY ID',
        error:          '[ROLES]-ROLE ERROR',
        success:        '[ROLES]-ROLE SUCCESS',
    },

    user: {
        getUsers:       '[USERS]-USERS ALL',
        userById:       '[USERS]-USER BY ID',
        allRoles:       '[USERS]-ALL ROLES',
        createUser:     '[USERS]-USER CREATE ',
        // editUser:       '[USERS]-USER UPDATE',
        // deleteUser:     '[USERS]-USER DELETE',
        startLoading:   '[USERS]-USER START LOADING',
        stopLoading:    '[USERS]-USER STOP LOADING',
        errors:         '[USERS]-USER ERROR',
        // success:        '[USERS]-USER SUCCESS',

    }
}