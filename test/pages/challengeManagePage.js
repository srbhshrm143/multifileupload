import { Selector } from 'testcafe';

export default class ProjectManagePage {
    constructor() {
        this.title = Selector('.pagetitle').withText('Manage Challenges')
        this.buttons = {
            createNewChallenge: Selector('a.button').withText('New Challenge'),
            editChallenge: Selector('a.button').withAttribute('title', 'Edit'),
            deleteChallenge: Selector('a.button').withAttribute('title', 'Delete')
        }
        this.projectsList = Selector('.table > .table-content')
    }
}
