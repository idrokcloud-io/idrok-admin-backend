class ApiFeatures {
    query
    queryString
    reserverFields = ["_id"]

    constructor(query, queryString) {
        this.query = query
        this.queryString = queryString
    }

    filter() {
        // TODO: exclude deleted objects
        const queryObj = { ...this.queryString }

        Object.keys(queryObj).forEach((key) => {
            if (!this.reserverFields.includes(key) && key.startsWith("_")) {
                // @ts-ignore
                delete queryObj[key]
            }
        })

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|ne|or|nin)\b/g, (match) => `$${match}`)

        this.query = this.query.find(JSON.parse(queryStr))

        return this
    }

    // sort() {
    //     if (this.queryString._sort) {
    //         const factors = { asc: "", desc: "-" }
    //         const [field, factor] = this.queryString._sort.split(":")

    //         // @ts-ignore
    //         const sortBy = `${factors[factor] ?? ""}${field}`

    //         this.query = this.query.sort(sortBy)
    //     } else {
    //         this.query = this.query.sort(`-createdAt`)
    //     }

    //     return this
    // }

    paginate() {

        const page = this.queryString._page * 1 || 1
        const limit = this.queryString._limit * 1 || 50
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this
    }

    limitFields() {
        if (this.queryString._fields) {
            const fields = this.queryString._fields.split(",").join(" ")

            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select("-__v")
        }

        return this
    }
}

module.exports = ApiFeatures