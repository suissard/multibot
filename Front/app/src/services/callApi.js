import Api from '../api/class/Api';
import Route from '../api/class/Route';

const route = new Route();
const api = new Api(route);

export function callApi(routeName, ...args) {
  return api.call(routeName, ...args);
}
