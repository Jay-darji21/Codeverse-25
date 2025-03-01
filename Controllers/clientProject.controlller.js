import {clientProject} from "../Models/clientProject.model.js";
import {User} from "../Models/user.model.js";

// Create a new project
export const createProject = async (req, res) => {
    try {
        const { clientProjectName, clientProjectDes, clientSkill, clientTime, clientAmount } = req.body;
        const userId = req.userId;  // Assuming authentication middleware adds this

        // Validate input fields
        if (!clientProjectName || !clientProjectDes || !clientSkill || !clientTime || !clientAmount) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Ensure `clientSkill` is an array
        if (!Array.isArray(clientSkill)) {
            return res.status(400).json({
                message: "clientSkill should be an array",
                success: false
            });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Create new project
        const newProject = new clientProject({
            clientProjectName,
            clientProjectDes,
            clientSkill,  // Already an array
            clientTime,
            clientAmount,
            users: [userId],  // Adding user to the project
            companyName: []   // Empty initially
        });

        const savedProject = await newProject.save();

        res.status(201).json({
            message: "Project created successfully",
            success: true,
            project: savedProject
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Fetch all projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await clientProject.find().populate("users", "name email");

        res.status(200).json({
            message: "All projects fetched",
            success: true,
            projects
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Fetch projects of a specific user
export const getUserProjects = async (req, res) => {
    try {
        const userId = req.userId;  // Assuming authentication middleware adds this

        const userProjects = await clientProject.find({ users: userId }).populate("users", "name email");

        res.status(200).json({
            message: "User projects fetched",
            success: true,
            projects: userProjects
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
