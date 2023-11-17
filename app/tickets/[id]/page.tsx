import { notFound } from 'next/navigation';
import { Ticket } from '../TicketList';
import { BASE_URL, TICKET_PATH } from '@/app/constants';

const TICKET_URL = `${BASE_URL}${TICKET_PATH}`;

type Props = {
  params: { id: string };
};

export const dynamicParams = true;

// Generate static urls for all tickets.
export async function generateStaticParams() {
  const response = await fetch(`${TICKET_URL}`);

  const tickets: Ticket[] = await response.json();

  return tickets.map((ticket) => ({
    id: ticket.id,
  }));
}

async function getTicket(id: string): Promise<Ticket> {
  const response = await fetch(`${TICKET_URL}/${id}`, {
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    notFound();
  }

  return response.json();
}

export default async function TicketDetails({
  params,
}: Props): Promise<JSX.Element> {
  const ticket = await getTicket(params.id);
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
      </div>
    </main>
  );
}
