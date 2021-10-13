package database

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// MongoInstance struct
type MongoInstance struct {
	Client *mongo.Client
	DB     *mongo.Database
}

// Mg MongoInstance
var Mg MongoInstance

const dbName = "series_app"
const mongoURI = "mongodb://localhost:27017/" + dbName

// Connect to mongo db
func Connect() error {
	client, err := mongo.NewClient(options.Client().ApplyURI(mongoURI))

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)

	defer cancel()

	err = client.Connect(ctx)
	db := client.Database(dbName)

	if err != nil {
		return err
	}

	Mg = MongoInstance{
		Client: client,
		DB:     db,
	}

	return nil
}
