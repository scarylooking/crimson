using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnitTests.DataGenerators
{
    public class DieFaceGenerator : IEnumerable<object[]>
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
