const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    projectTitle : {
        type: String,
        required: true
    },
    projectDescription:{
        type:String,
        required: true
    },
    projectGithubLink:{
        type:String,
        required:true
    },
    projectDate:{
        type: Date,
        default: Date.now
    },
    projectViews: {
        type: Number,
        default: 0
      }

},  { timestamps: true })

const Project = mongoose.model("Project",projectSchema)
module.exports = Project