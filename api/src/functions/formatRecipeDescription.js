function formatRecipeDescription(description) {
  // Eliminar etiquetas HTML
  const withoutHtml = description.replace(/<\/?[^>]+(>|$)/g, "");

  // Reemplazar entidades HTML como &amp; con sus caracteres correspondientes
  const decodedText = withoutHtml
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");

  return decodedText;
}

module.exports = formatRecipeDescription;
