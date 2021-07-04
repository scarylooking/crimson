namespace Crimson.Services.Interfaces
{
    public interface IRandomNumberService
    {
        int Next(int minValue, int maxExclusiveValue);
    }
}