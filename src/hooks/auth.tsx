import React, { createContext, useState, useContext, ReactNode } from 'react';

interface IAuthContext {
    logged: boolean;
    signIn(email: string, password: string): void;
    signOut(): void;
}

interface IAuthProvider {
    children: ReactNode
}


const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@minha-carteira:logged');

        return !!isLogged;
    });

    const signIn = (email: string, password: string) => {
        if (email === 'gabi@email.com' && password === '123') {
            localStorage.setItem('@minha-carteira:logged', 'true');
            setLogged(true);
        } else {
            alert("Senha ou usuários incorretos");
        }

    }

    const signOut = () => {
        localStorage.removeItem('@minha-carteira:logged');
        setLogged(false);
    }

    return (
        <AuthContext.Provider value={{ logged, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): IAuthContext {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };


