const Work = require('../models/Work');
const hash = require('../services/hasher')();
const upload = require('../services/awsSdk')();
const watermark = require('../services/watermark')();
const web3 = require("../services/web3Client")();


module.exports = () => {
    var methods = {};

    methods.create = (req, res) => {
        const uuid = hash.hashImage(req.file.originalname);
        const data = {
            urlLink: req.file.location,
            type: req.file.mimetype.split('/')[1],
            uuid,
        };
        methods.findUuid(uuid).then((workFound) => {
            if (!workFound) {
                Work.create(data)
                    .then(() => {
                        res.status(200).send({uuid, success: true})
                    })
                    .catch((err) => {
                        res.status(400).send(err);
                    });
            } else {
                res.status(400).send('Name already Exist');
            }
        });
    };

    methods.findUuid = (uuid) => {
        return Work.findOne({
            where: {
              uuid: uuid,
            },
        });
    };

    methods.get = (req, res) => {
      const jobAddress = req.params.jobAddress;
      const taskId = req.params.task;
      const companyAddress = req.user.companyAddress;
      web3.getJobContract(jobAddress).then((jobInstance)=>{
        jobInstance.jobOwner().then((ownerAddress)=>{
          if(ownerAddress ===  companyAddress){
            jobInstance.isJobTask(taskId).then((isTask)=>{
              if (isTask){
                web3.isTaskComplete(taskId).then((isCompleted)=>{
                  if (isCompleted){
                    web3.getTaskContract(taskId).then((taskInstance)=>{
                      taskInstance.tasks(taskId).then((task)=>{
                        if(task){
                          const hash = task.evidence;
                          methods.findUuid(hash).then((work) => {
                            if (work) {
                                const key = hash+"."+work.dataValues.type;
                                upload.getImage(key).then((data)=>{
                                  res.writeHead(200, {'Content-Type': 'image/png'});
                                  res.end(Buffer.from(data, 'base64'));
                                });
                            } else {
                                res.status(400).send('File not found');
                            }
                          });
                        }else{
                          res.status(400).send({reason:`Task ${taskId} not found`});
                        }
                      })
                    })
                  }else{
                    res.status(400).send({reason:`Task ${taskId} not completed`});
                  }
                })
              }else{
                res.status(400).send({reason:`Task ${taskId} not found`});
              }
            })
          }else{
            res.status(403).send({reason:"You are not the job owner"});
          }
        })
      }).catch((err)=>{
        res.status(400).send(err);
      });
    };

    methods.getWatermark = (req, res) => {
        const hash = req.params.hash;
        methods.findUuid(hash).then((work) => {
            if (work) {
                const key = hash+"."+work.dataValues.type;
                upload.getImage(key).then((data)=>{
                    let buffer = Buffer.from(data, 'base64')
                    watermark.addWatermark(buffer, hash).then((newBuffer)=>{
                        res.writeHead(200, {'Content-Type': 'image/png'});
                        res.end(Buffer.from(newBuffer, 'base64'));
                    })
                });
            } else {
                res.status(400).send('File not found');
            }
        });
    };

    return methods
}