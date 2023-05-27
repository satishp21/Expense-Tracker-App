const User = require('../models/users');
const FilesDownloaded = require('../models/filesdownloaded');
const e = require('express');

const getUserLeaderBoard = async (req, res) => {
    try{
        const leaderboardofusers = await User.find({}).sort({totalexpense: -1})
        console.log(leaderboardofusers,'await User.find({}).sort({totalexpense: -1})') //-1 for decending 1 for assending
        res.status(200).json(leaderboardofusers)

} catch (err){
    console.log(err)
    res.status(500).json(err)
}
}

const getUrldownloadfiles = async (req, res) => {
    try{
        const urls = await FilesDownloaded.find({userId : req.user.id})
        res.status(200).json(urls)

} catch (err){
    console.log(err)
    res.status(500).json(err)
}
}
module.exports = {
    getUserLeaderBoard,
    getUrldownloadfiles
}
