const dataJson = require('../models/dataSchema');

exports.datapost = async (req, res) => {
    try {
        const dataArray = req.body;

        if (!Array.isArray(dataArray) || dataArray.length === 0) {
            return res.status(400).json({ error: "Invalid data format." }); 
        }

        const insertedData = await dataJson.insertMany(dataArray, { ordered: false });

        res.status(200).json(insertedData);
    } catch (error) {
        console.error("Error inserting documents:", error);

        if (error.code === 11000) {
            return res.status(200).json({ message: "Some IDs already exist in the database." });
        }

        res.status(500).json({ error: "Internal Server Error" });
    }
};




//   get movies 


exports.getData = async (req, res) => {
    try {
        const allData = await dataJson.find().sort({ _id: -1 }).exec();

        res.status(200).json({
            success: 200,
            totalResults: allData.length,
            results: allData,
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// get id data from database 

exports.getServerData = async (req, res) => {
    try {
        const title = req.query.id;

        if (!title) {
            return res.status(400).json({ error: "Title parameter is required" });
        }

        const results = await dataJson.find({ embed_title: title }).exec();


        res.status(200).json({
            success: true,
            results,
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};