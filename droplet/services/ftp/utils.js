module.exports = {
  getFilePath: file => {
    return file.replace(`${process.env.ROOT_DIR}\\uploads\\`, " ").trim();
  },
  parseFilePath: filePath => {
    const pathArr = filePath.split("\\");

    return {
      cameraName: pathArr[0],
      date: {
        year: pathArr[1],

        month: pathArr[2],

        day: pathArr[3],

        hour: pathArr[4]
          .split(".")[0]
          .split("_")[2]
          .substring(8, 10),

        minute: pathArr[4]
          .split(".")[0]
          .split("_")[2]
          .substring(10, 12),

        second: pathArr[4]
          .split(".")[0]
          .split("_")[2]
          .substring(12)
      },
      ext: pathArr[4].split(".")[1]
    };
  }
};
