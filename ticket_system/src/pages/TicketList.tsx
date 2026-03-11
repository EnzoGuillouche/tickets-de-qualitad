import { useEffect, useState } from 'react';
import type { Ticket } from '../models/Ticket';
import { ticketService } from '../services/ticketService';
import TicketCard from '../components/TicketCard';
import { useAuth } from '../hooks/useAuth';

const TicketList = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    if (user.role === 'supervisor') {
      ticketService.getAll().then(setTickets);
    } else {
      ticketService.filterByUser(user.username).then(setTickets);
    }
  }, [user]);

  if (!user) return <p>Unauthorized</p>;

  return (
    <div className="ticket-list">
      <h2>Tickets</h2>
      {tickets.length === 0 && <p>No tickets to show.</p>}
      <div>
        {tickets.map(t => (
          <TicketCard key={t.id} ticket={t} />
        ))}
      </div>
    </div>
  );
};

export default TicketList;
