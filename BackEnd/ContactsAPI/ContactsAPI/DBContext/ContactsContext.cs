using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.DBContext
{
    public class ContactsContext : DbContext
    {
        public ContactsContext(DbContextOptions<ContactsContext> options) : base(options)
        {

        }

        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>().HasData(
                 new Contact { Id = 1, FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", PhoneNumber = "1234567890", Address = "123 Main St", City = "New York", State = "NY", ZipCode = "10001" },
                 new Contact { Id = 2, FirstName = "Jane", LastName = "Smith", Email = "jane.smith@example.com", PhoneNumber = "2345678901", Address = "456 Oak St", City = "Los Angeles", State = "CA", ZipCode = "90001" },
                 new Contact { Id = 3, FirstName = "Michael", LastName = "Johnson", Email = "michael.johnson@example.com", PhoneNumber = "3456789012", Address = "789 Pine St", City = "Chicago", State = "IL", ZipCode = "60007" },
                 new Contact { Id = 4, FirstName = "Emily", LastName = "Williams", Email = "emily.williams@example.com", PhoneNumber = "4567890123", Address = "101 Maple St", City = "Houston", State = "TX", ZipCode = "77001" },
                 new Contact { Id = 5, FirstName = "David", LastName = "Brown", Email = "david.brown@example.com", PhoneNumber = "5678901234", Address = "202 Cedar St", City = "Phoenix", State = "AZ", ZipCode = "85001" },
                 new Contact { Id = 6, FirstName = "Sarah", LastName = "Jones", Email = "sarah.jones@example.com", PhoneNumber = "6789012345", Address = "303 Birch St", City = "Philadelphia", State = "PA", ZipCode = "19019" },
                 new Contact { Id = 7, FirstName = "Chris", LastName = "Garcia", Email = "chris.garcia@example.com", PhoneNumber = "7890123456", Address = "404 Elm St", City = "San Antonio", State = "TX", ZipCode = "78201" },
                 new Contact { Id = 8, FirstName = "Jessica", LastName = "Martinez", Email = "jessica.martinez@example.com", PhoneNumber = "8901234567", Address = "505 Walnut St", City = "San Diego", State = "CA", ZipCode = "92101" },
                 new Contact { Id = 9, FirstName = "Daniel", LastName = "Rodriguez", Email = "daniel.rodriguez@example.com", PhoneNumber = "9012345678", Address = "606 Ash St", City = "Dallas", State = "TX", ZipCode = "75201" },
                 new Contact { Id = 10, FirstName = "Laura", LastName = "Hernandez", Email = "laura.hernandez@example.com", PhoneNumber = "0123456789", Address = "707 Spruce St", City = "San Jose", State = "CA", ZipCode = "95101" }
             );
        }
        
    }
}