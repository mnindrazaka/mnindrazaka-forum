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

## 4. Folder Structure

In this section, we will explore the folder structure of the project and provide an overview of the main directories and their purposes.

```
src
  - pages
    - index.ts
    - posts
      - new.ts
      - [slug].ts
  - products
    - components
      - PostCard.tsx
      - PostCard.stories.tsx
      - PosForm.tsx
      - PostForm.stories.tsx
      - ...
    - widgets
      - PostCardWidget.tsx
      - PostCardWidget.reducer.tsx
      - PostCardWidget.stories.tsx
      - PostListWidget.tsx
      - PostListWidget.reducer.tsx
      - PostListWidget.stories.tsx
      - ...
    - screens
      - PostListScreen.tsx
      - PostListScreen.stories.tsx
      - PostDetailScreen.tsx
      - PostDetailScreen.stories.tsx
      - ...
    - repositories.ts
    - models.ts
  - comments
    - components
      - CommentCard.tsx
      - CommentCard.stories.tsx
      - ...
    - widgets.ts
      - CommentCardWidget.tsx
      - CommentCardWidget.reducer.tsx
      - CommentCardWidget.stories.tsx
      - ...
    - repositories.ts
    - models.ts
  - uikits
    - components
      - Skeleton
      - MarkdownView
      - MarkdownEditor
  - fakers
  - utils
```

### 4.1. pages

WE use next.js as our main framework, so we have a pages folder that contain the routes of our website.

### 4.2. products

We adopt a domain-driven development approach to facilitate a well-organized folder structure. This approach emphasizes the separation and grouping of screens, widgets, components, reducers, models, and repositories into their respective domains, promoting code clarity and maintainability. The product folder contain all layers (mentioned above) that related to the product domain

### 4.3. comments

The comments folder contains the screens, widgets, components, reducers, models, and repositories that related to the comments domain

### 4.4. uikits

The uikits folder contains components that is not belongs to any domain (universal), for example skeleton view, markdown editor, markdown view, etc

### 4.5. fakers

In this project, We don't use API or localstorage as data source, so we need to create mock data as data source. The fakers folder contains all function to interact with the mock data that can be connected to our Repo layer in each domains

### 4.6. utils

Utils contain some general utility function that is not belonging to any domains, for example utility to generate slug for a string and get character length from a markdown

## 5. Tech Stack

In this section, we will explore the tech stack that is used in the project and the reason why we choose that technology

### 5.1. Next.js

One of the primary reasons for selecting Next.js in our tech stack is its robust support for server-side rendering (SSR), which greatly benefits search engine optimization (SEO) by ensuring that our website's content is readily accessible to search engines. Additionally, Next.js offers static site generation (SSG) and incremental static regeneration (ISR) capabilities, allowing us to pre-generate and update pages as needed, effectively reducing server computational resources and enhancing overall performance.

Furthermore, Next.js enjoys widespread adoption among developers, making it a popular choice in the development community. This popularity translates to a wealth of available resources, extensive documentation, and a thriving ecosystem, which greatly facilitates the onboarding process for new developers joining the project.

### 5.2. Typescript

I incorporate TypeScript into our tech stack stems from the need to address the limitations of JavaScript's dynamic typing, which can result in runtime errors and make code maintenance challenging. By adopting TypeScript, we gain the advantage of static typing, which enables us to catch potential errors during development and promotes code reliability and maintainability.

In addition to its static typing features, TypeScript boasts a strong and vibrant community. It is widely adopted by developers across various domains, making it easier to find resources, documentation, and community support.

### 5.3. Tamagui

Our adoption of Tamagui in our tech stack reflects our preference for the CSS-in-JS approach, which provides a superior developer experience when styling components within JavaScript or TypeScript, eliminating the need for separate CSS files and mitigating CSS specificity issues. However, we acknowledge that this approach can introduce runtime computation and potentially impact performance.

Tamagui addresses this tradeoff by offering the best of both worlds. It allows us to utilize the CSS-in-JS paradigm to achieve a seamless developer experience while generating a static CSS file during the build process. This means that the styles are pre-compiled and not computed at runtime, resulting in improved performance and efficiency.

Additionally, Tamagui offers an API that is similar to the popular Chakra UI library, widely adopted within the development community. This similarity enables new developers to quickly adopt and become familiar with Tamagui, reducing the learning curve and promoting rapid onboarding to the project.

### 5.4. Storybook

Storybook plays a pivotal role in our tech stack as it addresses the challenges faced by frontend engineers when creating and documenting numerous components. As we develop a wide range of components, it can be difficult to keep track of existing ones, leading to the inadvertent duplication of efforts.

With Storybook, we can efficiently document and showcase our components in an organized and easily accessible manner. It acts as a centralized hub where developers can explore, test, and interact with individual components. This eliminates the need to recreate existing components unknowingly and promotes code reuse and consistency throughout the project.

Furthermore, Storybook significantly aids the onboarding process for new developers joining the team. By providing a comprehensive documentation platform for components, Storybook allows newcomers to familiarize themselves with the available components, understand their usage, and integrate them into their work seamlessly.

Additionally, Storybook can be integrated with test runners such as Jest, enabling automated testing and test coverage for our components. This integration allows us to establish comprehensive and reliable test suites, ensuring the quality and stability of our components throughout their lifecycle.
