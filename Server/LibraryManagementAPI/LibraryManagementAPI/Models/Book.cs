namespace LibraryManagementAPI.Models;

public partial class Book
{
    public int Id { get; set; }

    public required string Title { get; set; }

    public required string Author { get; set; }

    public required string Overview { get; set; }

    public required string Language { get; set; }

    public required uint CopiesInStock { get; set; }

    public required uint TotalCopies { get; set; }

    public virtual ICollection<IssuedBook> IssuedBooks { get; set; } = [];
}
