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
            return RollInternal(die, faces);
        }

        /// <summary>
        /// Rolls a die with the given properties
        /// </summary>
        /// <param name="die">The number of die to roll</param>
        /// <param name="faces">The number of faces each die should have</param>
        /// <returns>A collection of integers representing the rolls</returns>
        public IReadOnlyCollection<int> RollPercentile(int die)
        {
            return RollInternal(die, 100, true);
        }

        /// <summary>
        /// Returns a value indicating if a requested roll is valid
        /// </summary>
        /// <param name="die">The number of die to roll</param>
        /// <param name="faces">The number of faces each die should have, or a % to represent a percentile roll</param>
        /// <returns>Boolean indicating if the roll is valid</returns>
        public bool IsRollValid(int die, string faces)
        {
            if (die < 1 || die > 100) return false;

            if (int.TryParse(faces, out var facesResult))
            {
                if (facesResult < 1 || facesResult > 100) return false;
            }
            else
            {
                if (faces != "%") return false;
            }

            return true;
        }

        private IReadOnlyCollection<int> RollInternal(int die, int faces, bool fromZero = false)
        {
            var rolls = new List<int>();

            for (var i = 0; i < die; i++)
            {
                rolls.Add(_randomNumberService.Next(fromZero ? 0 : 1, faces));
            }

            return rolls;
        }
    }
}
