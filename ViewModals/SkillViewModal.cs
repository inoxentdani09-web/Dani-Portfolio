using DaniPortfolio.Models;

namespace DaniPortfolio.ViewModals
{
    public class SkillViewModal
    {
        public Skill skill { get; set; } = new Skill();
        public List<Skill> skills { get; set; } = new List<Skill>();
    }
}
