using AlertsService.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace AlertsService.Data
{
    public class ApplicationDbContext: DbContext
    {
        public DbSet<Alert> Alerts { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
