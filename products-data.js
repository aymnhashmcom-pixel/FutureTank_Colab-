const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "خزان مياه بولي إيثيلين",
    brand: "FutureTank",
    category: "خزانات مياه",
    price: "12,000 جنيه",
    media: "https://via.placeholder.com/300",
    mediaType: "image"
  },
  {
    id: 2,
    name: "فلتر مياه 5 مراحل",
    brand: "PureLife",
    category: "فلاتر",
    price: "4,500 جنيه",
    media: "https://via.placeholder.com/300",
    mediaType: "image"
  },
  {
    id: 3,
    name: "جهاز رياضي منزلي",
    brand: "FitPro",
    category: "أجهزة رياضية",
    price: "8,200 جنيه",
    media: "https://via.placeholder.com/300",
    mediaType: "image"
  }
];

if (!localStorage.getItem("ft_products")) {
  localStorage.setItem("ft_products", JSON.stringify(DEFAULT_PRODUCTS));
    }
