export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__copyrigt">© {currentYear} Mesto Russia</p>
    </footer>
  );
}
