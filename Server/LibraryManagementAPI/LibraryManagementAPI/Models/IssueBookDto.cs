namespace LibraryManagementAPI.Models
{
    public partial class IssueBookDto
    {
        public required int BookId { get; set; }
        public required int BorrowerId { get; set; }
        public required int IssuedById { get; set; }
        public required DateOnly IssueDate { get; set; }
        public required DateOnly ReturnBefore { get; set; }
        public string Notes { get; set; } = "";
    }
}