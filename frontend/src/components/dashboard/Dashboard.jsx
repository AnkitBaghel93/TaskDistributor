import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';

const Dashboard = () => {
  const [agents, setAgents] = useState([]);
  const [tasks, setTasks] = useState({});
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: '', email: '', phone: '' });
  const userId = localStorage.getItem('userId'); 


  useEffect(() => {
    const fetchAgents = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    // console.log('userId:', userId, 'token:', token);

      if (!userId || !token) {
        toast.error('Missing auth token or user ID');
        return;
      }

      try {
        const res = await fetch(`https://taskdistributor-backend-ukj6.onrender.com/api/agents/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        // console.log('Fetched agents:', data);

        if (res.ok) {
          setAgents(data);
        } else {
          throw new Error(data.message || 'Failed to fetch agents');
        }
        } catch (err) {
          toast.error(err.message);
        }
      };

        fetchAgents();
      }, []);

  const handleDelete = async (agentId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://taskdistributor-backend-ukj6.onrender.com/api/agents/${agentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          },
         });

      const data = await res.json();
      if (res.ok) {
        setAgents((prev) => prev.filter((a) => a._id !== agentId));
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
    console.log('Saving...', editData);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://taskdistributor-backend-ukj6.onrender.com/api/agents/${editData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });

      const data = await res.json();
      if (res.ok) {
        setAgents((prev) =>
          prev.map((a) => (a._id === data._id ? data : a))
        );
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
    const res = await fetch(`https://taskdistributor-backend-ukj6.onrender.com/api/tasks/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        },
      });

    const data = await res.json();
    if (res.ok) {
        const grouped = {};
        data.forEach(task => {
        const agentId = (task.agentId?._id || task.agentId)?.toString();
        if (!grouped[agentId]) grouped[agentId] = [];
        grouped[agentId].push(task);
      });

      // console.log('Grouped tasks:', grouped); 
      setTasks(grouped);
      }
    };

      if (userId) fetchTasks();
    }, [userId]);




  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-12">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-blue-700 mb-10 text-center">Agent Dashboard</h1>

      {agents.length === 0 ? (
        <p className="text-center text-gray-600 text-base sm:text-lg">No agents available.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {agents.map((agent) => (
            <div
              key={agent._id}
              className="bg-white shadow-lg rounded-xl p-4 w-full max-w-xs relative min-h-[180px] flex flex-col justify-between"
            >
              {editId === agent._id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    className="mb-2 w-full p-2 border rounded text-sm sm:text-base"
                  />
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleEditChange}
                    className="mb-2 w-full p-2 border rounded text-sm sm:text-base"
                  />
                  <input
                    type="text"
                    name="phone"
                    value={editData.phone}
                    onChange={handleEditChange}
                    className="mb-4 w-full p-2 border rounded text-sm sm:text-base"
                  />
                  <button
                    onClick={handleEditSave}
                    className="bg-green-600 text-white font-semibold px-4 py-1 rounded-md hover:bg-green-700"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-blue-600 mb-1">{agent.name}</h2>
                    <p className="text-gray-700 text-sm sm:text-base"><strong>Email:</strong> {agent.email}</p>
                    <p className="text-gray-700 text-sm sm:text-base"><strong>Phone:</strong> {agent.phone}</p>
                  </div>

                    {/* 🧾 Render tasks under this agent */}
                  {tasks[agent._id]?.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-800 mb-1">Tasks:</h4>
                      <ul className="list-disc list-inside text-xs text-gray-700 space-y-1 max-h-32 overflow-auto pr-1">
                        {tasks[agent._id].map((task, index) => (
                          <li key={index}>
                            <strong>{task.firstName}</strong> — {task.phone}, {task.notes}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 flex gap-3">
                  <button
                    onClick={() => handleEditClick(agent)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(agent._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>

                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
