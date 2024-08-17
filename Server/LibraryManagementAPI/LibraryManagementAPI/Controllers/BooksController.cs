using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LibraryManagementAPI.Data;
using LibraryManagementAPI.Models;
using LibraryManagementAPI.Services.Contracts;

namespace LibraryManagementAPI.Controllers
{
    [Route("api/books")]
    [ApiController]
    public class BooksController(LibraryDbContext context, ILibrarianService librarianService, IBorrowerService borrowerService) : ControllerBase
    {
        private readonly ILibrarianService _librarianService = librarianService;
        private readonly IBorrowerService _borrowerService = borrowerService;
        private readonly LibraryDbContext _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _context.Books.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        [HttpGet("issued-books")]
        public async Task<ActionResult<IEnumerable<IssuedBookReturnDto>>> GetIssuedBooks()
        {
            var issuedBooks = _context.IssuedBooks
                .Include(ib => ib.Book)
                .Include(ib => ib.Borrower)
                .Select(ib => new IssuedBookReturnDto
                {
                    Id = ib.Id,
                    BookId = ib.BookId,
                    BookTitle = ib.Book.Title,
                    BorrowerId = ib.BorrowerId,
                    BorrowerFullName = ib.Borrower.FullName,
                    ReturnBefore = ib.ReturnBefore,
                    Notes = ib.Notes,

                }).ToList();

            return Ok(issuedBooks);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
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
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBook", new { id = book.Id }, book);
        }

        [HttpPost]
        [Route("issue-book")]
        public async Task<IActionResult> IssueBook(IssueBookDto issueBookDto)
        {
            if (!BookInStock(issueBookDto.BookId)) return Conflict("This book is out of stock");
            if (!_librarianService.ExistById(issueBookDto.IssuedById)) return NotFound("Librarian not found");
            if (!_borrowerService.ExistById(issueBookDto.BorrowerId)) return NotFound("Borrower not found");

            IssuedBook issuedBook = new()
            {
               BookId = issueBookDto.BookId,
               BorrowerId = issueBookDto.BorrowerId,
               LibrarianId = issueBookDto.IssuedById,
               IssueDate = issueBookDto.IssueDate,
               ReturnBefore = issueBookDto.ReturnBefore,
               Notes = issueBookDto.Notes,
            };

            _context.IssuedBooks.Add(issuedBook);

            var book = _context.Books.FirstOrDefault(b => b.Id == issueBookDto.BookId);

            book!.CopiesInStock -= 1;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.Id == id);
        }

        private bool BookInStock(int bookId)
        {
            Book? book = _context.Books.FirstOrDefault(b => b.Id == bookId);
            if (book == null) return false;
            else return book.TotalCopies > 0;
        }
    }
}
