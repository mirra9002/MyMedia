import './ArticlePreview.css'

export default function ArticlePreview({title, description, content, first_name, last_name, onClick}) {
  const thumbnailImage = description;
console.log('thumbnailImage:', thumbnailImage);
console.log('isimage:', isImageLink(thumbnailImage));

  return (
    <div id="div-article" onClick={onClick}>
      {isImageLink(thumbnailImage) && (
        <img src={thumbnailImage} alt="Thumbnail image" />
      )}
      <h1>{title}</h1>
      <p>{first_name && last_name ? `${first_name} ${last_name}` : 'народна творчість'}</p>
    </div>
  );
}

function isImageLink(url) {
  if (typeof url !== 'string') return false;
  try {
    const cleanPath = new URL(url).pathname; // handles URLs with query strings
    return /\.(jpe?g|png|gif|webp|svg)$/i.test(cleanPath);
  } catch (e) {
    return false; // if it's not a valid URL
  }
}
