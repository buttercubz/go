package routes

import (
	"github.com/buttercubz/go/controllers"
	"github.com/gofiber/fiber/v2"
)

// SetupRoutes to register all routes
func SetupRoutes(app *fiber.App) {

	//? series endpoint
	app.Get("/api/series", controllers.GetAllSeries)
	app.Get("/api/series/:id", controllers.GetSerieByID)
	app.Post("/api/series", controllers.CreateSerie)
	app.Put("/api/series/:id", controllers.UpdateSerieByID)
	app.Delete("/api/series/:id", controllers.DeleteSerieSoftly)

	//? users endpoint
	app.Get("/api/users", controllers.GetAllUsers)
	app.Get("/api/users/:id", controllers.GetUserByID)
	app.Post("/api/users", controllers.CreateUser)
	app.Post("/api/users/:id/add", controllers.AddSerieToFavorite)
	app.Delete("/api/users/:id", controllers.DeleteUserByID)

	//? categories endpoint
	app.Get("/api/categories", controllers.GetAllCategories)
	app.Get("/api/categories/:id", controllers.GetCategorieByID)
	app.Post("/api/categories", controllers.CreateCategorie)
	app.Put("/api/categories/:id", controllers.UpdateCategorieByID)
	app.Delete("/api/categories/:id", controllers.DeleteCategorieByID)

}
