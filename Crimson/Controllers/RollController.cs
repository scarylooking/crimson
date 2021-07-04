using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Crimson.Hubs;
using Crimson.Models;
using Crimson.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Crimson.Controllers
{
    [Route("/api/roll")]
    [ApiController]
    public class RollController : Controller
    {
        private readonly IHubContext<DiceRollHub> _messageHub;
        private readonly IDiceRollService _diceRollService;

        public RollController([NotNull] IHubContext<DiceRollHub> messageHub, IDiceRollService diceRollService)
        {
            _messageHub = messageHub;
            _diceRollService = diceRollService;
        }

        [HttpPost]
        public async Task<IActionResult> Roll(RollRequest request)
        {
            var rollResult = _diceRollService.Roll(request.DieCount, request.FaceCount);

            var response = new RollResponse
            {
                Name = request.Name,
                Roll = rollResult.ToArray()
            };
            
            await _messageHub.Clients.All.SendAsync("sendNewDiceRoll", JsonSerializer.Serialize(response));

            return Ok();
        }
    }
}
