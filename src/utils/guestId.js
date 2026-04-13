// Generate or retrieve a unique device ID
import { v4 as uuidv4 } from 'uuid';

export function getGuestId() {
  if (typeof window === 'undefined') {
    return null; // running on server
  }

  let guestId = localStorage.getItem('guest_id');

  if (!guestId) {
    guestId = uuidv4();
    localStorage.setItem('guest_id', guestId);
  }

  return guestId;
}