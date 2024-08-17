using System;
using System.Collections.Generic;

namespace LibraryManagementAPI.Models;

public partial class IssuedBook
{
    public int Id { get; set; }

    public int BookId { get; set; }

    public int BorrowerId { get; set; }

    public int LibrarianId { get; set; }

    public DateOnly IssueDate { get; set; }

    public DateOnly ReturnBefore { get; set; }

    public string? Notes { get; set; }

    public virtual Book Book { get; set; } = null!;

    public virtual Borrower Borrower { get; set; } = null!;

    public virtual Librarian Librarian { get; set; } = null!;
}
