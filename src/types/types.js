export const types =  {

    auth: {
        onLogin:    '[AUTH]-LOGIN',
        onLogout:   '[AUTH]-LOGOUT',
        onRegister: '[AUTH]-REGISTER',
        userAuth:   '[AUTH]-USER AUTH',
        onToken:    '[AUTH]-TOKEN',
        loading:    '[AUTH]-LOADING',
        error:      '[AUTH]-ERROR',
        success:    '[AUTH]-SUCCESS',
    },

    user: {
        getUsers:   '[USERS]-USERS ALL',
        getUser:    '[USERS]-USER BY ID',
        editUser:   '[USERS]-USER UPDATE',
        deleteUser: '[USERS]-USER DELETE',
        loading:    '[USERS]-USER LOADING',
        error:      '[USERS]-USER ERROR',
        success:    '[USERS]-USER SUCCESS',

    }
}