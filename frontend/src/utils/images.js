// Local high-definition culinary image assets
export const LOCAL_IMAGES = {
  burger: '/images/burger.svg',
  pizza: '/images/pizza.svg',
  pasta: '/images/pasta.svg',
  dragonBowl: '/images/dragon-bowl.svg',
  coffee: '/images/coffee.svg',
  gourmetHub: '/images/gourmet-hub.svg',
  pizzaPalace: '/images/pizza-palace.svg',
  burgerBlvd: '/images/burger-blvd.svg',
  pastaPlanet: '/images/pasta-planet.svg',
  restaurantCover: '/images/restaurant-cover.svg',
};

// Returns a reliable local image based on name or category
export const getDishImage = (name = '') => {
  const lower = name.toLowerCase();
  if (lower.includes('burger')) return LOCAL_IMAGES.burger;
  if (lower.includes('pizza')) return LOCAL_IMAGES.pizza;
  if (lower.includes('pasta') || lower.includes('alfredo')) return LOCAL_IMAGES.pasta;
  if (lower.includes('dragon') || lower.includes('bowl') || lower.includes('wok') || lower.includes('noodle')) return LOCAL_IMAGES.dragonBowl;
  if (lower.includes('coffee') || lower.includes('drink') || lower.includes('beverage') || lower.includes('shake')) return LOCAL_IMAGES.coffee;
  return LOCAL_IMAGES.burger;
};

export const getRestaurantImage = (name = '') => {
  const lower = name.toLowerCase();
  if (lower.includes('gourmet')) return LOCAL_IMAGES.gourmetHub;
  if (lower.includes('pizza')) return LOCAL_IMAGES.pizzaPalace;
  if (lower.includes('burger')) return LOCAL_IMAGES.burgerBlvd;
  if (lower.includes('pasta')) return LOCAL_IMAGES.pastaPlanet;
  return LOCAL_IMAGES.gourmetHub;
};
