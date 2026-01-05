import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Lock, Briefcase, Eye, EyeOff } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'patient',
        specialization: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(formData);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Registration failed');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen" style={{ background: 'var(--bg)' }}>
            <div className="card fade-in" style={{ width: '100%', maxWidth: '450px' }}>
                <div className="text-center" style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-dark)' }}>Join MediCare</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Create your account today</p>
                </div>

                {error && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Username</label>
                        <div className="flex items-center" style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '1rem', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                name="username"
                                className="input"
                                style={{ paddingLeft: '3rem' }}
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div className="flex items-center" style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', color: 'var(--text-muted)' }} />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="input"
                                style={{ paddingLeft: '3rem', paddingRight: '2.5rem' }}
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ position: 'absolute', right: '1rem', background: 'none', color: 'var(--text-muted)' }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>I am a</label>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                className={`flex-1 input`}
                                onClick={() => setFormData({ ...formData, role: 'patient' })}
                                style={{
                                    textAlign: 'center',
                                    border: formData.role === 'patient' ? '2px solid var(--primary)' : '1px solid var(--border)',
                                    background: formData.role === 'patient' ? 'var(--primary)' : 'white',
                                    color: formData.role === 'patient' ? 'white' : 'var(--text-main)',
                                    fontWeight: '600'
                                }}
                            >
                                Patient
                            </button>
                            <button
                                type="button"
                                className={`flex-1 input`}
                                onClick={() => setFormData({ ...formData, role: 'doctor' })}
                                style={{
                                    textAlign: 'center',
                                    border: formData.role === 'doctor' ? '2px solid var(--primary)' : '1px solid var(--border)',
                                    background: formData.role === 'doctor' ? 'var(--primary)' : 'white',
                                    color: formData.role === 'doctor' ? 'white' : 'var(--text-main)',
                                    fontWeight: '600'
                                }}
                            >
                                Doctor
                            </button>
                        </div>
                    </div>

                    {formData.role === 'doctor' && (
                        <div className="input-group fade-in">
                            <label>Specialization</label>
                            <div className="flex items-center" style={{ position: 'relative' }}>
                                <Briefcase size={18} style={{ position: 'absolute', left: '1rem', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    name="specialization"
                                    className="input"
                                    style={{ paddingLeft: '3rem' }}
                                    placeholder="e.g. Cardiologist"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '1rem' }}>
                        <UserPlus size={18} style={{ marginRight: '0.5rem' }} /> Register
                    </button>
                </form>

                <p className="text-center" style={{ marginTop: '1.5rem', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
