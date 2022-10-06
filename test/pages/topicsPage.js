import { Selector } from 'testcafe';

export default class TopicsPage {
  constructor() {
    this.buttons = {
      addQuestion: Selector('a').withText('Add Question'),
      postQuestion: Selector('button').withText('Add'),
      postAnswer: Selector('button').withText("Post answer"),
      editQuestion: Selector('a').withAttribute("title", "Edit"),
      deleteQuestion: Selector('button').withAttribute("title", 'Delete'),
      submitEdit:Selector('button').withText("Edit"),
      reply: Selector('button').withText('Reply')
    }
    this.inputs = {
      questionTitle: Selector('#title'),
      questionBody: Selector('label[for="body"]'),
      //questionBody: Selector('div').find('textarea'),
      answerBody: Selector('label[for="body"]'),
      questionTags: Selector('tags'),
      contentTypeQuestion: Selector('label').withText('Question'),
      contentTypePost: Selector('label').withText('Post')
    }
    this.vote = {
      pointUpQuestion: Selector('button[data-tc="voteup"]'),
      pointUpAnswer: Selector('button[data-tc="voteup"]').nth(1),
    }
    this.fields = {
      questionBody: Selector('div').find('p'),
      answerBody: Selector('div').find('p'),
    }
    this.ratings = {
      question: Selector('span[data-tc="votes-count"]').withText('1').nth(0),
      firstAnswer: Selector('span[data-tc="votes-count"]').withText('1').nth(1)
    }
  }
}
