import { useEffect } from 'react';

function Title({ count }) {
  console.log('render');

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return <h1>{count}</h1>;
}

export default Title;