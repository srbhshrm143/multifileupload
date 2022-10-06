import { Selector } from 'testcafe';

export default class StaticPages {
  constructor() {
    this.faq = {
      aboutQuestions: Selector('p').withText('How to post questions?'),
      aboutQuestionsAnswer: Selector('div').withText('Anyone can see the questions and answers posted')
    };

    this.notFound = {
      headerPresent: Selector('h3').withText('Page not found.')
    }
  }
}
