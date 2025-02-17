﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MokaServices.AuthenticationService.Infrastructure.Data;

#nullable disable

namespace MokaServices.AuthenticationService.Infrastructure.Migrations
{
    [DbContext(typeof(AuthenticationDbContext))]
    partial class AuthenticationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.3");

            modelBuilder.Entity("MokaServices.AuthenticationService.Domain.Entities.BasePermission", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("BaseUserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("LastModifiedBy")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("LastModifiedDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Version")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("BaseUserId");

                    b.HasIndex("RoleId");

                    b.ToTable("Permissions");
                });

            modelBuilder.Entity("MokaServices.AuthenticationService.Domain.Entities.BaseRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("BaseUserId")
                        .HasColumnType("TEXT");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("LastModifiedBy")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("LastModifiedDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Version")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("BaseUserId");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("MokaServices.AuthenticationService.Domain.Entities.BaseUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsActive")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("LastModifiedBy")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("LastModifiedDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Version")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("MokaServices.AuthenticationService.Domain.Entities.BasePermission", b =>
                {
                    b.HasOne("MokaServices.AuthenticationService.Domain.Entities.BaseUser", null)
                        .WithMany("Permissions")
                        .HasForeignKey("BaseUserId");

                    b.HasOne("MokaServices.AuthenticationService.Domain.Entities.BaseRole", "Role")
                        .WithMany("Permissions")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("MokaServices.AuthenticationService.Domain.Entities.BaseRole", b =>
                {
                    b.HasOne("MokaServices.AuthenticationService.Domain.Entities.BaseUser", null)
                        .WithMany("UserRoles")
                        .HasForeignKey("BaseUserId");
                });

            modelBuilder.Entity("MokaServices.AuthenticationService.Domain.Entities.BaseRole", b =>
                {
                    b.Navigation("Permissions");
                });

            modelBuilder.Entity("MokaServices.AuthenticationService.Domain.Entities.BaseUser", b =>
                {
                    b.Navigation("Permissions");

                    b.Navigation("UserRoles");
                });
#pragma warning restore 612, 618
        }
    }
}
