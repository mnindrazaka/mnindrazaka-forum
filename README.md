# Forum Website

This is the example of forum website using [next.js](https://nextjs.org/), [typescript](https://www.typescriptlang.org/), [tamagui](https://tamagui.dev/), and [storybook](https://storybook.js.org/).

**Key Features:**

**Show Post:** Browse through an extensive collection of posts shared by users. From thought-provoking discussions to informative articles, there's something for everyone.

**Create Post:** Share your own ideas, experiences, or questions by creating a new post. Craft your content using a rich text editor and add relevant tags to make it easily discoverable.

**Vote Post:** Express your opinion on posts by upvoting or downvoting them. This helps highlight the most valuable and interesting content, ensuring that the best posts rise to the top.

**Create Comment:** Engage in conversations by leaving comments on posts. Share your insights, provide feedback, or ask follow-up questions to contribute to the ongoing discussions.

**Vote Comment:** Show appreciation for insightful comments by upvoting them. This encourages meaningful interactions and helps to identify the most helpful and well-received comments.

**Nested Comment:** Enjoy threaded conversations with nested comments. Reply directly to specific comments to maintain clear and organized discussions.

## 1. Demo

I have provided a live demo of the forum website where you can explore its features and functionality. Additionally, I have also prepared a Storybook instance to showcase the individual UI components in isolation.

### 1.1. Website

https://karirlab-forum.vercel.app

### 1.2. Storybook

https://karirlab-forum-storybook.vercel.app/

## 2. Development

The Development section provides instructions on how to set up a local development environment for the project. It covers the steps to run the Next.js server and Storybook

### 2.1. Next.js Development Server

Here are some command to run, build, and serve the next.js project

```bash
# run development server
npm run dev

# build project
npm run build

# run output project
npm run start
```

### 2.2. Storybook

Here are some command to run, test, build, and serve the storybook

```bash
# run storybook server
npm run storybook

# run testing using storybook (you need to run storybook server)
npm run test-storybook

# show test coverage using storybook (you need to run storybook server)
npm run coverage-storybook

# build storybook
npm run build-storybook

# run output project
npm run start-storybook
```

## 3. Project Architecture

The Project Architecture section provides an overview of the architectural design of the project, explaining the key layers and components involved. This section aims to familiarize developers with the project's structure and highlight the relationships between different parts of the application.

![project architecture](https://i.ibb.co/y6zx0nt/Forum-Project-Architecture.jpg)

Here is the explanation from the most left layer to the most right layer :

### 3.1. Routes

The Routes plays a crucial role in handling the URL routing and mapping it to the appropriate screens to be displayed. This layer is responsible for parsing any query parameters and route parameters and forwarding them to the screens as props, enabling dynamic content rendering based on the URL.

### 3.2. Screens

The Screens consists of React components that provide the user interface (UI) for individual pages or screens. The Screens are designed as dummy components, meaning they do not have their own state management and do not handle data fetching directly. Instead, their main purpose is to combine and orchestrate various smart components (Widgets), working together to create a cohesive and interactive user experience.

### 3.3. Widgets

Widgets are smart components that provide interactivity and functionality to the user interface. These components have their own state. Widgets combine the business logic from the Reducer layer with the UI elements from the Components layer, resulting in smart components that drive the interactive features of the application.

### 3.4. Components

The Components layer consists of dummy components that focus on providing the user interface (UI) for the widgets. These components do not have their own state management and rely on receiving data from the props provided by the widgets.

### 3.5. Reducers

The Reducers layer is responsible for providing the business logic and managing the state used by the widgets. Unlike the components layer, the reducer layer does not handle UI rendering; instead, it focuses on state management and implementing the necessary functionality.

The reducer layer adopts a finite state machine approach to enhance state predictability, particularly when dealing with widgets that involve multiple interactive features. This methodology helps to organize and manage the state transitions and behaviors of complex widgets, ensuring a more robust and maintainable codebase.

### 3.6. Models

The Models layer plays a crucial role in defining the structure and shape of the data used within the Reducer layer. It focuses on establishing clear and consistent data models for entities such as posts and comments.

### 3.7. Repo

The Repo layer serves as a bridge between the Reducer layer and the data sources used within the application. It is responsible for providing data to the Reducer layer, as well as data mutations

the Repo layer abstracts away the complexity of data retrieval and mutation by interacting with various data sources such as APIs, local storage, and cookies. By doing so, the Reducer layer can seamlessly access and manipulate data without being concerned with the specific data retrieval mechanisms.
