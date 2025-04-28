import React, { useState, useEffect } from 'react';
import { Contact } from '../models/contact';
import { editContact, getContactsById } from '../dataService/contactsService';
import { useParams,useNavigate } from 'react-router-dom';

const EditContact: React.FC = () => {
  const [form, setForm] = useState<Partial<Contact>>({});
  const { contactId } = useParams();

  const [error, setError] = useState<string | null>(null);  
  const navigate = useNavigate();

  const isFormValid = () => {
    return form.firstName && form.lastName && form.email && form.phoneNumber && form.address && form.city && form.state && form.zipCode;
  };

  const loadContactById = React.useCallback(async () => {
    try {
        const data = await getContactsById(Number(contactId));
        setForm(data);
    } catch (error) {
      console.error("Error loading contact:", error);
    }
  }, [contactId]);

  const contactEdit = async (contact: Contact) => {
      try {
        const response = await editContact(contact);
        if (response?.error) {
          setError(response.error);
          return;
        }
        navigate('/');
    } catch (error) {
      console.error("Error editing contact:", error);
    }
  };

  useEffect(() => {
    loadContactById();
  }, [loadContactById]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

  const handleSubmit = () => {
    contactEdit(form as Contact);
  };

  return (
     <div className="form-container">
      <h4>Edit Contact</h4>    
      <div className="contact-form">
          {form && Object.keys(form)
            .filter(key => key !== 'id')
            .map(field => (
            <div key={field}>
                <input
                    name={field}
                    value={form[field as keyof Contact] || ''}
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

export default EditContact;
