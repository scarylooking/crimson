using System;
using System.Security.Cryptography;
using Dice.Services.Interfaces;

namespace Dice.Services
{
    public sealed class RandomNumberService : IDisposable, IRandomNumberService
    {
        private readonly RNGCryptoServiceProvider _randomProvider;

        public RandomNumberService()
        {
            _randomProvider = new RNGCryptoServiceProvider();
        }

        public int Next(int minValue, int maxValue)
        {
            if (minValue == maxValue) return minValue;

            if (minValue > maxValue)
            {
                throw new ArgumentOutOfRangeException(nameof(minValue), $"{nameof(minValue)} must be lower than {nameof(maxValue)}");
            }

            var maxExclusiveValue = maxValue + 1;
            
            var diff = (long)maxExclusiveValue - minValue;
            var upperBound = uint.MaxValue / diff * diff;

            uint ui;
            do
            {
                ui = GetRandomUInt();
            } while (ui >= upperBound);

            return (int)(minValue + (ui % diff));
        }

        private uint GetRandomUInt()
        {
            var randomBytes = GenerateRandomBytes(sizeof(uint));

            return BitConverter.ToUInt32(randomBytes, 0);
        }

        private byte[] GenerateRandomBytes(int bytesNumber)
        {
            var buffer = new byte[bytesNumber];

            _randomProvider.GetBytes(buffer);

            return buffer;
        }
        private bool _disposed;

        public void Dispose()
        {
            if (_disposed)
            {
                return;
            }

            _randomProvider?.Dispose();

            _disposed = true;
            GC.SuppressFinalize(this);
        }
    }
}