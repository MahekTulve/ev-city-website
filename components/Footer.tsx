export default function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem', background: '#222', color: '#fff', marginTop: 'auto' }}>
      <p>&copy; {new Date().getFullYear()} EV City. All rights reserved.</p>
    </footer>
  );
}