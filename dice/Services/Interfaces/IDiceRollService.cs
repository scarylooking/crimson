﻿using System.Collections.Generic;

namespace Dice.Services.Interfaces
{
    public interface IDiceRollService
    {
        IReadOnlyCollection<int> Roll(int die, int faces);
    }
}