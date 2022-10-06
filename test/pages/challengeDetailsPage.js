import { Selector } from 'testcafe';


export default class ProjectDetailsPage {
    constructor() {
        this.name = Selector('.bigtitle')
        this.summary = Selector('p.mt-4')
        this.commentInputBox = Selector('form > fieldset > textarea[name="post[body]"]')
        this.commentBox = Selector('section[x-frames-target="feed"] > article > p')
        this.button = {
            comments: Selector('nav ul li button').withText('COMMENTS'),
            post: Selector('button[type="submit"]').withText('Post'),
        }
    }
}
