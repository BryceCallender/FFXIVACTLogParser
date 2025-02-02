using Platform.Core.DI;
using Sqids;

namespace Platform.Core.Encryption;

[AddScoped]
public class Encryption : IEncryption
{
    private readonly SqidsEncoder<long> _sqidsEncoder;

    public Encryption(SqidsEncoder<long> sqidsEncoder)
    {
        _sqidsEncoder = sqidsEncoder;
    }

    public string Encrypt(long value)
    {
        return _sqidsEncoder.Encode(value);
    }

    public long Decrypt(string value)
    {
        var decoded = _sqidsEncoder.Decode(value);
        if (decoded is [var singleNumber])
        {
            return singleNumber;
        }

        return decoded[0];
    }
}
