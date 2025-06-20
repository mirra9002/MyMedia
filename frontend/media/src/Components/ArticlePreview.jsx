import './ArticlePreview.css'

<<<<<<< HEAD
export default function ArticlePreview({title, description, content, username, profile_image, onClick, thumbnail_image}) {

console.log('thumbnail_image: ', thumbnail_image);
=======
export default function ArticlePreview({title, description, content, username, profile_image, onClick}) {
  const thumbnailImage = description;
console.log('thumbnailImage:', thumbnailImage);
console.log('isimage:', isImageLink(thumbnailImage));
console.log('username: ', username);
>>>>>>> 473127c3a78019e145dab0f265a3963f330b07eb
  return (
    <div id="div-article" onClick={onClick}>
      {thumbnail_image ? isImageLink(thumbnail_image) && (
        <img src={thumbnail_image} alt="Thumbnail image" />
      ) : null}
      <h1>{title}</h1>
<<<<<<< HEAD
      <h3>{description}</h3>
=======
>>>>>>> 473127c3a78019e145dab0f265a3963f330b07eb
      <p>{username ? username : 'народна творчість'}</p>
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
