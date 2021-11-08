const Feedback = require('../models/feedback-model');
const Message = require('../models/message-model');

exports.submitFeedback = async (req, res, next) => {
    let fb = req.body;

    let findDocQuery = await Feedback.findOne({userToken: fb.token});

    if (findDocQuery) {
        return res.json({
            success: false,
            message: `You've already submitted feedback!`
        });
    }

    switch(fb.feedbackContent) {
        case `No. You're not that guy, pal.`:
        case `It's whatever.`:
        case `It's pretty cool.`:
        case `It's awesome!`:

            let feedback = new Feedback({
                feedbackIndex: fb.feedbackIndex,
                feedbackContent: fb.feedbackContent,
                userToken: fb.token
            });
            try {
                await feedback.save();

                let totalFbDocs = await Feedback.countDocuments();
                let fbDocsQuery = await Feedback.countDocuments({feedbackIndex: fb.feedbackIndex});
    
                let feedbackMajority = (fbDocsQuery / totalFbDocs) * 100;

                return res.status(200).json({
                    success: true,
                    feedbackMajority: Math.floor(feedbackMajority)
                });
            } catch (err) {
                return res.status(500).json({
                    error: err
                });
            }
        default:
            return res.status(401).json({
                success: false,
                message: 'You have supplied invalid input.'
            });
        };
};

exports.submitMessage = async (req, res, next) => {
    let msg = req.body;

    let findDocQuery = await Message.findOne({userToken: msg.token});

    if (findDocQuery) {
        return res.json({
            success: false,
            message: `You've already sent a message!`
        });
    }
    
    let message = new Message({
        name: msg.name,
        email: msg.email,
        message: msg.message,
        userToken: msg.token
    });

    try {
       let savedMessage = await message.save();
        return res.status(200).json({
            success: true,
            message: `Thanks for the feedback ${savedMessage.name}!`
        });

    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}