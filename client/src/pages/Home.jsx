import { Link } from 'react-router-dom';
import { Stethoscope, CalendarCheck, ShieldCheck } from 'lucide-react';

const Home = () => {
    return (
        <div className="fade-in">
            <section className="hero-section">
                <div className="container flex items-center justify-between">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Modern Healthcare <br /> at Your Fingertips
                        </h1>
                        <p className="hero-subtitle">
                            Experience the future of medical appointments. Connect with top specialists, manage your schedule, and prioritize your health with our premium platform.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
                                Book Appointment Now
                            </Link>
                            <Link to="/login" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}>
                                Patient Login
                            </Link>
                        </div>

                        <div className="flex gap-8" style={{ marginTop: '4rem' }}>
                            <Feature icon={<Stethoscope size={24} />} title="Expert Doctors" text="Certified specialists" />
                            <Feature icon={<CalendarCheck size={24} />} title="Easy Booking" text="24/7 Online support" />
                            <Feature icon={<ShieldCheck size={24} />} title="Secure Records" text="100% Confidential" />
                        </div>
                    </div>

                    {/* Decorative Visual */}
                    <div style={{
                        width: '500px',
                        height: '500px',
                        background: 'linear-gradient(45deg, var(--primary-light), var(--accent))',
                        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                        position: 'relative',
                        opacity: 0.1,
                        animation: 'morph 8s ease-in-out infinite'
                    }}>
                        <style>
                            {`
                @keyframes morph {
                    0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
                    100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                }
                `}
                        </style>
                    </div>
                </div>
            </section>
        </div>
    );
};

const Feature = ({ icon, title, text }) => (
    <div className="flex items-center gap-4">
        <div style={{ background: 'white', padding: '0.8rem', borderRadius: '50%', boxShadow: 'var(--shadow)' }}>
            <div style={{ color: 'var(--primary)' }}>{icon}</div>
        </div>
        <div>
            <h3 style={{ fontWeight: '700', fontSize: '1.1rem' }}>{title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{text}</p>
        </div>
    </div>
);

export default Home;
