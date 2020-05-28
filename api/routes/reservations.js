const express = require('express');
const router = express.Router();

const Airtable = require('Airtable')
const base =  new Airtable({ apiKey: 'keytxEtjU0M12BrZs'}).base('app0ibm3fos6V3HOX')
const table = base('Reservation');

const getRecordById = async (id) => {
    const record = await table.find(id)
    const reservation = {
        id: record.id,
        createdTime: record._rawJson.createdTime,
        table: record.fields.table,
        datetime: record.fields.datetime,
        numberOfGuests: record.fields.numberOfGuests,
        name: record.fields.name,
        phone: record.fields.phone
    }
    return reservation
}

const createRecord = async (fields) => {
    const newReservation = await table.create(fields)
    return newReservation.id
}

// GET SPECIFIC
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const reservation = await getRecordById(id)
        if (reservation) {
            res.status(200).json({
                reservation
            })
        } else {
            res.status(400).json({
                message: `Cannot get id ${id}`
            })
        }
    } catch (error) {
        res.status(400).json({
            message: 'Something went wrong',
            error: error.message
        })
    }
})

router.post('/', async (req, res, next) => {
    try {
        const data = {...req.body}
        const reservation = {
            name: data.name,
            table: data.table,
            datetime:data.datetime,
            numberOfGuests: data.numberOfGuests,
            phoneNumber: data.phone
        }
        const newReservationId = await createRecord(reservation)
        res.status(200).json({
            id: newReservationId
        })
    } catch (error) {
        res.status(400).json({
            message: 'Something went wrong',
            error: error.message
        })
    }
})

module.exports = router;