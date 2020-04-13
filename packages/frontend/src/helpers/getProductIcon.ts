export function getProductIconUrl(
  productTitle?: string,
  productTypeTitle?: string
) {
  if (!productTitle && !productTypeTitle) {
    return "";
  }

  const productType = productTypeTitle.toLowerCase();
  const title = productTitle.toLowerCase();

  if (productType === "mask") {
    if (title.includes("ffp") || title.includes("kn95")) {
      return "/images/productTypes/ffp-mask.svg";
    }

    return "/images/productTypes/mask.svg";
  }

  return `/images/productTypes/${productTypeTitle}.svg`;
}
