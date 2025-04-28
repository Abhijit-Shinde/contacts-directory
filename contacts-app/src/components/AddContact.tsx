import React, { useState } from 'react';
import { Contact } from '../models/contact';
import { addContact } from '../dataService/contactsService';
import { useNavigate } from 'react-router-dom';

const AddContact: React.FC = () => {
  const [form, setForm] = useState<Omit<Contact, 'id'>>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [error, setError] = useState<string | null>(null);  
  const navigate = useNavigate();

  const isFormValid = () => {
    return form.firstName && form.lastName && form.email && form.phoneNumber && form.address && form.city && form.state && form.zipCode;
  };

  const contactAdd = async (contact: Contact) => {
        try {
          const response = await addContact(contact);
          if (response?.error) {
            setError(response.error);
            return;
          }
          navigate('/');
        } catch (error) {
            console.error("Error adding contact:", error);
        }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const newContact: Contact = {
      id: 0,
      ...form,
      };
    contactAdd(newContact);
  };

  return (
    <div className="form-container">
      <h4>Add Contact</h4>    
      <div className="contact-form">
        {Object.keys(form).map(field => (
          <div key={field} className="form-field">
            <input
              name={field}
              placeholder={field.toUpperCase()}
              onChange={handleChange}
            />
          </div>
        ))}
        <button className="save-button" onClick={handleSubmit} disabled={!isFormValid()}>SAVE</button>
      </div>
        {error && <h3 style={{ color: 'red', alignItems:'center' }}>{error}</h3>}
    </div>
  );
};

export default AddContact;