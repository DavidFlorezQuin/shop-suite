using Domain.Entities;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/products
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }

        // GET api/products/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound();
            return Ok(product);
        }

        // POST api/products
        [HttpPost]
        public async Task<IActionResult> Create(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }

        // PUT api/products/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, Product product)
        {
            var existing = await _context.Products.FindAsync(id);
            if (existing == null)
                return NotFound();

            existing.Name = product.Name;
            existing.Price = product.Price;
            existing.Stock = product.Stock;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE api/products/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
                return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
