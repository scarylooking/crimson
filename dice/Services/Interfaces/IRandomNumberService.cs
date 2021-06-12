namespace Dice.Services.Interfaces
{
    public interface IRandomNumberService
    {
        int Next(int minValue, int maxExclusiveValue);
    }
}