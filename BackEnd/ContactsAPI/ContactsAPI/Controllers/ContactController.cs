using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.Models;
using ContactsAPI.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly IContactService _contactService;
        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }
        // GET: api/<controller>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _contactService.GetAllContactsAsync());
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var contact = await _contactService.GetContactByIdAsync(id);
            if (contact == null)
            {
                return NotFound();
            }
            return Ok(contact);
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Contact contact)
        {
            if (contact == null)
            {
                return BadRequest("Contact cannot be null");
            }
            var result = await _contactService.AddContactAsync(contact);
            if (result == "Contact already exists")
            {
                return Conflict(result);
            }
            return Created(result, new { id = contact.Id });
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Contact contact)
        {
            if (contact == null || contact.Id != id)
            {
                return BadRequest("Contact cannot be null and ID must match");
            }

            var existingContact = await _contactService.GetContactByIdAsync(id);
            if (existingContact == null)
            {
                return NotFound();
            }

            var updateContact = await _contactService.UpdateContactAsync(contact);
            if (updateContact == "Contact already exists")
            {
                return Conflict(updateContact);
            }
            return Ok(updateContact);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _contactService.DeleteContactAsync(id);
            return NoContent();
        }
    }
}
