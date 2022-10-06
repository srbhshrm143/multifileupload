import { Selector } from 'testcafe';

export default class Challenge {
  constructor() {
    this.buttons = {
      createChallenge: Selector('button').withText('Create Challenge'),
    }
    this.inputs = {
      challengeName: Selector('input[name="project[name]"]'),
      shortDescription: Selector('textarea[name="project[summary]"]'),
      award: Selector('input[name="project[award]"]'),
      tags: Selector('tags'),
      description: Selector('label').withText('Add description'),
      termsAndConditions: Selector('label').withText('Terms and conditions'),
    }
    this.checkboxes = {
      isThisFeaturedChallenge: ('input[name="project[promoted]"]'),
    }
    this.statuses = {
      open: ('#status_open'),
      underEvaluation: ('#status_under_evaluation'),
      closed: ('#status_closed')
    }
  }
}





