import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await fetch('https://taskdistributor-backend-ukj6.onrender.com/api/tasks/user', {
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

  const capitalize = (str) =>
    str?.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4 sm:px-6 py-10">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">
        All Tasks ({tasks.length})
      </h1>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-600 text-base">No tasks found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-blue-700">#</th>
                <th className="px-4 py-3 text-left font-semibold text-blue-700">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-blue-700">Phone</th>
                
                <th className="px-4 py-3 text-left font-semibold text-blue-700">Notes</th>
                <th className="px-4 py-3 text-left font-semibold text-blue-700">Assigned Agent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tasks.map((task, idx) => (
                <tr key={idx} className="hover:bg-blue-50">
                  <td className="px-4 py-2 font-medium text-gray-600">{idx + 1}</td>
                  <td className="px-4 py-2">{capitalize(task.firstName)}</td>
                  <td className="px-4 py-2">{task.phone}</td>
                  
                  <td className="px-4 py-2 text-sm text-gray-700">{task.notes}</td>
                  <td className="px-4 py-2 font-semibold text-blue-600">
                    {task.agentId?.name
                      ? capitalize(task.agentId.name)
                      : 'Unassigned'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllTask;
