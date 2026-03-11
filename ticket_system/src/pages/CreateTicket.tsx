import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { TicketPriority } from '../models/Ticket';
import { ticketService } from '../services/ticketService';
import { useAuth } from '../hooks/useAuth';

const priorities: TicketPriority[] = ['low', 'medium', 'high'];

const CreateTicket = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TicketPriority>('low');

  if (!user) return <p>Unauthorized</p>;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    ticketService
      .create({
        title,
        description,
        author: user.username,
        priority,
        status: 'open',
      })
      .then(() => navigate('/tickets'));
  };

  return (
    <div className="create-ticket">
      <h2>Create new ticket</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Priority:
          <select
            value={priority}
            onChange={e => setPriority(e.target.value as TicketPriority)}
          >
            {priorities.map(p => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Create</button>
      </form>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
};

export default CreateTicket;
