import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }
        const result = await response.json();
        setUsers(result);
      } catch (fetchError) {
        setError(`Could not load users: ${fetchError.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  return (
    <main>
      <section className="counter-section" aria-label="Counter">
        <label>Counter: {counter}</label>
        <button type="button" onClick={() => setCounter((value) => value + 1)}>
          Increment
        </button>
        <button type="button" onClick={() => setCounter((value) => value - 1)}>
          Decrement
        </button>
      </section>
      <h2>All User Details</h2>
      {loading && <p role="status">Loading users...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && (
        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Address</th>
                <th>Coordinates</th>
               
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.phone}</td>
                  <td>
                    <a href={`https://${user.website}`} target="_blank" rel="noreferrer">
                      {user.website}
                    </a>
                  </td>
                  <td>
                    {user.address.street}, {user.address.suite}, {user.address.city},{' '}
                    {user.address.zipcode}
                  </td>
                  <td>
                    {user.address.geo.lat}, {user.address.geo.lng}
                  </td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};
export default App;
