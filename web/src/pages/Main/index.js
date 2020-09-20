import React, { useEffect, useState } from 'react';
import socketio from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

export default function Main() {
    const [userPosition, setUserPosition] = useState([-20.722475, -46.579492]);
    const apiUrl = 'http://localhost:3001';
    const { room } = useParams();

    useEffect(() => {
        listenSocket();
    }, []);

    const listenSocket = async () => {
        const socket = socketio(`${apiUrl}`, {
            query: { room }
        });

        socket.on('changePosition', response => {
            console.log('SOCKET ==>', response);
        });
    }

    return (
        <div className="App">
            <Map center={userPosition} zoom={13}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={userPosition} />
            </Map>
        </div>
    );
}