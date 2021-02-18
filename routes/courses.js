const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('Courses', {
        title: 'Courses',
        isCourses: true,
    })
})

module.exports = router;