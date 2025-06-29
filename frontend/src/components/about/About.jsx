import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-10 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-6 tracking-tight">
          About Us
        </h1>

        <p className="text-lg text-gray-800 mb-5 leading-relaxed">
          <strong className="text-blue-600">CSTech InfoSolutions</strong> is a powerful application built to enhance productivity by simplifying how organizations manage and distribute workloads.
        </p>

        <p className="text-gray-700 mb-5 text-base leading-7">
          This platform is ideal for teams that frequently work with large datasets — such as contact lists, leads, or customer information. Instead of spending hours manually distributing tasks, admins can upload a CSV or Excel file, and the system automatically shares the entries among agents.
        </p>

        <p className="text-gray-700 mb-5 text-base leading-7">
          The distribution is equal and intelligent. If 25 contacts are uploaded, each of the 5 agents will receive 5 entries. If the numbers don’t divide evenly, the remaining ones are assigned smartly without any confusion.
        </p>

        <p className="text-gray-700 mb-5 text-base leading-7">
          Admins can also add and manage agents easily through a user-friendly dashboard. Each agent has their own record with essential details, and assigned data can be tracked transparently.
        </p>

        <p className="text-gray-700 mb-5 text-base leading-7">
          With a secure login system and smooth task delegation, <span className="text-blue-600 font-medium">CSTech InfoSolutions</span> ensures that teams stay focused on execution rather than administration.
        </p>

        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mt-6">
          “We believe that technology should simplify your process, not complicate it.”
        </blockquote>
      </div>
    </div>
  );
};

export default AboutUs;
