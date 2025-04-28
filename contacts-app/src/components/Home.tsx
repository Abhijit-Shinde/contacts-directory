import React, { useEffect, useState } from 'react';
import { Contact } from '../models/contact';
import ContactList from './ContactList';
import { deleteContact, getContacts } from '../dataService/contactsService';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const Home: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const loadContacts = async () => {
        try {
            const data = await getContacts();
            setContacts(data);
            setLoading(false);
        } catch (error) {
            console.error("Error loading contacts:", error);
        }
    }        
    
  useEffect(() => { 
      loadContacts();
  })

  const handleDelete = async (id: number) => {
    try {
        await deleteContact(id);
    } catch (error) {
        console.error("Error deleting contact:", error);
    }
  };

  const filteredContacts = contacts.filter(c =>
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );
    
  if (loading) {
      return (
          <div className="loader" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Loader />
          </div>
        );
  }

  return (
        <div className="container">
            <div className="top-bar">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  disabled={contacts.length === 0}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <Link to={"/add"}><button>ADD</button></Link>
            </div>

            <ContactList
                contacts={filteredContacts}
                onDelete={handleDelete}
            />
        </div>
    );

};

export default Home;
