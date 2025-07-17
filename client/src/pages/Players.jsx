import React, { useEffect, useState } from 'react';
import './Players.css';
import { PlaceSearchBox } from '../components/PlaceSearchBox';

const Players = () => {

  // State management
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [rowToEdit, setRowToEdit] = useState(null);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    country: '',
    ranking: '',
    events: '',
    points: '',
  });

  // Fetch players from backend (somehting)
  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/players');
      const data = await res.json();
      setPlayers(data);
    } catch (error) {
      console.error('Failed to fetch players:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete player
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/players/${id}`, { method: 'DELETE' });
      fetchPlayers();
    } catch (error) {
      console.error('Failed to delete player:', error);
    }
  };

  // Edit player
  const handleEdit = (player) => {
    setNewPlayer({
      name: player.name || '',
      country: player.country || '',
      ranking: player.ranking || '',
      events: player.events?.[0] || '',
      points: player.points || '',
    });
    setRowToEdit(player._id);
    setShowAddForm(true);
  };

  // Create/Update player
  const handleSubmitPlayer = async () => {
    try {
      const formattedPlayer = {
        ...newPlayer,
        events: [newPlayer.events],
        points: parseInt(newPlayer.points),
        ranking: parseInt(newPlayer.ranking),
        height_cm: parseInt(newPlayer.height_cm),
        birthdate: new Date(newPlayer.birthdate),
      };

      if (!rowToEdit) {
        // POST for new player
        await fetch('http://localhost:5000/players', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedPlayer),
        });
      } else {
        // PUT for updating existing player
        await fetch(`http://localhost:5000/players/${rowToEdit}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedPlayer),
        });
      }

      fetchPlayers();
      setShowAddForm(false);
      setRowToEdit(null);
      resetForm();
    } catch (error) {
      console.error('Failed to submit player:', error);
    }
  };

  const resetForm = () => {
    setNewPlayer({
      name: '',
      country: '',
      ranking: '',
      events: '',
      points: '',
    });
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <>
      <div className="players-container">
        <h2 className="rankings-title">RANKINGS</h2>

        <PlaceSearchBox setResults={setPlayers} />

        {loading ? (
          <p>Loading players...</p>
        ) : (
          <div className="table-container">
            <table className="rankings-table">
              <thead>
                <tr>
                  <th>Ranking</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Category</th>
                  <th>Points</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player._id}>
                    <td>{player.ranking}</td>
                    <td>{player.name}</td>
                    <td>{player.country}</td>
                    <td>{player.events?.[0] || '-'}</td>
                    <td>{player.points?.toLocaleString()}</td>
                    <td>
                      <div className="button-container">
                        <button onClick={() => handleEdit(player)}>Edit</button>
                        <button onClick={() => handleDelete(player._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="button-container" style={{ justifyContent: 'center'}}>
        <button onClick={() => {
          resetForm();
          setRowToEdit(null);
          setShowAddForm(true);
        }}>Add</button>
      </div>
      
      {showAddForm && (
        <div className="players-container">
          <table className="rankings-table">
            <tbody>
              <tr>
                <td>
                  <input
                    placeholder="Insert ranking"
                    value={newPlayer.ranking}
                    onChange={(e) => setNewPlayer({ ...newPlayer, ranking: e.target.value })}
                    style={{ width: '100%', border: 'none', fontSize:'1em' }}
                  />
                </td>
                <td>
                  <input
                    placeholder="Insert name"
                    value={newPlayer.name}
                    onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                    style={{ width: '100%', border: 'none', fontSize:'1em' }}
                  />
                </td>
                <td>
                  <input
                    placeholder="Insert Country"
                    value={newPlayer.country}
                    onChange={(e) => setNewPlayer({ ...newPlayer, country: e.target.value })}
                    style={{ width: '100%', border: 'none', fontSize:'1em' }}
                  />
                </td>
                <td>
                  <input
                    placeholder="Insert Category"
                    value={newPlayer.events}
                    onChange={(e) => setNewPlayer({ ...newPlayer, events: e.target.value })}
                    style={{ width: '100%', border: 'none', fontSize:'1em' }}
                  />
                </td>
                <td>
                  <input
                    placeholder="Insert Points"
                    value={newPlayer.points}
                    onChange={(e) => setNewPlayer({ ...newPlayer, points: e.target.value })}
                    style={{ width: '100%', border: 'none', fontSize:'1em' }}
                  />
                </td>
                <td>
                  <div className="button-container" style={{ justifyContent: 'right'}}>
                    <button onClick={handleSubmitPlayer}>
                      {rowToEdit ? 'Update' : 'Submit'}
                    </button>
                    <button onClick={() => {
                      setShowAddForm(false);
                      setRowToEdit(null);
                      resetForm();
                    }}>
                    Cancel
                  </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 style={{ marginTop: '10px' }}>
            {rowToEdit ? 'Edit Player' : 'Add New Player'}
          </h3>
        </div>
      )}
    </>
  );
};

export default Players;