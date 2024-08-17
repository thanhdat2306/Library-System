using LibraryManagementAPI.Data;
using LibraryManagementAPI.Models;
using LibraryManagementAPI.Services.Contracts;

namespace LibraryManagementAPI.Services.Implementations
{
    public class BorrowerService(LibraryDbContext context) : IBorrowerService
    {
        private readonly LibraryDbContext _context = context;

        public List<BorrowerDto> GetDtoBorrowers()
        {
            var dtoBorrowers = _context.Borrowers.Select(
                b => new BorrowerDto {
                    Id = b.Id,
                    FullName = b.FullName
                }).ToList();

            return dtoBorrowers;
        }

        public bool ExistById(int id)
        {
            return _context.Borrowers.Any(b => b.Id == id);
        }
    }
}
