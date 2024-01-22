require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Company = require('./models/Company');
const Report = require('./models/Report');

app.use(express.json()); // middleware for parsing json
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(_dirname, 'index.html'));
});

// Get all companies
app.get('/companies', async (req, res) => {
    try {
        const allCompanies = await Company.find();
        res.json(allCompanies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }   
});

// Get specific company
app.get('/companies/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({message: `Cannot find company with id ${req.params.id}`});
        }            
        res.status(200).json(company);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a company
app.post('/companies', async (req, res) => {
    try {
        const company = await Company.create(req.body);
        res.status(200).json(company);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a company
app.put('/companies/:id', async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body);
        if (!company) {
            return res.status(404).json({message: `Cannot find company with id ${req.params.id}`});
        }
        res.status(200).json({ previousData: company, newData: req.body });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a company
app.delete('/companies/:id', async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) {
            return res.status(404).json({message: `Cannot find company with id ${req.params.id}`})
        }
        res.status(200).json({ message: "Deleted company", company: company });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Get all reports
app.get('/reports', async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Send a report
app.post('/reports', async (req, res) => {
    try {
        const report = await Report.create(req.body);
        res.status(200).json(report);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a report
app.put('/reports/:id', async (req, res) => {
    try {
        const report = await Report.findByIdAndUpdate(req.params.id, req.body);
        if (!report) {
            return res.status(404).json({ message: `Cannot find a report with id ${req.params.id}` })
        }
        res.status(200).json({ previousData: report, newData: req.body })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// Delete a report
app.delete('/reports/:id', async (req, res) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);
        if (!report) {
            return res.status(404).json({ message: `Cannot find a report with id ${req.params.id}` })
        }
        res.status(200).json({ message: 'Deleted report', report: report });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        app.listen(3000, () => console.log(`Connected to Database. Listening on port 3000.`));
    })
    .catch(err => console.error(err));