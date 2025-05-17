

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrustSealContract, Address} from './TrustSealContractABI.jsx'

import {ethers} from "ethers";

const AddInstitutionPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    address:'',
    location: '',
    imageUrl: '',
    tags: [],
    instAddress: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Provider = new ethers.BrowserProvider(window.ethereum)
    const Signer = await Provider.getSigner()

    const addInstitution = new ethers.Contract(Address,TrustSealContract,Signer )
    const tx = await addInstitution.registerInstitution(form.name,form.address,form.location,form.imageUrl,form.tags,form.instAddress)
    const receipt =  await tx.wait();
    const Hash = receipt.hash


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
  
        <input
          type="text"
          name="instAddress"
          placeholder="instAddress"
          value={form.instAddress}
          onChange={handleChange}
          required
          className="input w-full"
        />
      
        <button onClick={handleSubmit} type="submit" className="btn bg-primary-600 text-white hover:bg-primary-700 w-full">
          Submit Institution

        </button>
      </form>
    </div>
  );
};

export default AddInstitutionPage;
