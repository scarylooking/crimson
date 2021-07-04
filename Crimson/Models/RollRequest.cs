using System.Text.Json.Serialization;

namespace Crimson.Models
{
    public class RollRequest
    {
        [JsonPropertyName("dieCount")]
        public int DieCount { get; set; }

        [JsonPropertyName("faceCount")]
        public int FaceCount { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }
    }
}