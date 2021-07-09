using System;
using System.Text.Json.Serialization;

namespace Crimson.Models
{
    public class RollMessage
    {
        public RollMessage()
        {
            Id = Guid.NewGuid();
        }

        [JsonPropertyName("id")]
        public Guid Id { get; }

        [JsonPropertyName("die")]
        public int Die { get; set; }

        [JsonPropertyName("faces")]
        public string Faces { get; set; }

        [JsonPropertyName("roll")]
        public int[] Roll { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }
    }
}