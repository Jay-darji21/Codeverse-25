import {Project} from "../Models/project.model.js";
import {Bid} from "../Models/bids.model.js";


// Add a bid into project
export const addBid = async (req, res) => {
  try {
    const { proposal, timeDuration, amount } = req.body;

    if (!proposal || !timeDuration || !amount) {
      return res.status(400).json({
        message: "Add required data",
        success: false,
      });
    }

    // Check user
    const userId = req.userId; // From middlewares
    if (!userId) {
      return res.status(400).json({
        message: "Login before bid",
        success: false,
      });
    }

    // Get project_id from request params
    const project_id = req.params.project_id;

    // Check if project exists
    const checkProject = await Project.findOne({ _id: project_id });

    if (!checkProject) {
      return res.status(404).json({
        message: "Invalid project id",
        success: false,
      });
    }

    // Create new bid
    const newBid = new Bid({
      proposal,
      timeDuration,
      amount,
      userId,
      projectId: project_id,
    });

    // Save the bid
    const savedBid = await newBid.save();

    // Add bid to the project
    checkProject.bids.push(savedBid._id);
    await checkProject.save();

    res.status(201).json({
      message: "Bid added successfully",
      success: true,
      bid: savedBid,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Delete a bid from project
export const deleteBid = async (req, res) => {
  try {
    // Get user ID from middleware
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({
        message: "Login required",
        success: false,
      });
    }

    // Get bid ID from request params
    const bidId = req.params.bid_id;

    // Check if bid exists and belongs to the user
    const bid = await Bid.findOne({ _id: bidId, userId });

    if (!bid) {
      return res.status(404).json({
        message: "Bid not found or unauthorized",
        success: false,
      });
    }

    // Remove bid reference from project
    await Project.updateOne(
      { _id: bid.projectId },
      { $pull: { bids: bid._id } }
    );

    // Delete the bid
    await Bid.findByIdAndDelete(bidId);

    res.status(200).json({
      message: "Bid deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
