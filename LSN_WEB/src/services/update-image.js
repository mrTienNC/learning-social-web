export default {
  createImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const temp = e.target.result;
        resolve(temp);
      };
      reader.readAsDataURL(file);
    });
  },
};
