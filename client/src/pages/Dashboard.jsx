import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, CheckCircle, XCircle } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        // Fetch upcoming schedulings
        if (user) {
            fetch(`http://localhost:5000/api/appointments?role=${user.role}&userId=${user._id}`)
                .then(res => res.json())
                .then(data => {
                    // simple sort by date
                    if (Array.isArray(data)) setAppointments(data.slice(0, 3));
                })
                .catch(err => console.error(err));
        }
    }, [user]);

    return (
        <div className="container fade-in" style={{ paddingBottom: '2rem' }}>
            <header style={{ margin: '3rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Dashboard</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Welcome back, <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{user?.username}</span></p>
                </div>
                <div>
                    <span className="btn btn-outline" style={{ cursor: 'default' }}>
                        {user?.role === 'doctor' ? `Dr. ${user?.specialization || ''}` : 'Patient Account'}
                    </span>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Stats / Quick Actions */}
                <div className="card">
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={20} /> Quick Actions
                    </h3>

                    <div className="flex flex-col gap-4">
                        {user?.role === 'patient' && (
                            <Link to="/appointments" className="btn btn-primary w-full">
                                Book New Appointment
                            </Link>
                        )}
                        <Link to="/appointments" className="btn btn-outline w-full">
                            View All Appointments
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={20} /> Upcoming Appointments
                    </h3>

                    {appointments.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            {appointments.map(apt => (
                                <div key={apt._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg)', borderRadius: '0.5rem' }}>
                                    <div className="flex items-center gap-4">
                                        <div style={{ background: 'white', padding: '0.5rem', borderRadius: '50%' }}>
                                            <User size={20} color="var(--primary)" />
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: '600' }}>
                                                {user.role === 'patient' ? `Dr. ${apt.doctorId?.username || 'Unknown'}` : `Patient: ${apt.patientId?.username || 'Unknown'}`}
                                            </p>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{new Date(apt.date).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '1rem',
                                            fontSize: '0.8rem',
                                            background: apt.status === 'booked' ? '#dcfce7' : '#fee2e2',
                                            color: apt.status === 'booked' ? '#166534' : '#991b1b',
                                            fontWeight: '600'
                                        }}>
                                            {apt.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center" style={{ padding: '2rem', color: 'var(--text-muted)' }}>
                            No upcoming appointments found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
