#region

using MokaServices.BytemarksService.Application.DTOs;
using MokaServices.BytemarksService.Domain.Entities;
using Nelibur.ObjectMapper;

#endregion

namespace MokaServices.BytemarksService.Application.Mappings;

public static class TinyMapperConfig
{
    public static void ConfigureMappings()
    {
        // Mapping from Bookmark to BookmarkDto and vice versa
        TinyMapper.Bind<Bookmark, BookmarkDto>(config =>
        {
            config.Bind(source => source.Title, target => target.Title);
            config.Bind(source => source.URL, target => target.URL);
            config.Bind(source => source.Description, target => target.Description);

            config.Ignore(target => target.Tags);
            config.Ignore(target => target.Categories);
        });
        TinyMapper.Bind<BookmarkDto, Bookmark>(config =>
        {
            config.Bind(source => source.Title, target => target.Title);
            config.Bind(source => source.URL, target => target.URL);
            config.Bind(source => source.Description, target => target.Description);
        });

        // Mapping from Tag to TagDto and vice versa
        TinyMapper.Bind<Tag, TagDto>(config => { config.Bind(source => source.Name, target => target.Name); });
        TinyMapper.Bind<TagDto, Tag>(config => { config.Bind(source => source.Name, target => target.Name); });

        // Mapping from Category to CategoryDto and vice versa
        TinyMapper.Bind<Category, CategoryDto>(config =>
        {
            config.Bind(source => source.Name, target => target.Name);
        });
        TinyMapper.Bind<CategoryDto, Category>(config =>
        {
            config.Bind(source => source.Name, target => target.Name);
        });
    }
}