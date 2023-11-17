'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Priority, Ticket } from '../TicketList';
import { BASE_URL, TICKET_PATH } from '@/app/constants';

export default function CreateForm() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [priority, setPriority] = useState<Priority>('low');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const ticket: Ticket = {
      id: Math.floor(Math.random() * 100).toString(),
      title,
      body,
      priority,
      user_email: 'test@example.com',
    };

    const response = await fetch(`${BASE_URL}${TICKET_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticket),
    });

    if (response.status === 201) {
      router.refresh();
      router.push(TICKET_PATH);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label htmlFor="title">
        <span>Title:</span>
        <input
          type="text"
          id="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label htmlFor="body">
        <span>Body:</span>
        <textarea
          name="body"
          id="body"
          cols={1}
          rows={3}
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </label>
      <label htmlFor="priority">
        <span>Priority:</span>
        <select
          name="priority"
          id="priority"
          onChange={(e) => setPriority(e.target.value as Priority)}
          value={priority}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>
    </form>
  );
}
