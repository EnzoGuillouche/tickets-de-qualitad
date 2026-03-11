import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Ticket, TicketPriority, TicketStatus } from '../models/Ticket';
import { ticketService } from '../services/ticketService';
import { useAuth } from '../hooks/useAuth';

const priorities: TicketPriority[] = ['low', 'medium', 'high'];
const statuses: TicketStatus[] = ['open', 'in_progress', 'resolved', 'closed'];

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [response, setResponse] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    ticketService.getById(Number(id)).then(t => t && setTicket(t));
  }, [id]);

  if (!user) return <p>Unauthorized</p>;
  if (!ticket) return <p>Loading...</p>;

  const canEdit =
    user.role === 'admin' ||
    ticket.author === user.username ||
    ticket.assigned_to === user.username;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canEdit) return;

    const updates: Partial<Ticket> = {};
    if (ticket.assigned_to) updates.assigned_to = ticket.assigned_to;
    updates.status = ticket.status;
    updates.priority = ticket.priority;

    if (response.trim()) {
      updates.responses = [...ticket.responses, response.trim()];
    }

    ticketService.update(ticket.id, updates).then(updated => {
      if (updated) setTicket(updated);
      setResponse('');
    });
  };

  return (
    <div className="ticket-detail">
      <h2>{ticket.title}</h2>
      <p>{ticket.description}</p>
      <p>Author: {ticket.author}</p>
      <p>Assigned to: {ticket.assigned_to || 'unassigned'}</p>
      <p>Priority: {ticket.priority}</p>
      <p>Status: {ticket.status}</p>
      <div>
        <h3>Responses</h3>
        {ticket.responses.map((r, i) => (
          <p key={i}>{r}</p>
        ))}
      </div>
      {canEdit && (
        <form onSubmit={handleSubmit} className="edit-form">
          <label>
            Status:
            <select
              value={ticket.status}
              onChange={e =>
                setTicket({ ...ticket, status: e.target.value as TicketStatus })
              }
            >
              {statuses.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label>
            Priority:
            <select
              value={ticket.priority}
              onChange={e =>
                setTicket({
                  ...ticket,
                  priority: e.target.value as TicketPriority,
                })
              }
            >
              {priorities.map(p => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <label>
            Assigned to:
            <input
              type="text"
              value={ticket.assigned_to || ''}
              onChange={e =>
                setTicket({ ...ticket, assigned_to: e.target.value })
              }
            />
          </label>
          <label>
            Add response:
            <textarea
              value={response}
              onChange={e => setResponse(e.target.value)}
            />
          </label>
          <button type="submit">Save changes</button>
        </form>
      )}
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default TicketDetail;
