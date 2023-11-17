import Link from 'next/link';
import { TICKET_PATH } from '@/app/constants';

export default function NotFound() {
  return (
    <main className="text-center">
      <h2 className="text-3xl">We hit a wall with your request.</h2>
      <p>We could not find the ticket for which you were looking.</p>
      <p>
        Go back to all <Link href={TICKET_PATH}>tickets</Link>
      </p>
    </main>
  );
}
