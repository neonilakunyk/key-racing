# key-racing

![typing gif](https://user-images.githubusercontent.com/79256210/135754303-1fb6cb79-e806-4f93-9e4f-889c2fd318f3.gif)

### What is key-racing ❓

Key-racing is a simple and easy-to-use keyboard trainer that help you master ten-finger typing skills, improve your typing speed and reduce the number of typos. Do you want to think about the algorithm, and not where is this button? Tired of running your eyes from keyboard to monitor and back? Then go here!
There are other learning platforms for speed typing, but only here you can arrange a competition that motivates the student.


### Units 🎫

▶ Theory <br>
This section explains what touch typing is, why and how to print correctly. <br>

▶ Game <br>
By typing quotes, jokes and phrases, you will increase your typing speed and be able to prepare for typing real texts. Here are two game modes: <br>
🔹 Single-player. You train yourself. The main criterion is time. The goal is to break your own record, learn how to type in less time with greater speed.<br>
🔹 Multi-player. This is a competition between different gamers. This is so-called race, when you try to type text faster than your opponent, overtake him. Also you can create two types of room: private and public. You can access in private room only by following the link. It is not visible in the general list of rooms. <br>

▶ Rating <br>
Here you can see your rating among all users.<br>

▶ Settings <br>
🔹 Profile. In this section you can change your name, e-mail and profile photo. <br>
🔹 Security. Also you can you can turn off the display of your rating for other players. <br>
🔹 Game. User can change time limit before game and time for game for single mode. <br>

### How it works ❓

After entering the site, the user is registered using a username, email, password or using a google account. Authentication takes place using two types of JWT tokens. First, Access Token - information that a particular user is allowed to do. It is reusable and short-lived. The second, refresh token, is used to refresh a pair of access and refresh tokens. It also has two properties opposite to the first token: it is disposable and long-lived. Thus, an attacker using only the access token will gain access to the application for a very short time, and using both, the server will immediately generate a new pair, leaving the villain no chance.

Each user can choose their own avatar, it will be saved in AWS S3 using Multer. If no avatar is selected, initials will be displayed instead. The password will be hashed using Cryptr.

 After registering or logging into an account, the user gains access to the game. He can train both independently and compete with other players.

The process of the game. The player is shown a text on the screen and he enters it from the keyboard. The system checks the correspondence of characters with the text and those entered by the user. The next character cannot be printed if the previous one has not been typed. For incorrectly typed characters, the user does not incur any losses, except for time.

In single-player mode, at the end of the game, the elapsed time, the number of characters typed, the speed and the graph of the number of typed characters in seconds are displayed.

To start playing in multi mode, you must either join one of the public rooms, or create your own private or public room. An invitation to a private room is sent to the mail, backed up to the account, in the form of a link to the room.

The game will not start if there are fewer than two people in the room. The maximum number of participants is 5. Each participant confirms his readiness. After that, the game starts. The course of the game will be commented on by the virtual host Escape Enterovich. His remarks will be displayed in text and voiced. He will also make jokes from time to time using the Joke API. The game ends when the time expires, or when someone types all the given text. After the game, the rating of the players with their recruitment speed is displayed.

The entire multiplayer game mode is socket based so that users can instantly see the changes of other participants. Room creation is also socket based. As soon as a new public room is created, it is displayed to all users.

Our web-application will host on Heroku. Express will be used as a web server. Database will host in Atlas Mongo Cloud.

### Technologies 💻

#### Frontend

1. React <br>
2. Redux Toolkit <br>
3. React-Bootstrap <br>
4. SCSS <br> 
5. Joke API <br> 
6. Dayjs <br> 
7. Chart JS <br>
8. Validator.js <br>

#### Backend

 1. Express <br>
 2. TypeScript <br>
 3. AWS S3, Multer <br>
 4. Cryptr <br> 
 5. Googleapis <br> 
 6. Nodemailer <br> 

#### Common

 1. ES2020 <br>
 2. Git <br>
 3. REST API <br>
 4. JWT <br>
 5. Socket.IO <br> 
 6. npm <br> 
 7. ESLint <br> 
 
#### Database
 1. MongoDB <br>

#### Examples of work

![image](https://user-images.githubusercontent.com/56652716/193843798-f6394492-8a75-419b-8226-a15e01e0c0cb.png)

![image](https://user-images.githubusercontent.com/56652716/193843868-4901db2e-83a0-4c0b-8ae2-361192374dfc.png)

![image](https://user-images.githubusercontent.com/56652716/193843921-fb531fb1-9dab-4413-aa35-1d4652eaabc5.png)

![image](https://user-images.githubusercontent.com/56652716/193843975-86327a74-1d5e-4c8f-87fc-b1d69896c848.png)