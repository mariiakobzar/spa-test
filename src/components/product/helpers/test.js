import Handlebars from 'handlebars';

Handlebars.registerHelper('img', (object) => {
  const str = `<img src="${object}" alt="${object}"/>`;
  return new Handlebars.SafeString(str);
});
