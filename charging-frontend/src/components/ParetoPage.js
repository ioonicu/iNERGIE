import React, { useEffect, useState } from 'react';
import ParetoChart from './ParetoChart';
import axios from 'axios';
import { Container, Spinner, Row, Col } from 'react-bootstrap';
import './ParetoPage.css';

const ParetoPage = () => {
    const [pannes, setPannes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/pannes')
            .then(response => {
                setPannes(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Container fluid className="h-100 d-flex justify-content-center align-items-center">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Chargement...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container fluid className="h-100 p-4">
            <Row>
                <Col>
                    <h2 className="mb-4">Graphique Pareto des Pannes</h2>
                    <ParetoChart pannes={pannes} />
                </Col>
            </Row>
        </Container>
    );
}

export default ParetoPage;
