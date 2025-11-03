// https://www.codewars.com/kata/597770e98b4b340e5b000071

class FileNameExtractor {
  static extractFileName(dirtyFileName) {
    const underscoreIndex = dirtyFileName.indexOf("_");

    const fileName =
      underscoreIndex !== -1
        ? dirtyFileName.slice(underscoreIndex + 1)
        : dirtyFileName;

    const dotIndex = fileName.lastIndexOf(".");

    return dotIndex !== -1 ? fileName.slice(0, dotIndex) : fileName;
  }
}
