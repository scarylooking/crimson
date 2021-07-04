using System.Threading.Tasks;
using Crimson.Models;

namespace Crimson.Hubs
{
    public interface IDiceRollClient
    {
        Task Roll(RollMessage message);
        Task RollRejected(RollMessage message);
    }
}