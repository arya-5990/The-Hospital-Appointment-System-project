import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, User, LogOut, Calendar } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="nav glass">
            <div className="container flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
                    <div style={{ background: 'var(--primary)', padding: '0.5rem', borderRadius: '0.5rem', color: 'white' }}>
                        <Activity size={24} />
                    </div>
                    <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-dark)' }}>MediCare</span>
                </Link>

                <div className="flex items-center gap-6">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="flex items-center gap-2" style={{ fontWeight: '500' }}>
                                Dashboard
                            </Link>
                            <Link to="/appointments" className="flex items-center gap-2" style={{ fontWeight: '500' }}>
                                <Calendar size={18} />
                                Appointments
                            </Link>
                            <div className="flex items-center gap-4">
                                <span style={{ color: 'var(--text-muted)' }}>Hello, {user.username}</span>
                                <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                    <LogOut size={16} style={{ marginRight: '0.5rem' }} /> Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Login</Link>
                            <Link to="/register" className="btn btn-primary">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
