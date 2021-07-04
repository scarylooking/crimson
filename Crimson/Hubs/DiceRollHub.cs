using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Crimson.Models;
using Crimson.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace Crimson.Hubs
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

        public async Task JoinSession(string sessionId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);


            await Clients.Group(sessionId).SendAsync("diceJoin");
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

        public async Task Roll(string sessionId, string name, int dieCount, int faceCount)
        {
            if (!IsRollRequestValid(sessionId, name, dieCount, faceCount))
            {
                return;
            }

            var rollResult = _diceRollService.Roll(dieCount, faceCount);

            var response = new RollResponse
            {
                Name = name,
                Roll = rollResult.ToArray(),
                Die = dieCount,
                Faces = faceCount
            };

            await Clients.Group(sessionId).SendAsync("diceRoll", JsonSerializer.Serialize(response));
        }

        private bool IsRollRequestValid(string sessionId, string name, int dieCount, int faceCount)
        {
            if (string.IsNullOrWhiteSpace(name) || name.Length > 50) return false;
            if (string.IsNullOrWhiteSpace(sessionId)) return false;
            if (!_diceRollService.IsRollValid(dieCount, faceCount)) return false;

            return true;
        }
    }
}
