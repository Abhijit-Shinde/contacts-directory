import React from 'react';
import { Contact } from '../models/contact';
import { Link } from 'react-router-dom';

interface Props {
  contacts: Contact[];
  onDelete: (id: number) => void;
}

const ContactList: React.FC<Props> = ({ contacts, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>FirstName</th><th>LastName</th><th>Email</th><th>Phone</th>
          <th>Address</th><th>City</th><th>State</th><th>Zip</th><th>Action</th>
        </tr>
      </thead>
      <tbody>
        {contacts.length > 0 ? contacts.map(contact => (
          <tr key={contact.id}>
            <td>{contact.firstName}</td>
            <td>{contact.lastName}</td>
            <td>{contact.email}</td>
            <td>{contact.phoneNumber}</td>
            <td>{contact.address}</td>
            <td>{contact.city}</td>
            <td>{contact.state}</td>
            <td>{contact.zipCode}</td>
            <td>
              <Link to={`edit/${contact.id}`}><button style={{ backgroundColor: "lightblue"}}>EDIT</button></Link>
              <button style={{ backgroundColor: "#ff4d4d"}} onClick={() => onDelete(contact.id)}>DELETE</button>
            </td>
          </tr>
        )) : (
          <tr>
            <td colSpan={9} style={{textAlign: 'center'}}>No Records Present</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ContactList;
