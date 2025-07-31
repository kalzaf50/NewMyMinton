import React, { useEffect, useState } from 'react';
import './Players.css';
import { SearchBox } from '../components/SearchBox';

const Players = () => {
  // === State Management ===
  const [players, setPlayers] = useState([]);              // Stores list of players
  const [loading, setLoading] = useState(true);            // Shows loading indicator while fetching
  const [showAddForm, setShowAddForm] = useState(false);   // Controls visibility of add/edit form
  const [rowToEdit, setRowToEdit] = useState(null);        // Holds ID of player being edited (if any)

  // Initial state for a new or edited player
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    country: '',
    ranking: '',
    events: '',
    points: '',
  });

  // === Fetch player data from backend API ===
  const fetchPlayers = async () => {
    try {
      setLoading(true); // Show loading while fetching
      const res = await fetch(process.env.REACT_APP_API_PLAYER_URL);
      const data = await res.json();
      setPlayers(data); // Update state with fetched players
    } catch (error) {
      console.error('Failed to fetch players:', error);
    } finally {
      setLoading(false); // Hide loading after fetch
    }
  };

  // === Delete player by ID ===
  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_PLAYER_URL}/${id}`, {
        method: 'DELETE'
      });
      fetchPlayers(); // Refresh list after deletion
    } catch (error) {
      console.error('Failed to delete player:', error);
    }
  };

  // === Edit player (populate form with existing data) ===
  const handleEdit = (player) => {
    setNewPlayer({
      name: player.name || '',
      country: player.country || '',
      ranking: player.ranking || '',
      events: player.events?.[0] || '',
      points: player.points || '',
    });
    setRowToEdit(player._id);     // Mark this row for editing
    setShowAddForm(true);         // Show the form for editing
  };

  // === Submit new or updated player ===
  const handleSubmitPlayer = async () => {
    try {
      const formattedPlayer = { ...newPlayer };

      if (!rowToEdit) {
        // === POST: Add a new player ===
        await fetch(process.env.REACT_APP_API_PLAYER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedPlayer),
        });
      } else {
        // === PUT: Update existing player ===
        await fetch(`${process.env.REACT_APP_API_PLAYER_URL}/${rowToEdit}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formattedPlayer),
        });
      }

      fetchPlayers();         // Refresh list
      setShowAddForm(false);  // Hide form
      setRowToEdit(null);     // Reset edit mode
      resetForm();            // Clear form inputs
    } catch (error) {
      console.error('Failed to submit player:', error);
    }
  };

  // === Reset form fields to empty ===
  const resetForm = () => {
    setNewPlayer({
      name: '',
      country: '',
      ranking: '',
      events: '',
      points: '',
    });
  };

  // === Fetch players on initial load ===
  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <>
      <div className="players-container">
        <h2 className="rankings-title">RANKINGS</h2>

        {/* Search box filters player list */}
        <SearchBox setResults={setPlayers} endpoint="players" />

        {/* Loading indicator */}
        {loading ? (
          <p>Loading players...</p>
        ) : (
          // === Player list table ===
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
                    <td>{player.name?.toUpperCase()}</td>
                    <td>{player.country.toUpperCase()}</td>
                    <td>{player.events?.[0].toUpperCase() || '-'}</td>
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

      {/* Add new player button */}
      <div className="button-container" style={{ justifyContent: 'center' }}>
        <button onClick={() => {
          resetForm();
          setRowToEdit(null);   // Ensure we're not editing
          setShowAddForm(true); // Show form
        }}>
          Add
        </button>
      </div>

      {/* === Add/Edit form === */}
      {showAddForm && (
        <div className="players-container">
          <table className="rankings-table">
            <tbody>
              <tr>
                {/* Input fields for each player property */}
                <td>
                  <input
                    placeholder="Insert ranking"
                    value={newPlayer.ranking}
                    onChange={(e) => setNewPlayer({ ...newPlayer, ranking: e.target.value })}
                    style={{ width: '100%', border: 'none', fontSize: '1em' }}
                  />
                </td>
                <td>
                  <input
                    placeholder="Insert name"
                    value={newPlayer.name}
                    onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                    style={{ width: '100%', border: 'none', fontSize: '1em' }}
                  />
                </td>
                <td>
                  <input
                    placeholder="Insert Country"
                    value={newPlayer.country}
                    onChange={(e) => setNewPlayer({ ...newPlayer, country: e.target.value })}
                    style={{ width: '100%', border: 'none', fontSize: '1em' }}
                  />
                </td>
                <td>
                  <input
                    placeholder="Insert Category"
                    value={newPlayer.events}
                    onChange={(e) => setNewPlayer({ ...newPlayer, events: e.target.value })}
                    style={{ width: '100%', border: 'none', fontSize: '1em' }}
                  />
                </td>
                <td>
                  <input
                    placeholder="Insert Points"
                    value={newPlayer.points}
                    onChange={(e) => setNewPlayer({ ...newPlayer, points: e.target.value })}
                    style={{ width: '100%', border: 'none', fontSize: '1em' }}
                  />
                </td>
                <td>
                  <div className="button-container" style={{ justifyContent: 'right' }}>
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
