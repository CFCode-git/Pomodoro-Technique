import {createBrowserHistory} from 'history';

// "homepage": "https://CFCode-git.github.io/Pomodoro-Technique",
// const ENV = process.env.NODE_ENV;
// let publicUrl: string = '';
// if (ENV === 'development') {
//   publicUrl = '/';
// } else if (ENV === 'production') {
//   publicUrl = '/Pomodoro-Technique';
// }
const history = createBrowserHistory(
  // { basename: publicUrl }
);

export default history;