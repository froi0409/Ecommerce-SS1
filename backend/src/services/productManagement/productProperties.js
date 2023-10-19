export async function getTags(connection, product) {
    const tagsObject = await connection.query('SELECT category_name FROM PRODUCT_CATEGORY WHERE product_id=?', [ product.product_id ]); // get all product categories 
    const tags = [];
    for (const tag of tagsObject) {
        tags.push(tag.category_name);
    }
    return tags;
}

export async function getImages(connection, product) {
    const imagesObject = await connection.query('SELECT image_path FROM PRODUCT_IMAGE WHERE product_id=?', [ product.product_id ]);
    const images = [];
    for (const image of imagesObject) {
        const imagePath = 'public/images/' + image.image_path;
        console.log(imagePath);
    }
}

function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}
