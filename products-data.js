const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "خزان مياه بولي إيثيلين",
    category: "خزانات مياه",
    price: "12,000 جنيه مصري",
    image: "https://i.imgur.com/8QfQY5y.png"
  },
  {
    id: 2,
    name: "فلتر مياه 5 مراحل",
    category: "فلاتر مياه",
    price: "4,500 جنيه مصري",
    image: "https://i.imgur.com/4AiXzf8.png"
  },
  {
    id: 3,
    name: "جهاز رياضي منزلي",
    category: "أجهزة رياضية",
    price: "8,200 جنيه مصري",
    image: "https://i.imgur.com/1KegWPz.png"
  }
];

if (!localStorage.getItem("ft_products")) {
  localStorage.setItem("ft_products", JSON.stringify(DEFAULT_PRODUCTS));
}
