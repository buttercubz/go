package models

// Categories struct model
type Categories struct {
	ID          string `json:"id,omitempty" bson:"_id,omitempty"`
	Name        string `json:"name"`
	Description string `json:"description"`
}
