using System.Collections;
using System.Collections.Generic;

namespace UnitTests.DataGenerators
{
    public class ValidDieCountGenerator : IEnumerable<object[]>
    {
        private readonly List<object[]> _data = new()
        {
            new object[] { 1 },
            new object[] { 2 },
            new object[] { 9 },
            new object[] { 10 },
            new object[] { 100 }
        };

        public IEnumerator<object[]> GetEnumerator() => _data.GetEnumerator();

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }
}
