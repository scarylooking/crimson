using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dice.Services;
using UnitTests.DataGenerators;
using Xunit;
using Xunit.Sdk;

namespace UnitTests.Tests.Services
{
    public class RandomNumberServiceTests
    {
        private readonly RandomNumberService _service;

        public RandomNumberServiceTests()
        {
            _service = new RandomNumberService();
        }

        [Theory]
        [ClassData(typeof(DieFaceGenerator))]
        public void Next_GeneratesNumbersWithinRange(int numberOfFaces)
        {
            for (var i = 0; i < 10000; i++)
            {
                var roll = _service.Next(1, numberOfFaces);

                Assert.InRange(roll, 1, numberOfFaces);
            }
        }

        [Theory]
        [ClassData(typeof(DieFaceGenerator))]
        public void Next_GeneratesNumbersDistributedAcrossTheRange(int numberOfFaces)
        {
            var rolls = new Dictionary<int, int>();

            for (var i = 0; i < numberOfFaces; i++)
            {
                rolls.Add(i + 1, 0);
            }

            for (var i = 0; i < numberOfFaces * 10000; i++)
            {
                var roll = _service.Next(1, numberOfFaces);

                rolls[roll]++;
            }

            foreach (var roll in rolls)
            {
                Assert.True(roll.Value > 0);
            }
        }

        [Theory]
        [InlineData(2,1)]
        [InlineData(1,0)]
        [InlineData(0,-1)]
        [InlineData(-1,-2)]
        public void Next_ThrowsArgumentOutOfRangeException_WhenMinValueIsHigherThanMaxValue(int min, int max)
        {
            _ = Assert.Throws<ArgumentOutOfRangeException>(() => _service.Next(min, max));
        }

        [Theory]
        [InlineData(1,1)]
        [InlineData(2,2)]
        [InlineData(20,20)]
        public void Next_ReturnsMinValueWhenBothValuesAreTheSame(int min, int max)
        {
            var rolls = new List<int>();

            for (var i = 0; i < 10000; i++)
            {
                rolls.Add(_service.Next(min, max));
            }

            Assert.All(rolls, r => Assert.Equal(min, r));
        }
    }
}
