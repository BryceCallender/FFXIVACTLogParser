namespace System;

public static class EnumerableExtensions
{
    public static bool HasData<T>(this IEnumerable<T>? data)
    {
        return data?.GetEnumerator()?.MoveNext() ?? false;
    }

    public static bool IsEmpty<T>(this IEnumerable<T>? data)
    {
        return !HasData(data);
    }
}
