export const APIURI = () => {
  RunningOnAzure = true;
  return RunningOnAzure ? 'http://40.76.122.109:80' : 'http:localhost:80';
};
