import { Project } from "../Models/project.model.js";

// Post project
export const postProject = async (req,res) => {
    try {
        
   
    const { projectName, projectRole, projectUrl, githubUrl, projectPicture, projectVideo, projectDesc } = req.body;

    // Check the missing data
    if(!projectName, !projectRole, !projectUrl, !githubUrl){
        return res.status(400).json({
            message : "Something is missing",
            success : false
        })
    }

    const userId = req.userId; // middlewhere authentication
    console.log(userId)

    if(userId == null){
        return res.status(401).json({
            message : "Please login befoe the post",
            success : false
        })
    }

    const newProject = await Project.create({
        projectName,
        projectRole,
        projectUrl,
        githubUrl,
        projectPicture,
        projectVideo,
        user : userId,
        projectDesc
    });


    return res.status(200).json({
        message : "Project posted successfully",
        newProject,
        success : true
    })

} catch (error) {
        console.log(error)
}
}

// Fetch all projects

export const fetchAllProjects = async (req, res) => {
    try {
        const userId = req.userId; // Get user ID from middleware authentication
        
        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        // Find all projects by this user
        const projects = await Project.find({ user: userId });

        return res.status(200).json({
            message: "Projects fetched successfully",
            projects,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
}

// Update project
export const updateProject = async (req, res) => {
    try {
        const { projectId, projectName, projectRole, projectUrl, githubUrl, projectPicture, projectVideo, projectDesc } = req.body;
        const userId = req.userId; // Get user ID from middleware authentication
        
        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        // Check if the project exists and belongs to the authenticated user
        let project = await Project.findOne({ _id: projectId, user: userId });
        if (!project) {
            return res.status(404).json({
                message: "Project not found or you do not have permission to update this project",
                success: false
            });
        }

        // Update the project details
        if (projectName) project.projectName = projectName;
        if (projectRole) project.projectRole = projectRole;
        if (projectUrl) project.projectUrl = projectUrl;
        if (githubUrl) project.githubUrl = githubUrl;
        if (projectPicture) project.projectPicture = projectPicture;
        if (projectVideo) project.projectVideo = projectVideo;
        if (projectDesc) project.projectDesc = projectDesc;

        await project.save();

        return res.status(200).json({
            message: "Project updated successfully",
            project,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
}
