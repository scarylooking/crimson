using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Dice.Models;
using Dice.Services;
using Dice.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace Dice.Hubs
{
    public class DiceRollHub : Hub
    {
        private readonly IDiceRollService _diceRollService;

        public DiceRollHub(IDiceRollService diceRollService)
        {
            _diceRollService = diceRollService;
        }

        public async Task Roll(string name, int dieCount, int faceCount)
        {
            var rollResult = _diceRollService.Roll(dieCount, faceCount);

            var response = new RollResponse
            {
                Name = name,
                Roll = rollResult.ToArray(),
                Die = dieCount,
                Faces = faceCount
            };

            await Clients.All.SendAsync("newRoll", JsonSerializer.Serialize(response));
        }
    }
}
