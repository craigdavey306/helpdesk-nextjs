import Link from 'next/link';
import React from 'react';
import { BASE_URL, TICKET_PATH } from '../constants';

export type Priority = 'high' | 'medium' | 'low';

export interface Ticket {
  id: string;
  title: string;
  body: string;
  priority: Priority;
  user_email: string;
}

async function getTickets(): Promise<Ticket[]> {
  // imitate api delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch(`${BASE_URL}${TICKET_PATH}`, {
    next: {
      revalidate: 0, // opt out of data caching
    },
  });

  return res.json();
}

export default async function TicketList() {
  const tickets = await getTickets();

  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`${TICKET_PATH}/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets!</p>
      )}
    </>
  );
}
