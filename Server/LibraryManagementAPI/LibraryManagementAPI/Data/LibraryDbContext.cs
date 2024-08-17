using LibraryManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementAPI.Data;

public partial class LibraryDbContext : DbContext
{
    public LibraryDbContext()
    {
    }

    public LibraryDbContext(DbContextOptions<LibraryDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Book> Books { get; set; }

    public virtual DbSet<Borrower> Borrowers { get; set; }

    public virtual DbSet<Efmigrationshistory> Efmigrationshistories { get; set; }

    public virtual DbSet<IssuedBook> IssuedBooks { get; set; }

    public virtual DbSet<Librarian> Librarians { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("book");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Author)
                .HasMaxLength(100)
                .HasColumnName("author");
            entity.Property(e => e.CopiesInStock).HasColumnName("copies_in_stock");
            entity.Property(e => e.Language)
                .HasMaxLength(50)
                .HasColumnName("language");
            entity.Property(e => e.Overview)
                .HasMaxLength(1800)
                .HasColumnName("overview");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .HasColumnName("title");
            entity.Property(e => e.TotalCopies).HasColumnName("total_copies");
        });

        modelBuilder.Entity<Borrower>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("borrower");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.FullName)
                .HasMaxLength(255)
                .HasColumnName("full_name");
            entity.Property(e => e.Telephone)
                .HasMaxLength(20)
                .HasColumnName("telephone");
        });

        modelBuilder.Entity<Efmigrationshistory>(entity =>
        {
            entity.HasKey(e => e.MigrationId).HasName("PRIMARY");

            entity.ToTable("__efmigrationshistory");

            entity.Property(e => e.MigrationId).HasMaxLength(150);
            entity.Property(e => e.ProductVersion).HasMaxLength(32);
        });

        modelBuilder.Entity<IssuedBook>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("issued_book");

            entity.HasIndex(e => e.BookId, "book_id");

            entity.HasIndex(e => e.BorrowerId, "borrower_id");

            entity.HasIndex(e => e.LibrarianId, "librarian_id");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.BookId).HasColumnName("book_id");
            entity.Property(e => e.BorrowerId).HasColumnName("borrower_id");
            entity.Property(e => e.IssueDate).HasColumnName("issue_date");
            entity.Property(e => e.LibrarianId).HasColumnName("librarian_id");
            entity.Property(e => e.Notes)
                .HasColumnType("text")
                .HasColumnName("notes");
            entity.Property(e => e.ReturnBefore).HasColumnName("return_before");

            entity.HasOne(d => d.Book).WithMany(p => p.IssuedBooks)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("issued_book_ibfk_1");

            entity.HasOne(d => d.Borrower).WithMany(p => p.IssuedBooks)
                .HasForeignKey(d => d.BorrowerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("issued_book_ibfk_2");

            entity.HasOne(d => d.Librarian).WithMany(p => p.IssuedBooks)
                .HasForeignKey(d => d.LibrarianId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("issued_book_ibfk_3");
        });

        modelBuilder.Entity<Librarian>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("librarian");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .HasColumnName("last_name");
            entity.Property(e => e.Login)
                .HasMaxLength(150)
                .HasColumnName("login");
            entity.Property(e => e.Password)
                .HasMaxLength(150)
                .HasColumnName("password");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
