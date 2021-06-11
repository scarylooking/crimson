using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Dice.Hubs;
using Dice.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Dice.Controllers
{
    [Route("/api/roll")]
    [ApiController]
    public class RollController : Controller
    {
        private readonly IHubContext<MessageHub> _messageHub;
        private readonly Random _rnd;

        public RollController([NotNull] IHubContext<MessageHub> messageHub)
        {
            _messageHub = messageHub;
            _rnd = new Random();
        }
     
        [HttpPost]
        public async Task<IActionResult> Roll(MessagePost message)
        {
            var rolls = DoRoll(message.NumberOfDice, message.NumberOfFaces);

            await _messageHub.Clients.All.SendAsync("sendToReact", $"x rolled: {string.Join(',', rolls)}");

            return Ok();
        }

        private IEnumerable<int> DoRoll(int die, int faces)
        {
            var rolls = new List<int>();

            for (var i =0; i < die; i++)
            {
                rolls.Add(_rnd.Next(1, faces + 1));
            }

            return rolls.OrderByDescending(x => x).ToArray();
        }
    }
}
