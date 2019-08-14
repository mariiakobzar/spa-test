import Handlebars from 'handlebars';

Handlebars.registerHelper('img', (object) => {
  const str = `<img src="${object}" alt="${object}"/>`;
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper('eachForIndex', (context, options) => {
  let ret = '';
  let counter = 0;
  for (let i = 0, j = context.length; i < j; i += 1) {
    if (context[i].tag === 'New Arrival') {
      ret += options.fn(context[i]);
      counter += 1;
      if (counter === 4) {
        break;
      }
    }
  }
  return ret;
});
