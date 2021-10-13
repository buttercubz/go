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

// GetAllUsers handler
func GetAllUsers(ctx *fiber.Ctx) error {
	query := bson.D{{}}

	cursor, err := database.Mg.DB.Collection("users").Find(ctx.Context(), query)

	if err != nil {
		return ctx.Status(500).SendString(err.Error())
	}

	var users []models.User = make([]models.User, 0)

	if err := cursor.All(ctx.Context(), &users); err != nil {
		return ctx.Status(500).SendString(err.Error())
	}

	return ctx.JSON(users)
}

// GetUserByID handler
func GetUserByID(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	query := utils.QueryID(id)

	result := database.Mg.DB.Collection("users").FindOne(ctx.Context(), query)

	var user models.User = models.User{}

	result.Decode(&user)

	return ctx.JSON(user)
}

// CreateUser handler
func CreateUser(ctx *fiber.Ctx) error {
	collection := database.Mg.DB.Collection("users")

	user := new(models.User)

	if err := ctx.BodyParser(user); err != nil {
		panic(err)
	}

	// force MongoDB to generate ObjectId
	user.ID = ""

	insertionResult, err := collection.InsertOne(ctx.Context(), user)
	if err != nil {
		return ctx.Status(500).SendString(err.Error())
	}

	filter := bson.D{{Key: "_id", Value: insertionResult.InsertedID}}
	createdRecord := collection.FindOne(ctx.Context(), filter)

	createdUser := &models.User{}
	createdRecord.Decode(createdUser)

	return ctx.JSON(createdUser)
}

// AddSerieToFavorite handler
func AddSerieToFavorite(ctx *fiber.Ctx) error {
	serie := new(models.Serie)

	if err := ctx.BodyParser(serie); err != nil {
		panic(err)
	}

	id := ctx.Params("id")
	query := utils.QueryID(id)

	var finded models.User = models.User{}

	database.Mg.DB.Collection("users").FindOne(ctx.Context(), query).Decode(&finded)

	finded.SeriesList = append(finded.SeriesList, serie.ID)

	update := bson.D{
		{
			Key: "$set",
			Value: bson.D{
				{
					Key:   "serieslist",
					Value: finded.SeriesList,
				},
			},
		},
	}

	err := database.Mg.DB.Collection("users").FindOneAndUpdate(ctx.Context(), query, update).Err()

	if err != nil {
		if err == mongo.ErrNoDocuments {
			fmt.Println("not found")
			panic(err)
		}

		panic(err)
	}

	return ctx.SendString("ok")
}

// DeleteUserByID handler
func DeleteUserByID(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	query := utils.QueryID(id)

	results, err := database.Mg.DB.Collection("users").DeleteOne(ctx.Context(), query)

	if err != nil {
		panic(err)
	}

	if results.DeletedCount < 1 {
		fmt.Println("not found")
	}

	return ctx.SendString("ok")
}
