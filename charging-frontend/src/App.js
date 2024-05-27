import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PannesTable from './components/PannesTable';
import ParetoPage from './components/ParetoPage';
import Entretien from './components/Entretien';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faExclamationTriangle, faWrench } from '@fortawesome/free-solid-svg-icons';

const App = () => {
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/spots')
            .then(response => {
                console.log('API Response:', response.data);
                setSpots(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log('API Error:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    return (
        <Router>
            <div className="app-container">
                <header className="app-header">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <Link className="navbar-brand" to="/" style={{ marginLeft: "2rem"}}>iNERGIUS</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/"><FontAwesomeIcon icon={faChartBar} /> Systèmes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/pareto"><FontAwesomeIcon icon={faChartBar} /> Pareto</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/pannes"><FontAwesomeIcon icon={faExclamationTriangle} /> Pannes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/entretien"><FontAwesomeIcon icon={faWrench} /> Entretien</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
                <main className="app-main">
                    <Routes>
                        <Route path="/" element={<Dashboard spots={spots} />} />
                        <Route path="/pareto" element={<ParetoPage />} />
                        <Route path="/pannes" element={<PannesTable />} />
                        <Route path="/entretien" element={<Entretien />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
