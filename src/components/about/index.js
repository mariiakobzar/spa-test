import Handlebars from 'handlebars';
import RootTemplate from './template.hbs';
import './styles.scss';

const Root = () => {
  const template = Handlebars.compile(RootTemplate);
  return template();
};

export default Root;
