const moment = require('moment')

module.exports = function (day, type) {
    // Get current day
    let currentDay = moment(day).date()

    // get last day in month
    let lastDay = moment(day).daysInMonth()

    // first month days
    let prevMonth = []
    for (let i = currentDay; i <= lastDay; i++) {
        let a = moment(day).set({ date: i })
        prevMonth.push(a)
    }

    // next month days
    let nextCurrentDay = moment(day).add(1, 'months')
    let nextMonth = []
    for (let i = 1; i <= nextCurrentDay.date(); i++) {
        let a = moment(day).set({
            date: i,
            months: nextCurrentDay.month(),
            years: nextCurrentDay.year()
        })
        nextMonth.push(a)
    }

    // merge two month's days
    const fullMonth = [...prevMonth, ...nextMonth]

    // filter sunday from fullMonth
    const res = fullMonth.filter((item) => (item.format('dddd') !== "Sunday"))
    const odd = []
    const even = []

    const condition = (value) => (
        value === 'Monday' || value === 'Wednesday' || value === 'Friday'
    )

    // separate days odd or even
    res.forEach((item, index) => {
        let formatted = item.format('dddd')
        if (condition(formatted)) {
            odd.push(item)
        } else {
            even.push(item)
        }
    })

    // determine current day odd or even
    let final = []
    if (condition(moment(day).format('dddd'))) {
        final = odd
    } else {
        final = even
    }

    // return result depending on group type
    if (type === 'daily') {
        return final.splice(0, 12)
    } else {
        return final
    }
}