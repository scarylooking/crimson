using Dice.Services;
using Dice.Services.Interfaces;
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
        [ClassData(typeof(NumberOfDieGenerator))]
        public void Roll_CallsRandomNumberService_OnceForEachRequestedRoll(int numberOfDie)
        {
            _ = _service.Roll(numberOfDie, 6);

            _randomNumberService.Verify(x => x.Next(It.IsAny<int>(),It.IsAny<int>()), Times.Exactly(numberOfDie));
        }

        [Theory]
        [ClassData(typeof(NumberOfDieGenerator))]
        public void Roll_ReturnsTheCorrectNumberOfRolls(int numberOfDie)
        {
            var result = _service.Roll(numberOfDie, 6);

            Assert.Equal(numberOfDie, result.Count);
        }


        [Theory]
        [ClassData(typeof(DieFaceGenerator))]
        public void Roll_CallsRandomNumberService_WithTheCorrectRangeForTheNumberOfFaces(int numberOfFaces)
        {
            var expectedLowerBound = 1;
            var expectedUpperBound = numberOfFaces;

            _ = _service.Roll(1, numberOfFaces);

            _randomNumberService.Verify(x => x.Next(expectedLowerBound,expectedUpperBound), Times.Once);
        }

    }
}
