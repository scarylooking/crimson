using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Dice.Hubs;
using Dice.Models;
using Dice.Services;
using Dice.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Dice.Controllers
{
    [Route("/api/roll")]
    [ApiController]
    public class RollController : Controller
    {
        private readonly IHubContext<MessageHub> _messageHub;
        private readonly IDiceRollService _diceRollService;

        public RollController([NotNull] IHubContext<MessageHub> messageHub, IDiceRollService diceRollService)
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
