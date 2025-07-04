import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const AllTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await fetch('http://localhost:5000/api/tasks/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setTasks(data);
        } else {
          toast.error(data.message || 'Failed to fetch tasks');
        }
      } catch (err) {
        toast.error('Error fetching tasks');
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-12">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Total Tasks ({tasks.length})
      </h1>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-600 text-base">No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tasks.map((task, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow p-4 border border-blue-100"
            >
              <h2 className="text-lg font-semibold text-blue-700 mb-2">
                {task.firstName}
              </h2>
              <p className="text-gray-700 text-sm">
                <strong>Phone:</strong> {task.phone}
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Email:</strong> {task.email}
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Notes:</strong> {task.notes}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTask;
