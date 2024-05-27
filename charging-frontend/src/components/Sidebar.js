import React from 'react';
import './Sidebar.css';

const Sidebar = ({ spots }) => {
    return (
        <div className="sidebar">
            <h2>Détails des Points de Recharge</h2>
            <ul>
                {spots.map(spot => (
                    <li key={spot.id}>
                        <strong>{spot.name}</strong><br />
                        Status: {spot.status}<br />
                        Maintenance: {spot.last_maintenance} - {spot.next_maintenance}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
