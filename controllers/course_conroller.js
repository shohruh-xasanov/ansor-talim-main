const Course = require('../models/Course')
const Teacher = require('../models/Teacher')
const path = require('path')
const fs = require('fs')
const {sharpFile} = require('../fileUpload/sharp')

const course = {
    create : async (req,res)=>{
            const {name,title,teacher} = req.body
            const all = await Course.find().limit(100).sort({createdAt:-1})
            const user = req.session.admin
            if(name.length <3 ){
                res.render('admin/course/index', {
                    layout:'./admin_layout', all,user, name_err:"Kurs nomi eng kamida 3ta harfdan iborat bo'lishi shart!!!"
                })
            }if(title.length <5){
                res.render('admin/course/index', {
                    layout:'./admin_layout', all,user, title_err:"Kurs qisqa tavsifi eng kamida 3ta harfdan iborat bo'lishi shart!!!"
                })
            }else{
                const file = req.file.filename
                const image = await sharpFile(file, 369, 178)
                const course = new Course({name,title,teacher,image})
                await course.save()
                res.redirect('/api/course')
            }
    },
    all : async (req,res)=>{
        const teacher = await Teacher.find().sort({createdAt:-1})
        const all = await Course.find().limit(100).sort({createdAt:-1}).populate('teacher')
        const user = req.session.admin
        res.render('admin/course/index', {
            layout:'./admin_layout', all, user, teacher
        })
    },
    findByIdAndDelete : async(req,res)=>{
        const result  = await Course.findById(req.params.id)
        if(result.image){
            fs.unlink(path.join(path.dirname(__dirname) + result.image), (error) => {
                if (error) {
                  return
                }
            });
        }
        await Course.findByIdAndDelete({_id:result._id})
        res.redirect('/api/course')
    },
    findByIdAndUpdate : async (req,res)=>{
        const {name, title, teacher} = req.body  
        const all = await Course.find().limit(100).sort({createdAt:-1})
        const user = req.session.admin
        if(name.length <3 ){
            res.render('admin/course/index', {
                layout:'./admin_layout',all,user, name_err1:"Kurs nomi eng kamida 3ta harfdan iborat bo'lishi shart!!!"
            })
        }if(title.length <5){
            res.render('admin/course/index', {
                layout:'./admin_layout', all,user, title_err1:"Kurs qisqa eng kamida 3ta harfdan iborat bo'lishi shart!!!"
            })
        }else{
            const file = req.file.filename
            const image = await sharpFile(file,369, 178)
            const result = await Course.findByIdAndUpdate({_id:req.params.id},{name, title, teacher})
            if(result.image){
                fs.unlink(path.join(path.dirname(__dirname) + result.image), (error) => {
                    if (error) {
                    return
                    }
                });
            }
            result.image = image
            await result.save()
            res.redirect('/api/course')
        }
    }
}

module.exports = course