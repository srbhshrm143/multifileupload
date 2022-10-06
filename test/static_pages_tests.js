import { Selector } from 'testcafe';
import { myUrl, staticPages } from './pages/fixtures';
import { checkErrors } from './pages/helper';
import faker from 'faker';

fixture`Static Pages`
  .page(myUrl)
  .meta('concurrency', 'true')

test('About Us', async (t) => {
  await t.navigateTo('/about-us')
  await checkErrors();
});

test('Terms of Service', async (t) => {
  await t.navigateTo('/terms-of-service')
  await checkErrors();
});

test('Privacy Policy', async (t) => {
  await t.navigateTo('/privacy-policy')
  await checkErrors();
});

test('FAQ', async (t) => {
  await t.navigateTo('/faq')
  await t.click(staticPages.faq.aboutQuestions);

  await t.expect(staticPages.faq.aboutQuestionsAnswer.exists).ok();

  await checkErrors();
});

test('render 404 for not existing page', async (t) => {
  await t.navigateTo('/' + faker.lorem.word())
  await t.expect(staticPages.notFound.headerPresent.exists).ok();

  // Cant use checkErrors because it checks for 404 :)
  const $ = {
    noTranslationMissing: Selector('body').withText('translation missing'),
    noLiquidError: Selector('body').withText('Liquid Error'),
    noFormError: Selector('body').withText('RenderFormTag Error:'),
    noQueryError: Selector('body').withText('QueryGraphTag Error:'),
    noExecuteQueryError: Selector('body').withText('ExecuteQueryTagError:'),
  }

  await t.expect($.noTranslationMissing.exists).notOk();
  await t.expect($.noLiquidError.exists).notOk();
  await t.expect($.noFormError.exists).notOk();
  await t.expect($.noQueryError.exists).notOk();
  await t.expect($.noExecuteQueryError.exists).notOk();
});
