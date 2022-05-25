using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Venues;
using System.Collections.Generic;

namespace Sabio.Services
{
    public interface IVenuesServices
    {
        int Add(VenuesAddRequest model, int currentUserId);
        void Delete(int id);
        Paged<Venue> Pagination(int pageIndex, int pageSize, int currentUserId);
        List<Venue> GetAll();
        Venue Get(int id);
        void Update(VenuesUpdateRequest model);

        Paged<Venue> GetAll(int pageIndex, int pageSize);
    }
}