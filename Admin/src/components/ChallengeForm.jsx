import React, { useState, useEffect } from "react";

function ChallengeForm() {
  const [formData, setFormData] = useState({
    logo: "",
    title: "",
    fundingAmount: "",
    description: "",
    deadline: "",
    visible: true,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/challenges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage("Challenge created successfully!");
        setFormData({
          logo: "",
          title: "",
          fundingAmount: "",
          description: "",
          deadline: "",
          visible: true,
        });
        // Clear message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Error creating challenge");
      }
    } catch (err) {
      setMessage("Error connecting to server");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
            Create New Challenge
          </h3>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.includes("success")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Logo URL with Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo URL
              </label>
              <div className="mt-1 flex gap-4 items-start">
                <input
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  className="flex-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="https://example.com/logo.png"
                  required
                />
                {formData.logo && (
                  <img
                    src={formData.logo}
                    alt="Logo preview"
                    className="h-12 w-12 rounded-md object-cover"
                  />
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>

            {/* Funding Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Funding Amount
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="fundingAmount"
                  value={formData.fundingAmount}
                  onChange={handleChange}
                  className="block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>

            {/* Visible Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="visible"
                checked={formData.visible}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Visible
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Create Challenge
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChallengeForm;
