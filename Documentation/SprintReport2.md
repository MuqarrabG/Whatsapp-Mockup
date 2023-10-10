# What Was The Plan For Sprint 2?

    1.
    1. Convert dummy server into express run server
    2. Begin developing the HTML and CSS of the following pages:
        - Inbox/Home screen
        - Send message screen
        * this will all be done in reference to our designs created using Figma from Sprint 1
    3. Introduce the router to the project, to route between the pages of the app.
    4. Introduce Socket.IO to the project for instant communication aspect of the project.

# What Work Actually Happened

## {Muqarrab's} Progress

    ### Sprint Report: Home/Main Page Development
 
**Key Focus:** Transforming Figma Designs to Live Web Page with React and Tailwind CSS  

---

#### **Introduction**

During this sprint, my main task was to transform our Figma designs into a functional home/main page using React and Tailwind CSS. Navigating through Tailwind CSS was notably challenging due to my unfamiliarity with it, presenting a rewarding, albeit steep, learning curve. Although the home page has been crafted as envisioned, there’s a notable requirement for additional theming work to enhance its visual appeal, which will be addressed in the upcoming sprint.

---

#### **Integration of ion-icons**

A valuable addition to our project was the integration of the ion-icons library, offering us a large variety of free icons and consequently accelerating our development process by eliminating the need to create our own icons.

---

#### **Component Breakdown**

- **Home Page Structure**  
  Employing practices learned from Steve Cassidy's video and OO Programming, the home page was systematically divided into several smaller components (Sidebar and Messaging Panel) to enhance traceability and fluency during error resolution.

    - **Sidebar**  
      The Sidebar itself is compartmentalised into three sub-components: Topbar, Search Bar, and Chat List.

        1. **Topbar**  
           It presently displays the logged-in user's profile picture (a generic user icon is to be used as a fallback in subsequent sprints). A dropdown menu with action buttons like "Create Group," "Delete Group," etc., is available but lacks functional programming for the actions.

        2. **Search Bar**  
           The initial build allows automatic searching for private or group chats as typing commences, although it currently only console.logs user inputs. Future sprints will delve into detailed logic and data structuring.

        3. **Chat List**  
           Displaying all user-involved chats using temporary fakeData, it highlights key chat details (e.g., profile photo, name, last message, and timestamp).

    - **Messaging Panel**  
      The Messaging Panel also houses three sub-components: Header, Chat Messages, and Message Input.

        1. **Header**  
           It displays other user details and encompasses a dropdown menu with action buttons like "Edit Name," which requires further development.

        2. **Chat Messages**  
           Functional and resembling typical chat apps.

        3. **Message Input**  
           Incorporates file attachment and message send functionalities.

---

#### **Learnings and Challenges**

- Emphasised the importance of having a component return alternative like loading screen, considering data loading or unavailable data scenarios.
- Underlined the need for backup visual elements (like generic user icons) when specific user information (like profile photos) is absent.

---

#### **Next Steps**

For the forthcoming sprint, the focal points for enhancement and development include:
  
- Incorporating real user data into the homepage and disseminating it to child components.
- Establishing a universal system for profile picture display, ensuring a generic icon is used when a profile picture isn’t set, applicable across both group and private messages.
- Developing a mechanism to differentiate between group chats and one-on-one chats within both the chat list and messaging panel, considering their distinctive attributes.
- Implementing authentication logic.



