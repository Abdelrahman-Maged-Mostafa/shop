export const sortItems = (items, sort) => {
  return items.slice().sort((a, b) => {
    const getPrices = (item) => {
      if (item?.properties?.colors?.length) {
        return item.properties.colors.map((color) => color.price);
      } else if (item?.properties?.colorsAndSize?.length) {
        return item.properties.colorsAndSize.flatMap((color) =>
          Object.values(color.sizes).map((size) => size.price)
        );
      } else if (item?.properties?.sizes?.length) {
        return item.properties.sizes.map((size) => size.price);
      } else {
        return [item.price];
      }
    };

    const getMinPrice = (item) => Math.min(...getPrices(item));

    switch (sort) {
      case "Popularity-asc":
        return b.reviews.length - a.reviews.length;
      case "Popularity-desc":
        return a.reviews.length - b.reviews.length;
      case "price-asc":
        return getMinPrice(b) - getMinPrice(a);
      case "price-desc":
        return getMinPrice(a) - getMinPrice(b);
      default:
        return 0;
    }
  });
};

// Usage example
