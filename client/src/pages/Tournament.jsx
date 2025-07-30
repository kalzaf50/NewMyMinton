import React, { useEffect, useState } from 'react';
import './Players.css';
import { SearchBox } from '../components/SearchBox';

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [newTournament, setNewTournament] = useState({
    name: '',
    date: '',
    location: '',
  });

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tournaments`);
      const data = await res.json();
      setTournaments(data);
    } catch (error) {
      console.error('Failed to fetch tournaments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/tournaments/${id}`, {
        method: 'DELETE',
      });
      fetchTournaments();
    } catch (error) {
      console.error('Failed to delete tournament:', error);
    }
  };

  const handleEdit = (tournament) => {
    setNewTournament({
      name: tournament.name || '',
      date: tournament.date?.slice(0, 10) || '',
      location: tournament.location || '',
    });
    setRowToEdit(tournament._id);
    setShowAddForm(true);
  };

  const handleSubmitTournament = async () => {
    try {
      const formatted = { ...newTournament };

      const url = `${process.env.REACT_APP_API_BASE_URL}/tournaments${rowToEdit ? `/${rowToEdit}` : ''}`;
      const method = rowToEdit ? 'PUT' : 'POST';

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formatted),
      });

      fetchTournaments();
      setShowAddForm(false);
      setRowToEdit(null);
      resetForm();
    } catch (error) {
      console.error('Failed to submit tournament:', error);
    }
  };

  const resetForm = () => {
    setNewTournament({ name: '', date: '', location: '' });
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <>
      <div className="players-container">
        <h2 className="rankings-title">TOURNAMENTS</h2>

        <SearchBox setResults={setTournaments} endpoint="tournaments" />

        {loading ? (
          <p>Loading tournaments...</p>
        ) : (
          <div className="table-container">
            <table className="rankings-table">
              <thead>
                <tr>
                  <th>Tournament</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tournaments.map((t) => (
                  <tr key={t._id}>
                    <td>
                      <div style={{ whiteSpace: 'pre-line' }}>
                        <strong>{t.name.toUpperCase()}</strong>
                        <br />
                        <span style={{ color: 'red', marginRight: '10px' }}>
                          {new Date(t.date).toLocaleDateString()}
                        </span>
                        <span>{t.location}</span>
                      </div>
                    </td>
                    <td>
                      <div className="button-container">
                        <button onClick={() => handleEdit(t)}>Edit</button>
                        <button onClick={() => handleDelete(t._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="button-container" style={{ justifyContent: 'center' }}>
        <button
          onClick={() => {
            resetForm();
            setRowToEdit(null);
            setShowAddForm(true);
          }}
        >
          Add
        </button>
      </div>

      {showAddForm && (
        <div className="players-container">
          <table className="rankings-table">
            <tbody>
              <tr>
                <td>
                  <input
                    placeholder="Name"
                    value={newTournament.name}
                    onChange={(e) => setNewTournament((prev) => ({ ...prev, name: e.target.value }))}
                    style={{ width: '100%', border: 'none', fontSize: '1em' }}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={newTournament.date}
                    onChange={(e) => setNewTournament((prev) => ({ ...prev, date: e.target.value }))}
                    style={{ width: '100%', border: 'none', fontSize: '1em' }}
                  />
                </td>
                <td>
                  <input
                    placeholder="Location"
                    value={newTournament.location}
                    onChange={(e) => setNewTournament((prev) => ({ ...prev, location: e.target.value }))}
                    style={{ width: '100%', border: 'none', fontSize: '1em' }}
                  />
                </td>
                <td>
                  <div className="button-container" style={{ justifyContent: 'right' }}>
                    <button onClick={handleSubmitTournament}>{rowToEdit ? 'Update' : 'Submit'}</button>
                    <button
                      onClick={() => {
                        setShowAddForm(false);
                        setRowToEdit(null);
                        resetForm();
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 style={{ marginTop: '10px' }}>{rowToEdit ? 'Edit Tournament' : 'Add New Tournament'}</h3>
        </div>
      )}
    </>
  );
};

export default Tournaments;
