

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddInstitutionPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    address:'',
    location: '',
    imageUrl: '',
    tags: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here (e.g. call API or save to state/store)
    console.log('Institution added:', form);
    navigate('/institutions'); // Redirect after submission
  };

  return (
    <div className="container-custom py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Add a New Institution</h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 bg-white p-6 rounded-xl shadow">
        <input
          type="text"
          name="name"
          placeholder="Institution Name"
          value={form.name}
          onChange={handleChange}
          required
          className="input w-full"
        />
         <input
          type="string"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        required
          className="input w-full"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
          className="input w-full"
        />
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          required
          className="input w-full"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={handleChange}
          required
          className="input w-full"
        />
        <button type="submit" className="btn bg-primary-600 text-white hover:bg-primary-700 w-full">
          Submit Institution
        </button>
      </form>
    </div>
  );
};

export default AddInstitutionPage;
