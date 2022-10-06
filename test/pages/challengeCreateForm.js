import { Selector } from 'testcafe';

export default class ProjectCreateForm {
    constructor() {
        this.inputs = {
            name: Selector('#name'),
            summary: Selector('#summary'), //also known as short description.
            award: Selector('#award'),
            tags: Selector('tags'),
            description: Selector('fieldset[data-tc="project-description"]'),
            terms: Selector('fieldset[data-tc="project-terms"]'),
            applicationDescription: Selector('fieldset[data-tc="project-application-description"]'),
            developmentPartners: Selector('[data-tc="project-development-partners"]'),
            sentBy: Selector('[data-tc="project-sent-by-input"]')
        }
        this.buttons = {
            create: Selector('button').withText('Create Challenge'),
            save: Selector('button').withText('Save as Draft'),
            update: Selector('button').withText('Update'),
        }
        this.checkboxes = {
            featuredChallenge: Selector('data-tc=["project-featured-checkbox"]'),
            commentableChallenge: Selector('data-tc=["project-commentable-checkbox"]')
        }
        this.steps = {
            name: Selector('input[data-tc="project-step-input"]'),
            add: Selector('button[data-tc="project-add-step"]'),
            from: Selector('input[data-tc="project-step-from"]'),
            to: Selector('input[data-tc="project-step-to"]')
        }
    }
}
