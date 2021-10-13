package utils

import (
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// QueryID make query from id object
func QueryID(id string) bson.M {
	objID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		panic(err)
	}

	return bson.M{"_id": bson.M{"$eq": objID}}

}
