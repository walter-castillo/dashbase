export const types =  {

    auth: {
        onLogin:    '[AUTH]-LOGIN',
        onLogout:   '[AUTH]-LOGOUT',
        onRegister: '[AUTH]-REGISTER',
    },

    user: {
        getUsers:   '[USERS]-USERS ALL',
        getOneUser: '[USERS]-USER BY ID',
        editUser:   '[USERS]-USER UPDATE',
        deleteUser: '[USERS]-USER DELETE',
        activeUser: '[USERS]-USER ACTIVE',
        messages:   '[USERS]-USER ERROR MESSAGE',
        loading:    '[USERS]-USER LOADING',
    }
}