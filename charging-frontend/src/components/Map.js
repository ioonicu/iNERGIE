import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

const Map = ({ spots = [] }) => {
    return (
        <MapContainer center={[48.7758, 2.0044]} zoom={15} className="map-container">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {spots.map(spot => (
                <CircleMarker
                    key={spot.id}
                    center={[spot.latitude, spot.longitude]}
                    radius={10}
                    color={spot.status === 'operational' ? 'green' : 'red'}
                >
                    <Popup>
                        <b>{spot.name}</b><br />
                        Statut : {spot.status === 'operational' ? 'Opérationnel' : 'En maintenance'}<br />
                        Dernière maintenance : {spot.last_maintenance}<br />
                        Prochaine maintenance : {spot.next_maintenance}
                    </Popup>
                </CircleMarker>
            ))}
        </MapContainer>
    );
}

export default Map;
