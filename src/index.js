import 'regenerator-runtime/runtime';
import Home from './views/Home/Home';
import About from './views/About/About';
import Contact from './views/Contact/Contact';
import Game from './views/Game/Game';
import './styles/main.css';

const App = () => {
  const getParams = (match) => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
      (result) => result[1]
    );

    return Object.fromEntries(
      keys.map((key, i) => {
        return [key, values[i]];
      })
    );
  };
  const element = document.createElement('div');

  const route = async (event = false) => {
    const pathToRegex = (path) =>
      new RegExp(
        '^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$'
      );
    const routes = [
      { path: '/', view: Home },
      { path: '/contact', view: Contact },
      { path: '/about', view: About },
      { path: '/game', view: Game },
    ];

    const potentialMatches = routes.map((route) => {
      return {
        route: route,
        result: location.pathname.match(pathToRegex(route.path)),
      };
    });

    let match = potentialMatches.find(
      (potentialMatch) => potentialMatch.result !== null
    );
    if (!match) {
      match = {
        route: routes[0],
        result: [location.pathname],
      };
    }

    const view = new match.route.view(getParams(match));
    element.innerHTML = await view.getHtml();

    if (event) {
      element.innerHTML = await view.startGame();
      await view.activity();
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.matches('[data_link]')) {
        history.pushState(null, null, e.target.href);
        route();
      } else if (e.target.matches('[start_game]')) {
        console.log('ddd');
        route(true);
      }
    });
  });

  return element;
};

document.body.appendChild(App()); // <div>HELLO WORLD HI</div>
