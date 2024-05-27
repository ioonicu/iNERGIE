import React, { useState } from 'react';
import axios from 'axios';

const IssueForm = () => {
    const [spotId, setSpotId] = useState('');
    const [issue, setIssue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/report_issue', { spot_id: spotId, issue })
            .then(response => {
                console.log(response.data);
                setSpotId('');
                setIssue('');
            })
            .catch(error => console.log(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Spot ID:</label>
                <input type="text" value={spotId} onChange={(e) => setSpotId(e.target.value)} required />
            </div>
            <div>
                <label>Issue:</label>
                <textarea value={issue} onChange={(e) => setIssue(e.target.value)} required></textarea>
            </div>
            <button type="submit">Report Issue</button>
        </form>
    );
}

export default IssueForm;
