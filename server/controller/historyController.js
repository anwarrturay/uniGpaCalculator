const ResultHistory = require('../models/resultHistory')

const postHistory = async(req, res) => {
    const {type, userId} = req.body
    if(!type || !userId) return res.status(400).json({"message": "The type and userId of history is required!"});
    const userHistory = await ResultHistory.find({userId}).exec();
    if(userHistory.length > 9) return res.status(400).json({"message": "Limit reached! You can only save up to 10 results. To add a new one, please remove an older entry."});
    console.log(userHistory.length)
    if (type === "semester1"){
        const {department, level, userId, type, semester1Modules, semester1Score} = req.body;
        if(!department || !level || !userId || !type || !semester1Modules || !semester1Score) return res.status(400).json({"message": "The required fields were not sent!"});
        await ResultHistory.create({department, level, userId, type, semester1Modules, semester1Score});
        res.status(201).json({"message": "History successfully saved!"})
    }else if (type === "semester2"){
        const {department, level, userId, type, semester2Modules, semester2Score} = req.body
        if(!department || !level || !userId || !type || !semester2Modules || !semester2Score) return res.status(400).json({"message": "The required fields were not sent!"})
        const result = await ResultHistory.create({department, level, userId, type, semester2Modules, semester2Score});
        console.log(result);
        res.status(201).json({"message": "History successfully saved!"})
    }else if (type === "both"){
        const {department, level, userId, type, semester2Modules, semester2Score, semester1Modules, semester1Score, bothSemestersScore} = req.body
        if(!department || !level || !userId || !type || !semester2Modules || !semester2Score || !semester1Modules || !semester1Score || !bothSemestersScore) return res.status(400).json({"message": "The required fields were not sent!"})
        const result = await ResultHistory.create({department, level, userId, type, semester2Modules, semester2Score, semester1Modules, semester1Score, bothSemestersScore});
        console.log(result);
        res.status(201).json({"message": "History successfully saved!"})
    }
}

const getHistory = async (req, res) => {
    const {userId} = req?.params;
    if(!userId) return res.status(400).json({"message": "Id is required"});
    const history = await ResultHistory.find({userId}).lean().exec();
    console.log(history)
    res.status(201).json({history});
}

const deleteHistory = async (req, res) => {
    const {userId} = req?.params;
    if(!userId) return res.status(400).json({"message": "Id is required!"});
    const history = await ResultHistory.find({userId}).exec();
    if(!history) return res.status(400).json({"message": "History does not exist!"});
    const result = await ResultHistory.deleteOne(history._id).exec();
    const newHistory = await ResultHistory.find({userId}).lean().exec();
    res.status(200).json({history: newHistory})
}

module.exports = {postHistory, getHistory, deleteHistory};