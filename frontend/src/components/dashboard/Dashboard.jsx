import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        const res = await fetch(`https://taskdistributor-backend-ukj6.onrender.com/api/agents/${userId}`, {
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
      const res = await fetch(`https://taskdistributor-backend-ukj6.onrender.com/api/agents/${agentId}`, {
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
      const res = await fetch(`https://taskdistributor-backend-ukj6.onrender.com/api/tasks/user`, {
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
      <h1 className="text-3xl font-bold text-blue-700 mb-10 text-center">Agent List: {agents.length}</h1>

      {agents.length === 0 ? (
        <p className="text-center text-gray-600 text-base sm:text-lg">No agents available.</p>
      ) : (
        <div className="overflow-x-auto shadow-md">
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead className="bg-blue-100">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-blue-800">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-blue-800">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-blue-800">Phone</th>
                <th className="text-left py-3 px-4 font-semibold text-blue-800">Tasks</th>
                <th className="text-left py-3 px-4 font-semibold text-blue-800">Actions</th>
              </tr>
            </thead>

<tbody>
  {agents.map((agent) => (
    <>
      <tr key={agent._id} className="border-t hover:bg-blue-50">
        {editId === agent._id ? (
            <>
              <td className="py-2 px-4">
                <input type="text" name="name" value={editData.name} onChange={handleEditChange} className="p-1 border rounded w-full" />
              </td>
              <td className="py-2 px-4">
                <input type="email" name="email" value={editData.email} onChange={handleEditChange} className="p-1 border rounded w-full" />
              </td>
              <td className="py-2 px-4">
                <input type="text" name="phone" value={editData.phone} onChange={handleEditChange} className="p-1 border rounded w-full" />
              </td>
              <td className="py-2 px-4 text-gray-600">
                {tasks[agent._id]?.length || 0}
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={handleEditSave}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Save
                </button>
              </td>
            </>
        ) : (
          <>
            <td className="py-2 px-4">{capitalizeName(agent.name)}</td>
            <td className="py-2 px-4">{agent.email}</td>
            <td className="py-2 px-4">{agent.phone}</td>
            <td
              className="py-2 px-4 text-blue-600 font-semibold cursor-pointer"
              onClick={() =>
                setSelectedAgent(
                  selectedAgent && selectedAgent._id === agent._id ? null : agent
                )
              }
            >
              {tasks[agent._id]?.length || 0} {tasks[agent._id]?.length > 0 ? '➜' : ''}
            </td>
            <td className="py-2 px-4 flex gap-3 items-center">
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
            </td>
          </>
        )}
      </tr>

      {/*Expanded Task Row (if selectedAgent matches) */}
      {selectedAgent && selectedAgent._id === agent._id && (
        <tr className="bg-blue-50 border-t">
          <td colSpan="5" className="p-4">
            <div>
              <h3 className="text-lg font-bold text-blue-700 mb-2">
                {capitalizeName(selectedAgent.name)}'s Tasks
              </h3>
              {tasks[agent._id]?.length > 0 ? (
                <table className="w-full text-sm border border-gray-200 rounded overflow-hidden">
                  <thead className="bg-blue-100 text-blue-800">
                    <tr>
                      <th className="py-2 px-3 text-left">#</th>
                      <th className="py-2 px-3 text-left">Name</th>
                      <th className="py-2 px-3 text-left">Phone</th>
                      <th className="py-2 px-3 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks[agent._id].map((task, index) => (
                      <tr key={index} className="hover:bg-blue-100">
                        <td className="py-2 px-3">{index + 1}</td>
                        <td className="py-2 px-3">{task.firstName}</td>
                        <td className="py-2 px-3">{task.phone}</td>
                        <td className="py-2 px-3">{task.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-sm text-gray-600">No tasks assigned.</p>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  ))}
</tbody>


          </table>
        </div>
      )}

      {/* MODAL */}
      {/* {selectedAgent && (
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
      )} */}


    </div>
  );
};

export default Dashboard;
