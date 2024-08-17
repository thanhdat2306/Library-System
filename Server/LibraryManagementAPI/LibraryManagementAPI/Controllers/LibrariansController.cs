using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryManagementAPI.Data;
using LibraryManagementAPI.Models;
using LibraryManagementAPI.Services.Contracts;
using Microsoft.AspNetCore.Identity;

namespace LibraryManagementAPI.Controllers
{
    [Route("api/librarians")]
    [ApiController]
    public class LibrariansController(LibraryDbContext context, ILibrarianService librarianService) : ControllerBase
    {
        private readonly LibraryDbContext _context = context;
        private readonly ILibrarianService _librarianService = librarianService;
        private readonly PasswordHasher<string> _passwordHasher = new();

        [HttpPost("try-to-log-in")]
        public async Task<IActionResult> TryToLogIn(LogInDto logInDto)
        {
            Librarian? librarian = _context.Librarians.SingleOrDefault(l => l.Login == logInDto.Login);
            if (librarian == null) return Unauthorized("Invalid credentials");

            PasswordVerificationResult result = _passwordHasher.VerifyHashedPassword(librarian.LastName, librarian.Password, logInDto.Password);

            if (result == PasswordVerificationResult.Failed) return Unauthorized("Invalid credentials");
            else if (result == PasswordVerificationResult.SuccessRehashNeeded)
            { 
                RehashPassword(librarian);
            }
            return Ok(new { id = librarian.Id , fullName = $"{librarian.FirstName} {librarian.LastName}" });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutLibrarian(int id, Librarian librarian)
        {
            if (id != librarian.Id)
            {
                return BadRequest();
            }

            _context.Entry(librarian).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_librarianService.ExistById(id))
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

        [HttpPost]
        public async Task<ActionResult<Librarian>> PostLibrarian(Librarian librarian)
        {
            librarian.Password = _passwordHasher.HashPassword(librarian.LastName, librarian.Password);
            _context.Librarians.Add(librarian);
            await _context.SaveChangesAsync();

            return Created();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLibrarian(int id)
        {
            var librarian = await _context.Librarians.FindAsync(id);
            if (librarian == null)
            {
                return NotFound();
            }

            _context.Librarians.Remove(librarian);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async void RehashPassword(Librarian librarian)
        {
            string newPassword = _passwordHasher.HashPassword(librarian.LastName, librarian.Password);
            librarian.Password = newPassword;
            await PutLibrarian(librarian.Id, librarian);
        }
    }
}
