import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Stethoscope, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const UsersList = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Determine who we are looking for
    const targetRole = user?.role === 'patient' ? 'doctor' : 'patient';
    const title = user?.role === 'patient' ? 'Find a Doctor' : 'Patient Directory';

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/users?role=${targetRole}`);
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                console.error("Failed to fetch users", err);
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchUsers();
    }, [user, targetRole]);

    return (
        <div className="container fade-in" style={{ paddingBottom: '3rem' }}>
            <header style={{ margin: '3rem 0' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>{title}</h1>
                <p style={{ color: 'var(--text-muted)' }}>
                    {user?.role === 'patient'
                        ? 'Browse our qualified specialists and book an appointment.'
                        : 'View registered patients in the system.'}
                </p>
            </header>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {users.length === 0 && (
                        <p>No {targetRole}s found.</p>
                    )}

                    {users.map(u => (
                        <div key={u._id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="flex items-center gap-4">
                                <div style={{
                                    background: 'var(--bg)',
                                    padding: '1rem',
                                    borderRadius: '50%',
                                    color: 'var(--primary)'
                                }}>
                                    {targetRole === 'doctor' ? <Stethoscope size={24} /> : <User size={24} />}
                                </div>
                                <div>
                                    <h3 style={{ fontWeight: '700', fontSize: '1.2rem' }}>
                                        {targetRole === 'doctor' ? `Dr. ${u.username}` : u.username}
                                    </h3>
                                    {targetRole === 'doctor' && (
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            {u.specialization || 'General Practitioner'}
                                        </p>
                                    )}
                                    {targetRole === 'patient' && (
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            Patient ID: {u._id.slice(-6)}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {user?.role === 'patient' && targetRole === 'doctor' && (
                                <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                                    <Link to="/appointments" className="btn btn-outline w-full">
                                        Book Appointment
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UsersList;
