import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, User, X, Plus } from 'lucide-react';

const Appointments = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [showBookModal, setShowBookModal] = useState(false);
    const [newApt, setNewApt] = useState({ doctorId: '', date: '', reason: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAppointments();
        if (user?.role === 'patient') {
            fetchDoctors();
        }
    }, [user]);

    const fetchAppointments = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/appointments?role=${user.role}&userId=${user._id || user.id}`); // handle different id fields
            const data = await res.json();
            setAppointments(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchDoctors = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/users?role=doctor');
            const data = await res.json();
            setDoctors(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleBook = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    patientId: user._id || user.id,
                    doctorId: newApt.doctorId,
                    date: newApt.date, // User input native datetime-local
                    reason: newApt.reason
                })
            });
            if (res.ok) {
                fetchAppointments();
                setShowBookModal(false);
                setNewApt({ doctorId: '', date: '', reason: '' });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        if (!confirm('Are you sure you want to cancel this appointment?')) return;
        try {
            const res = await fetch(`http://localhost:5000/api/appointments/${id}/cancel`, {
                method: 'PUT'
            });
            if (res.ok) {
                fetchAppointments();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container fade-in" style={{ paddingBottom: '3rem' }}>
            <div className="flex items-center justify-between" style={{ margin: '3rem 0' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>My Appointments</h1>
                {user?.role === 'patient' && (
                    <button className="btn btn-primary" onClick={() => setShowBookModal(true)}>
                        <Plus size={20} style={{ marginRight: '0.5rem' }} /> Book Appointment
                    </button>
                )}
            </div>

            <div className="card">
                {appointments.length === 0 ? (
                    <div className="text-center" style={{ padding: '3rem', color: 'var(--text-muted)' }}>
                        <Calendar size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                        <p>No appointments found.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {appointments.map((apt) => (
                            <div key={apt._id} className="flex items-center justify-between" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                                <div className="flex items-center gap-6">
                                    <div style={{
                                        width: '60px', height: '60px',
                                        background: 'var(--bg)', borderRadius: '1rem',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'var(--primary)', fontWeight: '700', fontSize: '1.2rem',
                                        flexDirection: 'column'
                                    }}>
                                        <span>{new Date(apt.date).getDate()}</span>
                                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>
                                            {new Date(apt.date).toLocaleString('default', { month: 'short' })}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 style={{ fontWeight: '700', fontSize: '1.1rem' }}>
                                            {user.role === 'patient' ? `Dr. ${apt.doctorId?.username || 'Unknown'}` : `Patient: ${apt.patientId?.username || 'Unknown'}`}
                                        </h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                                            {new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                        <p style={{ fontSize: '0.9rem' }}>{apt.reason}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
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
                                    {apt.status === 'booked' && (
                                        <button className="btn btn-outline" style={{ borderColor: '#ef4444', color: '#ef4444' }} onClick={() => handleCancel(apt._id)}>
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showBookModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="card fade-in" style={{ width: '100%', maxWidth: '500px', position: 'relative' }}>
                        <button onClick={() => setShowBookModal(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent' }}>
                            <X size={24} />
                        </button>
                        <h2 style={{ marginBottom: '1.5rem', fontWeight: '700' }}>Book New Appointment</h2>

                        <form onSubmit={handleBook}>
                            <div className="input-group">
                                <label>Select Doctor</label>
                                <select
                                    className="input"
                                    value={newApt.doctorId}
                                    onChange={(e) => setNewApt({ ...newApt, doctorId: e.target.value })}
                                    required
                                >
                                    <option value="">-- Choose a Specialist --</option>
                                    {doctors.map(doc => (
                                        <option key={doc._id} value={doc._id}>Dr. {doc.username} ({doc.specialization})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Date & Time</label>
                                <input
                                    type="datetime-local"
                                    className="input"
                                    value={newApt.date}
                                    onChange={(e) => setNewApt({ ...newApt, date: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Reason for Visit</label>
                                <textarea
                                    className="input"
                                    rows="3"
                                    value={newApt.reason}
                                    onChange={(e) => setNewApt({ ...newApt, reason: e.target.value })}
                                    placeholder="Briefly describe your symptoms..."
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                                {loading ? 'Booking...' : 'Confirm Appointment'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Appointments;
