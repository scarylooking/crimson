using System;
using System.Text.Json.Serialization;

namespace Dice.Models
{
    public class RollResponse
    {
        public RollResponse()
        {
            Id = Guid.NewGuid();
        }

        [JsonPropertyName("id")]
        public Guid Id { get; }

        [JsonPropertyName("die")]
        public int Die { get; set; }

        [JsonPropertyName("faces")]
        public int Faces { get; set; }

        [JsonPropertyName("roll")]
        public int[] Roll { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }
    }
}