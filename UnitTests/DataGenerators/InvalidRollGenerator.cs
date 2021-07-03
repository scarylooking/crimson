using System.Collections;
using System.Collections.Generic;

namespace UnitTests.DataGenerators
{
    public class InvalidRollGenerator : IEnumerable<object[]>
    {
        private readonly List<object[]> _data = new()
        {
            new object[] { 0, 1 },
            new object[] { 1, 0 },
            new object[] { -1, 1 },
            new object[] { 1, -1 },
            new object[] { 101, 1 },
            new object[] { 1, 101 },
            new object[] { 1000, 1 },
            new object[] { 1, 1000 }
        };

        public IEnumerator<object[]> GetEnumerator() => _data.GetEnumerator();

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }
}
