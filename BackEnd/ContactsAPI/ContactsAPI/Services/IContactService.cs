using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.Models;

namespace ContactsAPI.Services
{
    public interface IContactService
    {
        Task<IEnumerable<Contact>> GetAllContactsAsync();
        Task<Contact> GetContactByIdAsync(int id);
        Task<string> AddContactAsync(Contact contact);
        Task<string> UpdateContactAsync(Contact contact);
        Task DeleteContactAsync(int id);
    }
}
