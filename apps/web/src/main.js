const routes = {
  '/pos': {
    title: 'Point of Sale',
    description: 'Bestellungen aufnehmen und direkt senden.'
  },
  '/kitchen': {
    title: 'Kitchen Board',
    description: 'Offene Tickets in der Küche priorisieren.'
  },
  '/admin': {
    title: 'Admin Panel',
    description: 'Stammdaten und Benutzerverwaltung.'
  }
};

const path = window.location.pathname;
const fallback = {
  title: 'Restaurant App',
  description: 'Bitte Route /pos, /kitchen oder /admin verwenden.'
};
const current = routes[path] || fallback;

document.getElementById('app').innerHTML = `
  <main style="font-family: Inter, system-ui, sans-serif; max-width: 56rem; margin: 2rem auto; padding: 1rem;">
    <h1>${current.title}</h1>
    <p>${current.description}</p>
    <ul>
      <li><a href="/pos">/pos</a></li>
      <li><a href="/kitchen">/kitchen</a></li>
      <li><a href="/admin">/admin</a></li>
    </ul>
  </main>
`;
