const helpdeskControllers = require('../controllers/helpdesk_Controller');
module.exports = app => {
    app
    .route('/responses')
    .get(helpdeskControllers.list_all_responses)
    .post(helpdeskControllers.create_a_response);
app
    .route('/responses/:responseId')
    .get(helpdeskControllers.read_a_response)
    .put(helpdeskControllers.update_a_response)
    .delete(helpdeskControllers.delete_a_response);
}
