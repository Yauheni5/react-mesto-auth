export default function Footer() {
  const currenYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__copyrigt">© {currenYear} Mesto Russia</p>
    </footer>
  );
}
