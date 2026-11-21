// Authentic high-definition image assets extracted directly from the original UI mockup
export const LOCAL_IMAGES = {
  heroBurger: '/images/hero-burger.png',
  burger: '/images/popular-burger.png',
  pizza: '/images/popular-pizza.png',
  pasta: '/images/popular-pasta.png',
  dragonBowl: '/images/popular-dragon.png',
  coffee: '/images/item-coffee.png',
  gourmetHub: '/images/res-gourmet.png',
  pizzaPalace: '/images/res-pizza.png',
  burgerBlvd: '/images/res-burger.png',
  pastaPlanet: '/images/res-pasta.png',
  scooter: '/images/scooter-rider.png',
  celebrationFood: '/images/celebration-food.png',
  restaurantCover: '/images/restaurant-cover.svg',
};

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
  if (lower.includes('gourmet') || lower.includes('hub')) return LOCAL_IMAGES.gourmetHub;
  if (lower.includes('pizza')) return LOCAL_IMAGES.pizzaPalace;
  if (lower.includes('burger')) return LOCAL_IMAGES.burgerBlvd;
  if (lower.includes('pasta')) return LOCAL_IMAGES.pastaPlanet;
  return LOCAL_IMAGES.gourmetHub;
};
