namespace LibraryManagementAPI.Models;

public partial class Librarian
{
    public int Id { get; set; }

    public required string FirstName { get; set; }

    public required string LastName { get; set; }

    public required string Login { get; set; }

    public required string Password { get; set; }

    public virtual ICollection<IssuedBook> IssuedBooks { get; set; } = [];
}
