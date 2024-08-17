namespace LibraryManagementAPI.Models;

public partial class Borrower
{
    public int Id { get; set; }

    public string FullName { get; set; } = null!;

    public string Telephone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public virtual ICollection<IssuedBook> IssuedBooks { get; set; } = [];
}
