const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
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
            card.course[idx] = candidate
        }
        else {
            // not be
            course.count = 1
            card.courses.push(course)
        }

        card.price += +course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
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
            fs.readFile(p, 'utf-8', (err, res) => {
                if (err) {
                    reject()
                }
                else {
                    resolve(JSON.parse(res))
                }
            })
        })
    }
}

module.exports = Card;