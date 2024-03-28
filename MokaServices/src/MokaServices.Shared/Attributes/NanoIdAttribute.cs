using System.ComponentModel.DataAnnotations;

namespace SharedLibrary.Attributes;

[AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
public class NanoIdAttribute : ValidationAttribute
{
    private readonly int _size;

    public NanoIdAttribute(int size = 21)
    {
        _size = size;
    }

    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        var property = validationContext.ObjectType.GetProperty(validationContext.MemberName);
        if (property == null) return new ValidationResult("Unknown property");

        if (value == null || string.IsNullOrWhiteSpace(value.ToString()))
        {
            var generatedNanoId = NanoId.Generate(size: _size);
            property.SetValue(validationContext.ObjectInstance, generatedNanoId);
        }

        return ValidationResult.Success;
    }
}