using System.Collections.Generic;

namespace Crimson.Services.Interfaces
{
    public interface IDiceRollService
    {
        IReadOnlyCollection<int> Roll(int die, int faces);

        bool IsRollValid(int die, int faces);
    }
}