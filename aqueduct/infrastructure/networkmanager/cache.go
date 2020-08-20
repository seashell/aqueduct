package networkmanager

import (
	"github.com/seashell/aqueduct/aqueduct/application"
)

type Cache struct {
	AccessPoints map[string]application.AccessPoint
}


func NewCache() (*Cache){
	return &Cache{
		AccessPoints: make(map[string]application.AccessPoint),
	}
}

func (c *Cache) Init() error {

	if c.AccessPoints == nil {
		c.AccessPoints = make(map[string]application.AccessPoint)
	}

	return nil
}

func (c *Cache) Update(aps []application.AccessPoint) (error) {

	
	if err := c.Clear(); err != nil {
		return err
	}

	if err := c.Init(); err != nil {
		return err
	}

	for _,ap := range aps {
		c.AccessPoints[ap.SSID()] = ap
	}
	
	return nil
}

func (c *Cache) Clear() (error) {

	if c.AccessPoints != nil {
		for k := range c.AccessPoints {
			delete(c.AccessPoints, k)
		}
		c.AccessPoints = nil
	}
	
	return nil
}


func (c *Cache) Get() ([]application.AccessPoint) {

	items := []application.AccessPoint{}
	for _,ap := range c.AccessPoints {
		items = append(items, ap)		
	}

	return items
}