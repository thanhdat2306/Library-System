using Humanizer;
using LibraryManagementAPI.Models;

namespace LibraryManagementAPI.Services.Contracts
{
    public interface IBorrowerService
    {
        List<BorrowerDto> GetDtoBorrowers();
        bool ExistById(int id);
    }
}
