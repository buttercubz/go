package main

import (
	"fmt"

	"github.com/buttercubz/go/database"
	"github.com/buttercubz/go/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()

	if err := database.Connect(); err != nil {
		panic(err)
	} else {
		fmt.Println("database connected")
	}

	app.Use(cors.New())
	routes.SetupRoutes(app)

	app.Listen(":4000")
}
