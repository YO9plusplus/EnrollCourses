export const optimizeImage = (url, width = 600) => {
    if (!url || !url.includes('cloudinary.com')) return url;
    const result = url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
    return result;
};