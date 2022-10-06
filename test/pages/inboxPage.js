import { Selector } from 'testcafe';

class InboxPage {
  constructor() {
    this.message = Selector('div ul li div p')
    this.chatRoom = Selector('div[data-tc="chat-room"]')
    this.emptyInboxInformation = Selector('p').withText('You have not started any conversation yet')
    this.emptyInboxSuggestion = Selector('p')
    .withText('To start one, find a person profile and use the ‘Send message’ button')
    this.buttons = {
      addGroup: Selector('main').find('a').withText('Add group'),
      submitForm: Selector('button').withText('Submit'),
      create: Selector('button').withText('Create group'),
      update: Selector('button').withText('Update group'),
      editGroup: Selector('td').find('a').withText('Edit')
    }
    this.failedConnectionPopUp = Selector('div').withText('We cannot connect to the server')
    this.inputs = {
      message: Selector('input#chat-messageInput')
    }
  }
}

export default new InboxPage()
