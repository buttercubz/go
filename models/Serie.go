package models

// Serie struct model
type Serie struct {
	ID               string   `json:"id,omitempty" bson:"_id,omitempty"`
	Name             string   `json:"name"`
	AmountOfSeasons  int      `json:"amount_of_seasons"`
	AmountOfEpisodes int      `json:"amount_of_episodes"`
	Rating           float64  `json:"rating"`
	Description      string   `json:"description"`
	Poster           string   `json:"poster"`
	Characters       []string `json:"characters"`
	IsDeleted        bool     `json:"is_deleted"`
}
