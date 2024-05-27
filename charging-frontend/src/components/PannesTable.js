import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PannesTable.css';

const PannesTable = () => {
    const [pannes, setPannes] = useState([]);
    const [newPanne, setNewPanne] = useState({ type: '', description: '', date: '', system: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/pannes')
            .then(response => {
                setPannes(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching pannes:', error);
                setLoading(false);
            });
    }, []);

    const handleAddPanne = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/pannes', newPanne);
            setPannes([...pannes, response.data]);
            setNewPanne({ type: '', description: '', date: '', system: '' });
        } catch (error) {
            console.error('Error adding panne:', error);
        }
    };

    const handleDeletePanne = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/pannes/${id}`);
            setPannes(pannes.filter(panne => panne.id !== id));
        } catch (error) {
            console.error('Error deleting panne:', error);
        }
    };

    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Tableau des Pannes</h2>
            <form className="mb-4" onSubmit={handleAddPanne}>
                <div className="form-group">
                    <label>Type de panne</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newPanne.type}
                        onChange={(e) => setNewPanne({ ...newPanne, type: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newPanne.description}
                        onChange={(e) => setNewPanne({ ...newPanne, description: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={newPanne.date}
                        onChange={(e) => setNewPanne({ ...newPanne, date: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Système</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newPanne.system}
                        onChange={(e) => setNewPanne({ ...newPanne, system: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Ajouter</button>
            </form>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type de panne</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Système</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pannes.map(panne => (
                        <tr key={panne.id}>
                            <td>{panne.id}</td>
                            <td>{panne.type}</td>
                            <td>{panne.description}</td>
                            <td>{panne.date}</td>
                            <td>{panne.system}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeletePanne(panne.id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PannesTable;
