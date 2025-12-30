import './NotFoundPage.css';
import { Header } from '../components/Header.jsx';
import { Link } from 'react-router-dom';

function NotFoundPage() {
      return (
            <>
                  <Header />

                  <main className="notfound-page">
                        <div className="notfound-card">
                              <div className="notfound-graphic" aria-hidden>😕</div>
                              <h1 className="notfound-code">404</h1>
                              <h2 className="notfound-title">Page Not Found</h2>
                              <p className="notfound-message">Sorry :( we couldn't find the page you were looking for.</p>

                              <div className="notfound-actions">
                                    <Link to="/" className="button-primary">Go Home</Link>
                                    <Link to="/orders" className="button-secondary">View Orders</Link>
                              </div>
                        </div>
                  </main>
            </>
      );
}

export { NotFoundPage };

