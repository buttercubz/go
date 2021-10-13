package models

// Series type for collection of series
type Series = []Serie

// User struct model
type User struct {
	ID         string   `json:"id,omitempty" bson:"_id,omitempty"`
	Name       string   `json:"name"`
	Email      string   `json:"email"`
	Location   string   `json:"location"`
	Timezone   string   `json:"time_zone"`
	Language   string   `json:"language"`
	SeriesList []string `json:"series_list"`
}
