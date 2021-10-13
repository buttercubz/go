package controllers

import (
	"fmt"

	"github.com/buttercubz/go/database"
	"github.com/buttercubz/go/models"
	"github.com/buttercubz/go/utils"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// GetAllCategories handler
func GetAllCategories(ctx *fiber.Ctx) error {
	query := bson.D{{}}

	cursor, err := database.Mg.DB.Collection("categories").Find(ctx.Context(), query)

	if err != nil {
		return ctx.Status(500).SendString(err.Error())
	}

	var categories []models.Categories = make([]models.Categories, 0)

	if err := cursor.All(ctx.Context(), &categories); err != nil {
		return ctx.Status(500).SendString(err.Error())
	}

	return ctx.JSON(categories)
}

// GetCategorieByID handler
func GetCategorieByID(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	query := utils.QueryID(id)

	result := database.Mg.DB.Collection("categories").FindOne(ctx.Context(), query)

	var categorie models.Categories = models.Categories{}

	result.Decode(&categorie)

	return ctx.JSON(categorie)
}

// CreateCategorie handler
func CreateCategorie(ctx *fiber.Ctx) error {
	collection := database.Mg.DB.Collection("categories")

	categorie := new(models.Categories)

	if err := ctx.BodyParser(categorie); err != nil {
		panic(err)
	}

	// force MongoDB to generate ObjectId
	categorie.ID = ""

	insertionResult, err := collection.InsertOne(ctx.Context(), categorie)
	if err != nil {
		return ctx.Status(500).SendString(err.Error())
	}

	filter := bson.D{{Key: "_id", Value: insertionResult.InsertedID}}
	createdRecord := collection.FindOne(ctx.Context(), filter)

	createdCategorie := &models.Categories{}
	createdRecord.Decode(createdCategorie)

	return ctx.JSON(createdCategorie)
}

// UpdateCategorieByID handler
func UpdateCategorieByID(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	newCategorie := new(models.Categories)

	if err := ctx.BodyParser(newCategorie); err != nil {
		panic(err)
	}

	query := utils.QueryID(id)

	update := bson.D{
		{
			Key: "$set",
			Value: bson.D{
				{
					Key:   "name",
					Value: newCategorie.Name,
				},
				{
					Key:   "description",
					Value: newCategorie.Description,
				},
			},
		},
	}

	err := database.Mg.DB.Collection("categories").FindOneAndUpdate(ctx.Context(), query, update).Err()

	if err != nil {
		if err == mongo.ErrNoDocuments {
			fmt.Println("not found")
			panic(err)
		}

		panic(err)
	}

	newCategorie.ID = id

	return ctx.JSON(newCategorie)
}

// DeleteCategorieByID handler
func DeleteCategorieByID(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	query := utils.QueryID(id)

	results, err := database.Mg.DB.Collection("categories").DeleteOne(ctx.Context(), query)

	if err != nil {
		panic(err)
	}

	if results.DeletedCount < 1 {
		fmt.Println("not found")
	}

	return ctx.SendString("ok")
}
