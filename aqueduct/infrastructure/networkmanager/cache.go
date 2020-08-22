package networkmanager

import (
	"github.com/seashell/aqueduct/aqueduct/application"
)

// Cache :
type Cache struct {
	AccessPoints map[string]application.AccessPoint
}

// NewCache :
func NewCache() *Cache {
	return &Cache{
		AccessPoints: make(map[string]application.AccessPoint),
	}
}

// Init :
func (c *Cache) Init() error {

	if c.AccessPoints == nil {
		c.AccessPoints = make(map[string]application.AccessPoint)
	}

	return nil
}

// Update :
func (c *Cache) Update(aps []application.AccessPoint) error {

	if err := c.Clear(); err != nil {
		return err
	}

	if err := c.Init(); err != nil {
		return err
	}

	for _, ap := range aps {
		c.AccessPoints[ap.SSID()] = ap
	}

	return nil
}

// Clear :
func (c *Cache) Clear() error {

	if c.AccessPoints != nil {
		for k := range c.AccessPoints {
			delete(c.AccessPoints, k)
		}
		c.AccessPoints = nil
	}

	return nil
}

// Get :
func (c *Cache) Get() []application.AccessPoint {

	items := []application.AccessPoint{}
	for _, ap := range c.AccessPoints {
		items = append(items, ap)
	}

	return items
}
