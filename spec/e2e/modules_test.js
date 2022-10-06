Feature('Modules tests');

Scenario.only('Notification can be closed by clicking X', async ({ I }) => {
  I.amOnPage('/');

  I.executeScript(() => {
    new api.flash('success', 'Testing the success notification', { autohide: 5000 });
  });

  I.waitForVisible('#flashes [data-flash]');

  I.click('button[data-flash-close]');

  I.wait(1);

  I.dontSeeElement('#flashes [data-flash]');
});

Scenario('Success notification hides itself', async ({ I }) => {
  I.executeScript(() => {
    new api.flash('error', 'Autohide test', { autohide: 1000 });
  });

  I.see('Autohide test', '#flashes');
  I.wait(1);
  I.dontSee('Autohide test', '#flashes');
});

Scenario('Error notification can be hidden by API call', async ({ I }) => {
  I.executeScript(function() {
    const error = new api.flash('error', 'Testing the error notification API');
    error.hide();
  });

  I.dontSee('Testing the error notification API', '#flashes');
});
