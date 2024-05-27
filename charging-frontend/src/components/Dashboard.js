import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Dashboard.css';

const Dashboard = ({ spots }) => {
    const [filteredSpots, setFilteredSpots] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        console.log('Received spots in Dashboard:', spots);
        if (filter === 'all') {
            setFilteredSpots(spots);
        } else {
            setFilteredSpots(spots.filter(spot => spot.status === filter));
        }
    }, [spots, filter]);

    const getColor = (status) => {
        return status === 'opérationnel' ? 'green' : 'red';
    };

    const getFrequencyClass = (frequency) => {
        if (frequency < 100) return 'low';
        if (frequency < 200) return 'medium';
        return 'high';
    };

    const getRadius = (status) => {
        return status === 'opérationnel' ? 10 : 15;
    };

    return (
        <div className="dashboard">
            <div className="map-container">
                <MapContainer center={[48.7743, 2.0047]} zoom={13} style={{ height: '80vh', width: '100%' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    />
                    {filteredSpots.map(spot => (
                        <CircleMarker
                            key={spot.id}
                            center={[spot.latitude, spot.longitude]}
                            color={getColor(spot.status)}
                            radius={getRadius(spot.status)}
                        >
                            <Popup>
                                <strong>{spot.name}</strong><br />
                                Statut: {spot.status}<br />
                                Fréquence d'utilisation: {spot.frequency}
                            </Popup>
                        </CircleMarker>
                    ))}
                </MapContainer>
            </div>
            <div className="sidebar">
                <h3>Détails des Points de Recharge</h3>
                <div className="filters">
                    <label>
                        Filtrer par statut:
                        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value="all">Tous</option>
                            <option value="opérationnel">Opérationnel</option>
                            <option value="en maintenance">En maintenance</option>
                        </select>
                    </label>
                </div>
                <ul>
                    {filteredSpots.map(spot => (
                        <li key={spot.id} className={`spot-item ${spot.status}`}>
                            <strong>{spot.name}</strong><br />
                            Statut: <span className={`status ${spot.status}`}>{spot.status}</span><br />
                            Dernière maintenance: {spot.last_maintenance}<br />
                            Prochaine maintenance: {spot.next_maintenance}<br />
                            Fréquence d'utilisation: <span className={`frequency-bar ${getFrequencyClass(spot.frequency)}`}></span> {spot.frequency}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
