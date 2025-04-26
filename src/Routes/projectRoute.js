const express = require("express");
const Project = require("../Models/Project");
const router = express.Router();


// -------------------------< Save Project to DB >------------------------- //

router.post("/projects", async (req, res) => {
  const { title, description, link } = req.body;

  if (!title || !description || !link) {
    return res.status(400).json({ message: "Missing fields" });
  }
  if (title && description){
    const newProject = new Project({
        projectTitle: title,
        projectDescription: description,
        projectGithubLink: link,
      });
      try {
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
      } catch (error) {
        res.status(500).json({ message: "Server error", error });
      } 
  }  

});

// -------------------------< Save Project to DB >------------------------- //

router.put("/projects/views/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $inc: { projectViews: 1 } },
      { new: true }
    );
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error updating views", error });
  }
});


// -------------------------< Get All Projects >------------------------- //

router.get("/projects",async(req,res)=>{
  try{
    const projects = await Project.find().sort({ createdAt: -1 });
    if(projects.length === 0){
      return res.status(404).json("No projects found")
    }else if(projects.length > 0){
      return res.status(200).json(projects);
    }
  }catch(error){
    res.status(500).json("Server Error")
  }
})

// -------------------------< Get All Projects >------------------------- //

module.exports = router;
