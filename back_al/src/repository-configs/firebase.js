import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import fs from 'fs'
const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf-8'))


initializeApp({
    credential: cert(serviceAccount),
})

export const db = getFirestore()
