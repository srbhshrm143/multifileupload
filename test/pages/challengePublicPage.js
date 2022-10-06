import { Selector } from 'testcafe';

export default class ProjectPublicPage {
    constructor() {
        this.title = Selector('.bigtitle').withText('CHALLENGES')
        this.projectCards = Selector('div[x-frames-target="projects"')
    }
}