using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface ILocationMapper
    {
        public BaseLocationMapper Map(IDataReader reader, ref int index);
    }
}
