// src/components/ClientList.jsx
import { useSelector } from 'react-redux'

const ClientList = ({ onSelectClient, selectedClientId }) => {
    const { data: clients, status } = useSelector(state => state.clients)

    if (status === 'loading') return <p>Loading clients...</p>
    if (status === 'failed') return <p>Failed to load clients.</p>

    return (
        <ul className="client-list">
            {clients.map(client => (
                <li
                    key={client.id}
                    onClick={() => onSelectClient(client.id)}
                    style={{
                        backgroundColor: client.id === selectedClientId ? '#d0f0f2' : 'white',
                        fontWeight: client.id === selectedClientId ? 'bold' : 'normal',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: '6px',
                        marginBottom: '0.3rem',
                        border: '1px solid #ccc'
                    }}
                >
                    {client.name}
                    <div className="contact">
                        {client.email} <br />
                        {client.phone}
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default ClientList
