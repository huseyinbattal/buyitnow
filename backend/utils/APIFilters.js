class APIFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);
    let output = {};
    let prop = "";
    for (let key in queryCopy) {
      if (!key.match(/\b(gt|gte|lt|lte)/)) {
        output[key] = queryCopy[key];
      } else {
        prop = key.split("[")[0];
        let operator = key.match(/\[(.*)\]/)[1]
        if (!output[prop]) {
          output[prop] = {};
        }
        output[prop][`$${operator}`] = queryCopy[key];
      }
    }
    this.query = this.query.find(output);
    return this;
  }
}

export default APIFilters;
