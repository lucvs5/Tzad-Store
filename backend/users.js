// Gerenciamento de usuários/clientes
const users = {
    current: null,
    
    login: (email, password) => {
        // Lógica de autenticação futura
        console.log(`Tentativa de login: ${email}`);
        users.current = { email: email, status: 'authenticated' };
    },
    
    logout: () => {
        users.current = null;
    }
};

export default users;
