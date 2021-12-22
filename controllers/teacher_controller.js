const Teacher = require('../models/Teacher')
const {sharpFile} = require('../fileUpload/sharp')
const path = require('path')
const fs = require('fs')

const teacher = {
    create : async (req,res)=>{
            const {name,description, job} = req.body
            const all = await Teacher.find().limit(100).sort({createdAt:-1})
            const user = req.session.admin
            if(name.length <5){
                res.render('admin/teacher/index', {
                    layout:'./admin_layout', name_err:"Ism va familya eng kamida 5ta harfdan iborat bo'lishi shart!!!",all ,user
                })
            }else if(job.length <3){
                res.render('admin/teacher/index', {
                    layout:'./admin_layout', job_err:"Vazifa eng kamida 3ta harfdan iborat bo'lishi shart!!!",all ,user
                })
            }else if(description.length <1){
                res.render('admin/teacher/index', {
                    layout:'./admin_layout', practice_err:"Description kiriting!!!",all ,user
                })
            }else{
                const file = req.file.filename
                const image = await sharpFile(file,140, 140)
                const teacher = new Teacher({name,description, job, image})
                await teacher.save()
                res.redirect('/api/teacher')
            }
    },
    all : async (req,res)=>{
        const all = await Teacher.find().limit(100).sort({createdAt:-1})
        const user = req.session.admin
        res.render('admin/teacher/index', {
            layout:'./admin_layout', all, user
        })
    },
    findByIdAndDelete : async(req,res)=>{
        const result  = await Teacher.findById(req.params.id)
        if(result.image){
            fs.unlink(path.join(path.dirname(__dirname) + result.image), (error) => {
                if (error) {
                  return
                }
            });
        }
        await Teacher.findByIdAndDelete({_id:result._id})
        res.redirect('/api/teacher')
    },
    findByIdAndUpdate : async (req,res)=>{
        const {name,description, job} = req.body  
        const all = await Teacher.find().limit(100).sort({createdAt:-1})
        const user = req.session.admin
        if(name.length <3 ){
            res.render('admin/teacher/index', {
                layout:'./admin_layout', name_err1:"Ism va familya eng kamida 5ta harfdan iborat bo'lishi shart!!!",all ,user
            })
        }else if(job.length <3){
            res.render('admin/teacher/index', {
                layout:'./admin_layout', job_err1:"Vazifa eng kamida 3ta harfdan iborat bo'lishi shart!!!",all ,user
            })
        }else if(description.length <1){
            res.render('admin/teacher/index', {
                layout:'./admin_layout', practice_err1:"Description kiriting!!!",all ,user
            })
        }else{
        const file = req.file.filename
        const image = sharpFile(file,140, 140)
        const result = await Teacher.findByIdAndUpdate({_id:req.params.id},{name,description, job})
        if(result.image){
            fs.unlink(path.join(path.dirname(__dirname) + result.image), (error) => {
                if (error) {
                  return
                }
            });
        }
        result.image = image
        await result.save()
        res.redirect('/api/teacher')
        }
    }
}

module.exports = teacher