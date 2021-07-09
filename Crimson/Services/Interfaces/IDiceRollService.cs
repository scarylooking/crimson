using System.Collections.Generic;

namespace Crimson.Services.Interfaces
{
    public interface IDiceRollService
    {
        IReadOnlyCollection<int> Roll(int die, int faces);
        IReadOnlyCollection<int> RollPercentile(int die);
        bool IsRollValid(int die, string faces);
    }
}