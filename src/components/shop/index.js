import Handlebars from 'handlebars';
import './helpers/test';
import Data from '../../assets/fixtures/products.json';
import RootTemplate from './template.hbs';
import './styles.scss';

const Root = () => {
  const template = Handlebars.compile(RootTemplate);
  return template(Data);
};

export default Root;
