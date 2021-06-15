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
    public class GroupJoinMessage
    {
        public string Name { get; set; }
    }

    public class GroupLeaveMessage
    {
        public string Name { get; set; }
    }

    public class DiceRollHub : Hub
    {
        private readonly IDiceRollService _diceRollService;

        public DiceRollHub(IDiceRollService diceRollService)
        {
            _diceRollService = diceRollService;
        }

        public async Task JoinSession(string name, string sessionId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);

            var response = new GroupJoinMessage
            {
                Name = name
            };

            await Clients.Group(sessionId).SendAsync("diceJoin", JsonSerializer.Serialize(response));
        }

        public async Task LeaveSession(string name, string sessionId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, sessionId);

            var response = new GroupLeaveMessage
            {
                Name = name
            };

            await Clients.Group(sessionId).SendAsync("diceJoin", JsonSerializer.Serialize(response));
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

            await Clients.All.SendAsync("diceRoll", JsonSerializer.Serialize(response));
        }
    }
}
