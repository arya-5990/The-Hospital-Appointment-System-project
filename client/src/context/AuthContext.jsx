import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('hospital_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        // In real app, call API
        // const res = await fetch('http://localhost:5000/api/auth/login', ...);
        // const data = await res.json();

        // Simulating API call for initial development if backend isn't ready
        let data;
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (!res.ok) throw new Error('Login failed');
            data = await res.json();
            setUser(data.user);
            localStorage.setItem('hospital_user', JSON.stringify(data.user));
        } catch (e) {
            console.error(e);
            throw e;
        }
    };

    const register = async (userData) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            const data = await res.json();

            if (!res.ok) {
                // Throw the specific error from backend (e.g. "Username taken" or "Mongo Error")
                throw new Error(data.message || data.error || 'Registration failed');
            }

            // optionally login after register
            return data;
        } catch (e) {
            console.error("Registration Error Details:", e);
            throw e;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('hospital_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
