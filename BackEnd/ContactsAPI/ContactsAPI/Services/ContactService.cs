using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.DBContext;
using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Services
{
    public class ContactService : IContactService
    {
        private readonly ContactsContext _context;

        public ContactService(ContactsContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Contact>> GetAllContactsAsync()
        {
            return await _context.Contacts.ToListAsync();
        }

        public async Task<Contact> GetContactByIdAsync(int id)
        {
            return await _context.Contacts.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<string> AddContactAsync(Contact contact)
        {
            var contactExists = await ContactExists(contact);
            if (contactExists)
            {
                return "Contact already exists";
            }

            await _context.Contacts.AddAsync(contact);
            await _context.SaveChangesAsync();
            return "Contact added successfully";
        }

        public async Task<string> UpdateContactAsync(Contact contact)
        {
            var contactExists = await ContactExists(contact);
            if (contactExists)
            {
                return "Contact already exists";
            }
            _context.Contacts.Update(contact);
            await _context.SaveChangesAsync();
            return "Contact updated successfully";
        }

        public async Task DeleteContactAsync(int id)
        {
            var contact = await GetContactByIdAsync(id);
            if (contact != null)
            {
                _context.Contacts.Remove(contact);
                await _context.SaveChangesAsync();
            }
        }

        private async Task<bool> ContactExists(Contact contact)
        {
            return await _context.Contacts.AnyAsync(c => c.FirstName == contact.FirstName && c.LastName == contact.LastName && c.Email == contact.Email && c.PhoneNumber == contact.PhoneNumber && c.Address == contact.Address && c.City == contact.City && c.State == contact.State && c.ZipCode == contact.ZipCode);
        }
    }
}
