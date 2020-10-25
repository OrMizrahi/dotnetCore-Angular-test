using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly CustomerDbContext _context;

        public CustomersController(CustomerDbContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustDataTable()
        {
            return await _context.CustDataTable.ToListAsync();
        }


        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Customer>>> Search([FromQuery(Name = "selectedIdentifier")] string selectedIdentifier, [FromQuery(Name = "val")] int val)
        {
            if (selectedIdentifier == "Identity Number")
            {
                var result = _context.CustDataTable.Where(c => c.IdentityNumber == val);
                if (result != null)
                    return await result.ToListAsync();
            }
            else
            {
                var result = _context.CustDataTable.Where(c => c.Phone == val);
                if (result != null)
                    return await result.ToListAsync();
            }

            return null;
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.CustDataTable.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            if (id != customer.IdentityNumber)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Customers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            var c = await _context.CustDataTable.FindAsync(customer.IdentityNumber);
            if(c == null)
            {
                _context.CustDataTable.Add(customer);
            }
            else
            {
                c.LastName = customer.LastName;
                c.Phone = customer.Phone;
                c.FirstName = customer.FirstName;
                c.Comments = customer.Comments;
                c.DateOfBirth = customer.DateOfBirth;
                _context.Entry(c).State = EntityState.Modified;
            }
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetCustomer", new { id = customer.IdentityNumber }, customer);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Customer>> DeleteCustomer(int id)
        {
            var customer = await _context.CustDataTable.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.CustDataTable.Remove(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        private bool CustomerExists(int id)
        {
            return _context.CustDataTable.Any(e => e.IdentityNumber == id);
        }
    }
}
