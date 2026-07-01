export function Footer() {
  return (
    <footer className="footer-container">
      <div className="container" style={{ padding: '0 24px 32px' }}>
        <div className="footer">
          <p className="footer-text">
            © {new Date().getFullYear()} Mohammed Zaid Khan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
