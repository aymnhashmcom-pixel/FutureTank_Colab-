const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "خزان مياه بولي إيثيلين",
    brand: "FutureTank",
    category: "خزانات مياه",
    price: "12,000 جنيه",
    image: "https://i.imgur.com/8QfQY5y.png"
  },
  {
    id: 2,
    name: "فلتر مياه 5 مراحل",
    brand: "PureLife",
    category: "فلاتر مياه",
    price: "4,500 جنيه",
    image: "https://i.imgur.com/4AiXzf8.png"
  },
  {
    id: 3,
    name: "جهاز رياضي منزلي",
    brand: "FitPro",
    category: "أجهزة رياضية",
    price: "8,200 جنيه",
    image: "https://i.imgur.com/1KegWPz.png"
  }
];

localStorage.setItem("ft_products", JSON.stringify(DEFAULT_PRODUCTS));
