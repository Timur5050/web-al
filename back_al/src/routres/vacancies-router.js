import { Router } from 'express'
import { db } from '../repository-configs/firebase.js'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection('vacancies').get()
        const vacancies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        res.json(vacancies)
    } catch (err) {
        res.status(500).json({ error: 'Помилка при отриманні вакансій' })
    }
})
router.post('/:id/apply', async (req, res) => {
    const id = req.params.id
    try {
        console.log("applied by id: "+ id)
        const vacancyRef = db.collection('vacancies').doc(id)
        await vacancyRef.update({ isApplied: true })
        res.json({ message: 'Заявку подано успішно' })
    } catch (err) {
        res.status(500).json({ error: 'Помилка при подачі заявки' })
    }
})

export const getVacanciesRouter = () => router
