using Microsoft.EntityFrameworkCore.Migrations;

namespace SiteRepas.Data.Migrations
{
    public partial class MigrationModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Ingredients",
                table: "Ingredients");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Familles",
                table: "Familles");

            migrationBuilder.DropColumn(
                name: "Ingredients",
                table: "Repas");

            migrationBuilder.DropColumn(
                name: "Utilisateurs",
                table: "Repas");

            migrationBuilder.DropColumn(
                name: "Inredients",
                table: "Familles");

            migrationBuilder.DropColumn(
                name: "Repas",
                table: "Familles");

            migrationBuilder.DropColumn(
                name: "Utilisateurs",
                table: "Familles");

            migrationBuilder.RenameTable(
                name: "Ingredients",
                newName: "Ingredient");

            migrationBuilder.RenameTable(
                name: "Familles",
                newName: "Famille");

            migrationBuilder.AlterColumn<string>(
                name: "Nom",
                table: "Repas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256,
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Categorie",
                table: "Repas",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256,
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Repas",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "FamilleId",
                table: "Repas",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FamilleId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Nom",
                table: "Ingredient",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256,
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Categorie",
                table: "Ingredient",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256,
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Ingredient",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "FamilleId",
                table: "Ingredient",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RepasId",
                table: "Ingredient",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Nom",
                table: "Famille",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(256)",
                oldMaxLength: 256,
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Famille",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ingredient",
                table: "Ingredient",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Famille",
                table: "Famille",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Repas_FamilleId",
                table: "Repas",
                column: "FamilleId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_FamilleId",
                table: "AspNetUsers",
                column: "FamilleId");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredient_FamilleId",
                table: "Ingredient",
                column: "FamilleId");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredient_RepasId",
                table: "Ingredient",
                column: "RepasId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Famille_FamilleId",
                table: "AspNetUsers",
                column: "FamilleId",
                principalTable: "Famille",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredient_Famille_FamilleId",
                table: "Ingredient",
                column: "FamilleId",
                principalTable: "Famille",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredient_Repas_RepasId",
                table: "Ingredient",
                column: "RepasId",
                principalTable: "Repas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Repas_Famille_FamilleId",
                table: "Repas",
                column: "FamilleId",
                principalTable: "Famille",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Famille_FamilleId",
                table: "AspNetUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_Ingredient_Famille_FamilleId",
                table: "Ingredient");

            migrationBuilder.DropForeignKey(
                name: "FK_Ingredient_Repas_RepasId",
                table: "Ingredient");

            migrationBuilder.DropForeignKey(
                name: "FK_Repas_Famille_FamilleId",
                table: "Repas");

            migrationBuilder.DropIndex(
                name: "IX_Repas_FamilleId",
                table: "Repas");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_FamilleId",
                table: "AspNetUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Ingredient",
                table: "Ingredient");

            migrationBuilder.DropIndex(
                name: "IX_Ingredient_FamilleId",
                table: "Ingredient");

            migrationBuilder.DropIndex(
                name: "IX_Ingredient_RepasId",
                table: "Ingredient");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Famille",
                table: "Famille");

            migrationBuilder.DropColumn(
                name: "FamilleId",
                table: "Repas");

            migrationBuilder.DropColumn(
                name: "FamilleId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "FamilleId",
                table: "Ingredient");

            migrationBuilder.DropColumn(
                name: "RepasId",
                table: "Ingredient");

            migrationBuilder.RenameTable(
                name: "Ingredient",
                newName: "Ingredients");

            migrationBuilder.RenameTable(
                name: "Famille",
                newName: "Familles");

            migrationBuilder.AlterColumn<string>(
                name: "Nom",
                table: "Repas",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Categorie",
                table: "Repas",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "Repas",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "Ingredients",
                table: "Repas",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Utilisateurs",
                table: "Repas",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Nom",
                table: "Ingredients",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Categorie",
                table: "Ingredients",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "Ingredients",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<string>(
                name: "Nom",
                table: "Familles",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "Familles",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<string>(
                name: "Inredients",
                table: "Familles",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Repas",
                table: "Familles",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Utilisateurs",
                table: "Familles",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Ingredients",
                table: "Ingredients",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Familles",
                table: "Familles",
                column: "Id");
        }
    }
}
