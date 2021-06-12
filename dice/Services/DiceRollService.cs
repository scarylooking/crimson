using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using Dice.Services;
using Dice.Services.Interfaces;
using Microsoft.AspNetCore.Mvc.ApplicationModels;

namespace Dice.Services
{

    public class DiceRollService : IDiceRollService
    {
        private readonly IRandomNumberService _randomNumberService;

        public DiceRollService(IRandomNumberService randomNumberService)
        {
            _randomNumberService = randomNumberService;
        }

        public IReadOnlyCollection<int> Roll(int die, int faces)
        {
            var rolls = new List<int>();

            for (var i = 0; i < die; i++)
            {
                rolls.Add(_randomNumberService.Next(1, faces));
            }

            return rolls;
        }
    }
}
