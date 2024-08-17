using LibraryManagementAPI.Data;
using LibraryManagementAPI.Models;
using LibraryManagementAPI.Services.Contracts;

namespace LibraryManagementAPI.Services.Implementations
{
    public class LibrarianService(LibraryDbContext context) : ILibrarianService
    {
        private readonly LibraryDbContext _context = context;

        public bool ExistById(int id)
        {
            bool librarian = _context.Librarians.Any(b => b.Id == id);
            return librarian;
        }
    }
}
