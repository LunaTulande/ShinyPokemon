using AutoMapper;
using ShinyPokemon.Models.Entities;

namespace ShinyPokemon.Models.ViewModels.Mapping
{
    public class EntityMappingProfileViewModel : Profile
    {
        public EntityMappingProfileViewModel()
        {
            CreateMap<RegistrationViewModel, AppUser>().ForMember(au => au.UserName, map => map.MapFrom(vm => vm.Email));
        }
    }
}
