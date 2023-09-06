using Models;
using Microsoft.EntityFrameworkCore;

namespace Data
{
  public class CabangContext : DbContext
  {
    public CabangContext(DbContextOptions<CabangContext> options) : base(options)
    {
    }

    public DbSet<Cabang> Cabangs { get; set; }
  }
}