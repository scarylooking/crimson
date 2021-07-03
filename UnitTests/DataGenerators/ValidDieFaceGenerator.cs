using System.Collections;
using System.Collections.Generic;

namespace UnitTests.DataGenerators
{
    public class ValidDieFaceGenerator : IEnumerable<object[]>
    {
        private readonly List<object[]> _data = new()
        {
            new object[] { 2 },
            new object[] { 4 },
            new object[] { 6 },
            new object[] { 10 },
            new object[] { 12 },
            new object[] { 20 },
            new object[] { 100 }
        };

        public IEnumerator<object[]> GetEnumerator() => _data.GetEnumerator();

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }
}
