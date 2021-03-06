const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'card.json'
)

class Card  {
    static async add(course) {
        const card = await Card.fetch()

        const idx = card.courses.findIndex(x => x.id === course.id)
        const candidate = card.courses[idx]

        if (candidate) {
            // be
            candidate.count++
            card.courses[idx] = candidate
        }
        else {
            // not be
            course.count = 1
            card.courses.push(course)
        }

        card.price += Number(course.price)

        return new Promise((resolve, reject) => {
            fs.writeFile(p,
            JSON.stringify(card),
            err => {
                if (err) {
                reject(err)
                } 
                else {
                    resolve()
                }
            })
        })
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p,
            'utf-8',
            (err, content) => {
                if (err) {
                    reject()
                }
                else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }
}

module.exports = Card;