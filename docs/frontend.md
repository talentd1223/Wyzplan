## Background

At time of writing this app is currently in prototype phase consisting of mostly frontend work with a data persistence layer. The current UI is all client side rendered, using React and Typescript. The data persistence layer is using a global state management wrapper, Recoil.

The frontend can be found under: `app/frontend`

### **SCSS**

UI Development attempts to follow Mobelux's SCSS standards for development using [BEM](http://getbem.com/introduction/) naming conventions, avoiding specificity selection whenever possible and using an [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) approach to building components.

Styles can be found under: `app/frontend/src/assets/styles`

### Material UI

For the prototype phase we chose to use Material UI for speed, and consistency. It is still undecided whether this is be maintained once we come out of Prototype phase.

You can find material UI styles under: `app/frontend/src/styles`

### Dependencies

- [Recoil](https://recoiljs.org/) - State management
- [React Router](https://reactrouter.com/) - Client Side Routing
- [MaterialUI](https://material-ui.com/) - UI Kit
- [Formik](https://jaredpalmer.com/formik/) - Form management
- [Yup](https://www.npmjs.com/package/yup) - Form Validation Management

## State Management

Given how heavily the UI relies on state management, we quickly adopted a way to manage state contextually using a React library called [Recoil](https://recoiljs.org/). Recoil allows us to implement persistence, routing, time-travel debugging, or undo by observing all state changes across your app, without impairing code-splitting.

Currently as it stands, we use the bare bones of Recoil. The idea is that as the application scales it will allow for flexibility along the way. This doc will be a basic high level overview of how we are using recoil. I would recommend checking out their docs to get a further understanding.

## Recoil Root

The following is something most React based components will look like at the parent Root View. Components that use recoil state need `RecoilRoot` to appear somewhere in the parent tree. A good place to put this is in the root view component. This will essentially wrap a context tree around the components making it much easier to manage state across the component tree.

```jsx
import React, { useState, useEffect, Suspense } from 'react';
import { RecoilRoot } from 'recoil';

function View() {
  const [isLoaded, setLoaded] = useState(false);

  const InitializeState = () => {
    ... initalize states from props
  };

  return (
    <RecoilRoot>
      { isLoaded ? (
        <>
          ... module components go here
        </>
      ) : <InitializeState /> }
    </RecoilRoot>
  );
}

export default View;
```

## Atoms

An atom represents a piece of state. Atoms can be read from and written to from any component. Components that read the value of an atom are implicitly subscribed to that atom, so any atom updates will result in a re-render of all components subscribed to that atom.

Each module directory will have an `Atoms.jsx` file with state definitions like the following example:

```jsx
import { atom } from 'recoil';

const authTokenState = atom({
  key: 'authTokenState', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export {
  authTokenState,
};
```

## Selector

A selector represents a piece of derived state. Derived state is a transformation of state. You can think of derived state as the output of passing state to a pure function that modifies the given state in some way.

For our specific use-case we use selectors mainly as a type of state "listener", and run Ajax calls based on state changes. Like the following example:

```jsx
import { selector } from "recoil";
import { fetchData } from "../utils";

const fetchedData = selector({
  key: 'fetchedData',
  get: async ({get}) => {
    const authorized = get(authTokenState);

		// listen on state changes
    const pagination = get(tablePaginationState); // pagination changes
    const query = get(searchQueryState); // search term changes
    const sorts = get(tableSortState); // table sort changes
    const trigger = get(dataTriggerState); // manual trigger state

    const queryString = '';

		// set up query parameters
		...

		// if authorized run new AJAX request
    if (authorized) {
      const res = fetchData(`/endpoint.json?${queryString}`);
      return res;
    } else {
      return undefined;
    }
  },
});
```

We can use the `useRecoilValue()` hook to read the response from `fetchedData`:

```jsx
function ComponentData() {
  const data = useRecoilValue(fetchedData);
  return <div>{data}</div>;
}
```

NOTE: Working with async selectors will require you to wrap a component like this into something like `React.Suspense` Suspense will catch promise states and act on them accordingly. An example is as followed:

```jsx
function ParentComponent() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <ComponentData />
      </React.Suspense>
    </RecoilRoot>
  );
}
```

It is not necessary to use React Suspense for handling pending asynchronous selectors. You can also use the `useRecoilValueLoadable()` hook to determine the status during rendering:

```jsx
function ComponentData() {
  const loadedData = useRecoilValueLoadable(fetchedData);
  switch (loadedData.state) {
    case 'hasValue':
      return <div>{loadedData.contents}</div>;
    case 'loading':
      return <div>Loading...</div>;
    case 'hasError':
      throw loadedData.contents;
  }
}
```
