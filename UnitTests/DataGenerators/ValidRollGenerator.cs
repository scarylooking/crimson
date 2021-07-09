using System.Collections;
using System.Collections.Generic;

namespace UnitTests.DataGenerators
{
    public class ValidRollGenerator : IEnumerable<object[]>
    {
        private readonly List<object[]> _data = new()
        {
            new object[] { 1, "1" },
            new object[] { 1, "%" },
            new object[] { 1, "6" },
            new object[] { 6, "6" },
            new object[] { 24, "6" },
            new object[] { 6, "10" },
            new object[] { 50, "10" },
            new object[] { 50, "%" },
            new object[] { 6, "12" },
            new object[] { 13, "12" },
            new object[] { 6, "20" },
            new object[] { 11, "20" },
            new object[] { 99, "99" },
            new object[] { 100, "100" },
            new object[] { 100, "%" },
        };

        public IEnumerator<object[]> GetEnumerator() => _data.GetEnumerator();

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }
}
