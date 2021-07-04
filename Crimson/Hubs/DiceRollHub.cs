using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Crimson.Models;
using Crimson.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace Crimson.Hubs
{
    public class DiceRollHub : Hub<IDiceRollClient>
    {
        private readonly IDiceRollService _diceRollService;

        public DiceRollHub(IDiceRollService diceRollService)
        {
            _diceRollService = diceRollService;
        }

        public async Task JoinSession(string sessionId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);
        }

        public async Task LeaveSession(string sessionId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, sessionId);
        }

        public async Task Roll(string sessionId, string name, int dieCount, int faceCount)
        {
            if (IsRollRequestValid(sessionId, name, dieCount, faceCount))
            {
                await SendRoll(sessionId, name, dieCount, faceCount);
            }
            else
            {
                await RejectRoll(name, dieCount, faceCount);
            }
        }

        private async Task SendRoll(string sessionId, string name, int dieCount, int faceCount)
        {
            var rollResult = _diceRollService.Roll(dieCount, faceCount);

            var response = new RollMessage
            {
                Name = name,
                Roll = rollResult.ToArray(),
                Die = dieCount,
                Faces = faceCount
            };

            await Clients.Group(sessionId).Roll(response);
        }

        private async Task RejectRoll(string name, int dieCount, int faceCount)
        {
            await Clients.Caller.RollRejected(new RollMessage
            {
                Name = name,
                Die = dieCount,
                Faces = faceCount
            });
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
