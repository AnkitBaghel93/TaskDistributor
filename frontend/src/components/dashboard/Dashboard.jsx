import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';

const Dashboard = () => {
  const [agents, setAgents] = useState([]);
  const [tasks, setTasks] = useState({});
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '', phone: '' });
  const [selectedAgent, setSelectedAgent] = useState(null);
  const userId = localStorage.getItem('userId');

  const capitalizeName = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  useEffect(() => {
    const fetchAgents = async () => {
      const token = localStorage.getItem('token');
      if (!userId || !token) {
        toast.error('Missing auth token or user ID');
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/agents/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setAgents(data);
        else throw new Error(data.message || 'Failed to fetch agents');
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchAgents();
  }, [userId]);

  const handleDelete = async (agentId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/agents/${agentId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setAgents(prev => prev.filter(a => a._id !== agentId));
        toast.success('Agent deleted');
      } else {
        toast.error(data.message || 'Failed to delete agent');
      }
    } catch (error) {
      toast.error('Error deleting agent');
    }
  };

  const handleEditClick = (agent) => {
    setEditId(agent._id);
    setEditData(agent);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/agents/${editData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      if (res.ok) {
        setAgents(prev => prev.map(a => (a._id === data._id ? data : a)));
        toast.success('Agent updated');
        setEditId(null);
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch (error) {
      toast.error('Error updating agent');
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/tasks/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        const grouped = {};
        data.forEach(task => {
          const agentId = (task.agentId?._id || task.agentId)?.toString();
          if (!grouped[agentId]) grouped[agentId] = [];
          grouped[agentId].push(task);
        });
        setTasks(grouped);
      }
    };

    if (userId) fetchTasks();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-12">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-blue-700 mb-10 text-center">Agent List : {agents.length}</h1>

      {agents.length === 0 ? (
        <p className="text-center text-gray-600 text-base sm:text-lg">No agents available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
          {agents.map((agent) => (
            <div
              key={agent._id}
              className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between relative"
            >
              {editId === agent._id ? (
                <>
                  <input type="text" name="name" value={editData.name} onChange={handleEditChange} className="mb-2 p-2 border rounded" />
                  <input type="email" name="email" value={editData.email} onChange={handleEditChange} className="mb-2 p-2 border rounded" />
                  <input type="text" name="phone" value={editData.phone} onChange={handleEditChange} className="mb-4 p-2 border rounded" />
                  <button onClick={handleEditSave} className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">Save</button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-blue-700">{capitalizeName(agent.name)}</h2>

                  <button
                    onClick={() => setSelectedAgent(agent)}
                    className="mt-3 inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium px-4 py-1 rounded-full hover:shadow-md transition-all duration-300"
                  >
                    View Details
                  </button>

                  <div className="absolute top-3 right-3 flex gap-3">
                    <button onClick={() => handleEditClick(agent)} className="text-blue-600 hover:text-blue-800" title="Edit">
                      <FiEdit size={18} />
                    </button>
                    <button onClick={() => handleDelete(agent._id)} className="text-red-600 hover:text-red-800" title="Delete">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {selectedAgent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full relative m-4">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-lg"
              onClick={() => setSelectedAgent(null)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-blue-700 mb-4">{capitalizeName(selectedAgent.name)}</h2>
            <p className="text-gray-700 mb-1"><strong>Email:</strong> {selectedAgent.email}</p>
            <p className="text-gray-700 mb-1"><strong>Phone:</strong> {selectedAgent.phone}</p>
            <p className="text-gray-700 mb-3"><strong>Total Tasks:</strong> {tasks[selectedAgent._id]?.length || 0}</p>

            {tasks[selectedAgent._id]?.length > 0 ? (
              <ul className="list-disc list-inside text-sm max-h-48 overflow-y-auto pr-2">
                {tasks[selectedAgent._id].map((task, idx) => (
                  <li key={idx}>
                    <strong>{task.firstName}</strong> — {task.phone}, {task.notes}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No tasks assigned.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
