import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ParetoChart from './ParetoChart';
import './Pannes.css';

const Pannes = ({ pannes }) => {
    return (
        <div className="container mt-5">
            <h2>Pannes</h2>
            <div className="pareto-chart">
                <ParetoChart pannes={pannes} />
            </div>
            <div className="details">
                <h3>Détails des Pannes</h3>
                <ul>
                    {pannes.map(panne => (
                        <li key={panne.id}>
                            <strong>{panne.type}</strong> : {panne.description}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Pannes;
