import fs from 'fs';

async function getTags(connection, product) {
    const tagsObject = await connection.query('SELECT category_name FROM PRODUCT_CATEGORY WHERE product_id=?', [ product.product_id ]); // get all product categories 
    const tags = [];
    for (const tag of tagsObject) {
        tags.push(tag.category_name);
    }
    return tags;
}

function getImages(connection, product) {
    return new Promise(async (resolve, reject) => {
        const imagesObject = await connection.query('SELECT image_path FROM PRODUCT_IMAGE WHERE product_id=?', [product.product_id]);
        const images = [];

        const readImage = (image) => {
            return new Promise((resolve, reject) => {
                const imagePath = 'public/images/' + image.image_path;

                fs.readFile(imagePath, (err, data) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        const imageBase64 = data.toString('base64');
                        images.push(imageBase64);
                        resolve();
                    }
                });
            });
        };

        const promises = imagesObject.map((image) => readImage(image));

        try {
            await Promise.all(promises);
            resolve(images);
        } catch (error) {
            reject(error);
        }
    });
}

function getFileExtension(filename) {
















































    
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

export { getTags, getImages }
