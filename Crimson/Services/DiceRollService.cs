using System.Collections.Generic;
using Crimson.Services.Interfaces;

namespace Crimson.Services
{

    public class DiceRollService : IDiceRollService
    {
        private readonly IRandomNumberService _randomNumberService;

        public DiceRollService(IRandomNumberService randomNumberService)
        {
            _randomNumberService = randomNumberService;
        }

        /// <summary>
        /// Rolls a die with the given properties
        /// </summary>
        /// <param name="die">The number of die to roll</param>
        /// <param name="faces">The number of faces each die should have</param>
        /// <returns>A collection of integers representing the rolls</returns>
        public IReadOnlyCollection<int> Roll(int die, int faces)
        {
            var rolls = new List<int>();

            for (var i = 0; i < die; i++)
            {
                rolls.Add(_randomNumberService.Next(1, faces));
            }

            return rolls;
        }
        
        /// <summary>
        /// Returns a value indicating if a requested roll is valid
        /// </summary>
        /// <param name="die">The number of die to roll</param>
        /// <param name="faces">The number of faces each die should have</param>
        /// <returns>Boolean indicating if the roll is valid</returns>
        public bool IsRollValid(int die, int faces)
        {
            if (die < 1 || die > 100) return false;
            if (faces < 1 || faces > 100) return false;

            return true;
        }
    }
}
