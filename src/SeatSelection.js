import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SeatSelection.css';

const SeatSelection = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sessionResponse = await axios.get(`http://localhost:5000/sessoes/${id}`);
                setSession(sessionResponse.data);

                const userResponse = await axios.get('http://localhost:5000/usuarios/1');
                setUser(userResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleSeatSelect = (seatId) => {
        setSelectedSeats((prevSelected) => {
            if (prevSelected.includes(seatId)) {
                return prevSelected.filter((id) => id !== seatId);
            } else {
                return [...prevSelected, seatId];
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('Você precisa estar logado para continuar.');
            return;
        }

        try {
            await axios.post('http://localhost:5000/compras', {
                usuarioId: user.id,
                sessaoId: session.id,
                lugares: selectedSeats,
            });

            alert('Compra realizada com sucesso!');
            navigate('/'); // Redireciona para a página inicial após a compra
        } catch (error) {
            console.error('Error processing purchase:', error);
            alert('Erro ao processar a compra. Tente novamente.');
        }
    };

    if (!session || !user) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="seat-selection">
            <h1>Seleção de Assentos - Sessão {session.id}</h1>
            <div className="screen">Tela</div>
            <div className="seats">
                {session.assentos.map((seat) => (
                    <div
                        key={seat.id}
                        className={`seat ${selectedSeats.includes(seat.id) ? 'selected' : ''} ${seat.reservado ? 'reserved' : ''}`}
                        onClick={() => !seat.reservado && handleSeatSelect(seat.id)}
                    >
                        {seat.numero}
                    </div>
                ))}
            </div>
            <div className="actions">
                <button onClick={handleSubmit}>Confirmar Compra</button>
            </div>
        </div>
    );
};

export default SeatSelection;