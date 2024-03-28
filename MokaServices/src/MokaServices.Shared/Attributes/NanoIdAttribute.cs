using System.ComponentModel.DataAnnotations;
using MokaServices.Shared.Models;

namespace MokaServices.Shared.Attributes;

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
        if (validationContext == null) return new ValidationResult("Unknown validation context");

        if (validationContext.MemberName == null) return new ValidationResult("Unknown member name");
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