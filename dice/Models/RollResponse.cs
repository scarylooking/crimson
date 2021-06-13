using System.Text.Json.Serialization;

namespace Dice.Models
{
    public class RollResponse
    {
        [JsonPropertyName("roll")]
        public int[] Roll { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }
    }
}