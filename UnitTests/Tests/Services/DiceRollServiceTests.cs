﻿using System.Security.Cryptography;
using Crimson.Services;
using Crimson.Services.Interfaces;
using Moq;
using UnitTests.DataGenerators;
using Xunit;

namespace UnitTests.Tests.Services
{
    public class DiceRollServiceTests
    {
        private readonly Mock<IRandomNumberService> _randomNumberService;

        private readonly IDiceRollService _service;

        public DiceRollServiceTests()
        {
            _randomNumberService = new Mock<IRandomNumberService>();
            _service = new DiceRollService(_randomNumberService.Object);

            _randomNumberService
                .Setup(x => x.Next(It.IsAny<int>(), It.IsAny<int>()))
                .Returns(3);
        }

        [Theory]
        [ClassData(typeof(ValidDieCountGenerator))]
        public void Roll_CallsRandomNumberService_OnceForEachRequestedRoll(int dieCount)
        {
            _ = _service.Roll(dieCount, 6);

            _randomNumberService.Verify(x => x.Next(It.IsAny<int>(), It.IsAny<int>()), Times.Exactly(dieCount));
        }

        [Theory]
        [ClassData(typeof(ValidDieCountGenerator))]
        public void RollPercentile_CallsRandomNumberService_OnceForEachRequestedRoll(int dieCount)
        {
            _ = _service.RollPercentile(dieCount);

            _randomNumberService.Verify(x => x.Next(It.IsAny<int>(), It.IsAny<int>()), Times.Exactly(dieCount));
        }

        [Theory]
        [ClassData(typeof(ValidDieCountGenerator))]
        public void Roll_ReturnsTheCorrectNumberOfRolls(int dieCount)
        {
            var result = _service.Roll(dieCount, 6);

            Assert.Equal(dieCount, result.Count);
        }


        [Theory]
        [ClassData(typeof(ValidDieFaceGenerator))]
        public void Roll_CallsRandomNumberService_WithTheCorrectRangeForFaceCount(int faceCount)
        {
            const int expectedLowerBound = 1;
            var expectedUpperBound = faceCount;

            _ = _service.Roll(1, faceCount);

            _randomNumberService.Verify(x => x.Next(expectedLowerBound, expectedUpperBound), Times.Once);
        }

        [Fact]
        public void RollPercentile_CallsRandomNumberService_WithTheCorrectRangeForFaceCount()
        {
            const int expectedLowerBound = 0;
            const int expectedUpperBound = 100;

            _ = _service.RollPercentile(1);

            _randomNumberService.Verify(x => x.Next(expectedLowerBound, expectedUpperBound), Times.Once);
        }

        [Theory]
        [ClassData(typeof(ValidRollGenerator))]
        public void IsValid_AcceptsValidCombinationsOfDieAndFaces(int dieCount, string faceCount)
        {
            var result = _service.IsRollValid(dieCount, faceCount);

            Assert.True(result);
        }

        [Theory]
        [ClassData(typeof(InvalidRollGenerator))]
        public void IsValid_RejectsInvalidCombinationsOfDieAndFaces(int dieCount, string faceCount)
        {
            var result = _service.IsRollValid(dieCount, faceCount);

            Assert.False(result);
        }
    }
}
