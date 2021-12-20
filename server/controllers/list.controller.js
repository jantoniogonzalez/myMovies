const List = require("../models/list.model");
const jwt = require("jsonwebtoken");

module.exports = {
    findAllLists: (req,res)=>{
        List.find({})
            .then((allLists)=>{
                console.log(allLists);
                res.json(allPosts.reverse());
            })
            .catch((err)=>{
                res.json({message: "something went wrong with findAllLists"})
            })
    },
    findOneList: (req, res)=>{
        List.findOne({_id:req.params.id})
            .populate("createdBy", "username")
            .then((deletedList)=>{
                console.log(deletedList);
                res.json(deletedList);
            })
            .catch((err)=>{
                res.json({message: "something went wrong with finddeletedList"})
            })
    },
    findAllListsByUser: (req, res)=>{
        List.find({postedBy: req.params.userId})
            .then((allUserLists)=>{
                console.log(allUserLists)
                res.json(allUserLists)
            })
            .catch((err)=>{
                res.json({message: "something went wrong with findAllListByUser"})
            })
    },
    createNewList: (req, res) =>{
        const newListObj = new List(req.body);
        const decodedJWT = jwt.decode(req.cookies.usertoken, {
            complete: true
        })

        newListObj.createdBy = decodedJWT.payload.id;

        newListObj.save()
            .then((newList)=>{
                console.log(newList);
                res.json(newList);
            })
            .catch((err)=>res.status(400).json(err))
    },
    deleteList: (req, res)=>{
        List.findOneAndDelete({_id:req.params.id})
            .then((deletedList)=>{
                console.log(deletedList);
                res.json(deletedList);
            })
            .catch((err)=>{
                res.json({message: "something went wrong with deleteList"})
            })
    } 
}