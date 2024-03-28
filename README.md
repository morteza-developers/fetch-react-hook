# fetch-react-hook

A simple, _safe_ fetch custom hook for React. Why safe? There's a good chance you've seen this before:

```
Warning: Can’t perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```

This hook helps you avoid mutating state on components that are `unmounted` by providing you with the `mounted` state of the hook, and aborts in-flight requests on `unmount`.

## Install

```bash
npm install fetch-react-hook
# or, if using yarn
yarn add fetch-react-hook
```

## Usage

This example demonstrates how you might get some todos with `useFetch` while being sure you don't mutate state after your component is `unmounted`.

```jsx
import React, { useEffect, useState } from "react";
import useFetch , {FetchProvider} from "fetch-react-hook";

function TodoList() {
  const {
    reFetch,
    isPending,
    data: todos,
    status,
    setData,
  } = useFetch(() =>  fetch("https://jsonplaceholder.typicode.com/todos/").then((res) =>
        res.json()
      ), {
    autoFetch: false,
    onSuccess: (response) => {},
    onFinish: () => {},
    catchKey: "catch",
    onDataSetter: (response) => response,
  });

  return (
    <FetchProvider>
      {todos.map((todo) => {
        return <span key={todo.id}>{todo.title}</span>;
      })}
    </FetchProvider>
  );
}
```
