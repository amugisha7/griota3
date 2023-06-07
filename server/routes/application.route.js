import express from 'express'; 

import {
    getAllApplications,
    getApplicationInfo,
    createApplication,
    deleteApplication,
    updateApplication
} from '../controllers/application.controller.js'

const router = express.Router()

router.route('/').get(getAllApplications)
router.route('/:id').get(getApplicationInfo)
router.route('/').post(createApplication)
router.route('/:id').delete(deleteApplication)
router.route('/:id').patch(updateApplication)

export default router