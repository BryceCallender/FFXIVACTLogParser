namespace Platform.Core.Encryption;

public interface IEncryption
{
    string Encrypt(long value);
    long Decrypt(string value);
}
