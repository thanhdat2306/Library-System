namespace LibraryManagementAPI.Models
{
    public class IssuedBookReturnDto
    {
        public int Id { get; set; }
        public required int BookId { get; set; }
        public required string BookTitle { get; set; }
        public required int BorrowerId { get; set; }
        public required string BorrowerFullName { get; set; }
        public DateOnly ReturnBefore { get; set; }
        public string? Notes { get; set; }
    }
}
