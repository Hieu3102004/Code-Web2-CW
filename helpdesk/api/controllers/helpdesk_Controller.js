const mongoose = require('mongoose');
const Helpdesk = mongoose.model('Helpdesk');

exports.list_all_responses = (req, res) => {
    Helpdesk.find({}, (err, responses) => {
        if (err) return res.send(err);
        res.json(responses);
    });
};

exports.create_a_response = (req, res) => {
    const newResponse = new Helpdesk(req.body);
    newResponse.save((err, response) => {
        if (err) return res.send(err);
        res.json(response);
    });
};

exports.read_a_response = (req, res) => {
    Helpdesk.findById(req.params.responseId, (err, response) => {
        if (err) return res.send(err);
        res.json(response);
    });
};

exports.update_a_response = (req, res) => {
    Helpdesk.findOneAndUpdate(
        {_id: req.params.responseId},
         req.body,
          {new: true},
           (err, response) => {
        if (err) return res.send(err);
        res.json(response);
    }
    );
};

exports.delete_a_response = (req, res) => {
    Helpdesk.deleteOne(
        {_id: req.params.responseId},
         (err, response) => {
        if (err) return res.send(err);
        res.json({message: 'Helpdesk response successfully deleted',_id: req.params.responseId});
    }
    );
};
