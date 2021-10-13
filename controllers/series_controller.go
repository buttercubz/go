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

// GetAllSeries handler
func GetAllSeries(ctx *fiber.Ctx) error {
	query := bson.D{{}}
	cursor, err := database.Mg.DB.Collection("series").Find(ctx.Context(), query)

	if err != nil {
		panic(err)
	}

	var series models.Series = make([]models.Serie, 0)

	if err := cursor.All(ctx.Context(), &series); err != nil {
		panic(err)
	}

	return ctx.JSON(series)
}

// GetSerieByID handler
func GetSerieByID(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	query := utils.QueryID(id)

	result := database.Mg.DB.Collection("series").FindOne(ctx.Context(), query)

	var serie models.Serie = models.Serie{}

	err := result.Decode(&serie)

	if err != nil {
		panic(err)
	}

	return ctx.JSON(serie)
}

// CreateSerie handler
func CreateSerie(ctx *fiber.Ctx) error {
	collection := database.Mg.DB.Collection("series")

	serie := new(models.Serie)

	if err := ctx.BodyParser(serie); err != nil {
		panic(err)
	}

	// force MongoDB to generate ObjectId
	serie.ID = ""

	// for softdelete
	serie.IsDeleted = false

	insertionResult, err := collection.InsertOne(ctx.Context(), serie)
	if err != nil {
		panic(err)
	}

	filter := bson.D{{Key: "_id", Value: insertionResult.InsertedID}}
	createdRecord := collection.FindOne(ctx.Context(), filter)

	createdSerie := &models.Serie{}

	if err := createdRecord.Decode(createdSerie); err != nil {
		panic(err)
	}

	return ctx.JSON(createdSerie)
}

// UpdateSerieByID handler
func UpdateSerieByID(ctx *fiber.Ctx) error {
	id := ctx.Params("id")

	newSerie := new(models.Serie)

	if err := ctx.BodyParser(newSerie); err != nil {
		panic(err)
	}

	query := utils.QueryID(id)

	update := bson.D{
		{
			Key: "$set",
			Value: bson.D{
				{
					Key:   "name",
					Value: newSerie.Name,
				},
				{
					Key:   "amountofseasons",
					Value: newSerie.AmountOfSeasons,
				},
				{
					Key:   "amountofepisodes",
					Value: newSerie.AmountOfEpisodes,
				},
				{
					Key:   "rating",
					Value: newSerie.Rating,
				},
				{
					Key:   "description",
					Value: newSerie.Description,
				},
				{
					Key:   "poster",
					Value: newSerie.Poster,
				},
				{
					Key:   "characters",
					Value: newSerie.Characters,
				},
			},
		},
	}

	err := database.Mg.DB.Collection("series").FindOneAndUpdate(ctx.Context(), query, update).Err()

	if err != nil {
		if err == mongo.ErrNoDocuments {
			fmt.Println("not found")
			panic(err)
		}

		panic(err)
	}

	newSerie.ID = id

	return ctx.JSON(newSerie)
}

// DeleteSerieSoftly handler
func DeleteSerieSoftly(ctx *fiber.Ctx) error {
	id := ctx.Params("id")
	query := utils.QueryID(id)

	update := bson.D{
		{
			Key: "$set",
			Value: bson.D{
				{
					Key:   "isdeleted",
					Value: true,
				},
			},
		},
	}

	err := database.Mg.DB.Collection("series").FindOneAndUpdate(ctx.Context(), query, update).Err()

	if err != nil {
		if err == mongo.ErrNoDocuments {
			fmt.Println("not found")
			panic(err)
		}

		panic(err)
	}

	return ctx.SendString("ok")
}
