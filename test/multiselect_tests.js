import { Selector } from 'testcafe';
import { myUrl } from './pages/fixtures';

// selector for the button that toggles the popup (string)
let toggleButtonSelector = 'button[aria-controls]';



fixture `Testing multiselect`
  .page(myUrl + '/style-guide')
  .meta('concurrency', 'true')


test('Popup toggles', async t => {

  let multiselect = Selector('[data-tc="multiselect-multiline"]');

  await t
    .expect(multiselect.withText('Select').exists).ok()
    .click(multiselect.find(toggleButtonSelector))
    .expect(multiselect.find('li').withText('Label for value 0').visible).ok()
    .click(multiselect.find(toggleButtonSelector))
    .expect(multiselect.find('li').withText('Label for value 0').visible).notOk();

});


test('Selected options appear and user can remove them', async t => {

  let multiselect = Selector('[data-tc="multiselect-multiline"]');

  await t
    .click(multiselect.find(toggleButtonSelector))
    .click(multiselect.find('label').withText('Label for value 1'))
    .click(multiselect.find('label').withText('Label for value 4'))
    .expect(multiselect.find('[aria-haspopup="listbox"] span').withText('Label for value 1').exists).ok()
    .expect(multiselect.find('[aria-haspopup="listbox"] span').withText('Label for value 4').exists).ok();

  await t
    .click(multiselect.find('[aria-haspopup="listbox"]').withText('Label for value 1').find('label'))
    .click(multiselect.find('label').withText('Label for value 4'))
    .expect(multiselect.find('[aria-haspopup="listbox"] span').withText('Select').visible).ok();

});


test('Filtering the list works', async t => {

  let multiselect = Selector('[data-tc="multiselect-combine"]');
  let filter = multiselect.find('[x-ref="filter"]');

  await t
    .click(multiselect.find(toggleButtonSelector))
    .expect(multiselect.find('li').withText('Label for value 5').visible).ok()
    .typeText(filter, 'Label for value 6')
    .expect(multiselect.find('li').withText('Label for value 5').visible).notOk();

});
