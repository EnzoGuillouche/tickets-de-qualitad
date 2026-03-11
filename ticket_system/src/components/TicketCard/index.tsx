import type { Ticket } from '../../models/Ticket';
import { Link } from 'react-router-dom';

interface Props {
  ticket: Ticket;
}

const TicketCard = ({ ticket }: Props) => {
  return (
    <div className="ticket-card">
      <h3>{ticket.title}</h3>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>
      <Link to={`/tickets/${ticket.id}`}>Details</Link>
    </div>
  );
};

export default TicketCard;
