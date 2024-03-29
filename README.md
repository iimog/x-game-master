# X Game Master

Your companion to organize a fun game night (or day).

Important: This is not a game in itself it is just a tool to help you organize a match made from your own games.

## Get the app

- **Android**: [Play Store](https://play.google.com/store/apps/details?id=org.iimog.xapp)
- **iOS**: It was available on the App Store for a year, but I refuse to pay $99 every year just to keep this free app available. You can use [Expo](https://expo.dev/@iimog/x-game-master) to get it on your iPhone (you might need to fork it)
- **Web**: [Experimental Web Interface](https://markus.ankenbrand.me/x-game-master)

## Idea

You absolutely need two things for a fun game night:
1. Players
2. Games

You probably have both of these and don't need an app for that.  But this app is your X factor to combine separate games to a unique gaming experience. So grab some friends and your favorite games and let the `X Game Master` transform it into an awesome competition.

## Synopsis

Enter a list of players and games and press start. The games will be played in a randomized order with new random teams for each game. The winners of each game get points (1 for the first game, 2 for the second, ...). In the end the player with the highest score wins.

## How it Works

Note: a *game* refers to the thing you play in one round while a *match* refers to the whole sequence of games. 

### New Match
Start a match by entering the list of players (one per line) and the list of games (one per line). Feel free to use Emojis :rocket:
Player names have to be unique while you can duplicate game names (in separate lines) for the number of times you want to play them. A good game is one that can be played with two teams and a clear winner.
The order of games will be shuffled but if you want a game to be played in a certain position just prepent "X. " with X being the position, e.g. 3. (space after the dot is optional).

<img src="./screenshots/ios/iphone/6.5/StartMatchScreen.png" width="300">

### Procedure
You play all entries in the game list in a random order exactly once. For each game the active players are assigned to one of two teams randomly. All players from the winning team get points according to the number of the round (1 in the first round, 2 in the second, and so on). The player with the highest sum after the last round is the overall winner.

### Game View
In the game view you see the name of the game and the players of each team. After you played the game in real life just press the button for the winning team accordingly.

<img src="./screenshots/ios/iphone/6.5/GameScreen1.png" width="300">

### Leaderboard View
The leaderboard view is shown before and after every game. It shows the rank of each player together with the sum of their points and their status (active/inactive).

If a player can not play a round you can set them inactive by clicking on them in the leaderboard view. This player will not participate in any games until it is set active again and hence will not receive any points.

<img src="./screenshots/ios/iphone/6.5/LeaderboardScreenFinal.png" width="300">

### Matches

In the matches view you can resume previous games (just tap them). Long press to export the game to clipboard or delete it. The exported game is plain json that you can save to a file or send via any messanger. In order to import a match, copy it to the clipboard and press the Import button at the bottom left.

Long press interaction, native alerts, and copy *to* clipboard don't work in web. So in web after clicking a game you are asked whether to resume, if you click cancel, you are asked whether to delete it.

## Design Principles

The app is designed to be clean and simple to use.
The UI is meant to be intuitive and pretty without unnecessary clutter.
Only features that proof to be desirable when playing the game will be considered to be included.

## Issues

If you find bugs or unexpected behaviour or if you have ideas for any kind of improvement please open an [issue on GitHub](https://github.com/iimog/x-game-master/issues).

## Logo

The game logo was designed by Tobias Ankenbrand

![X Game Manager Logo](./assets/xmenu.png)

## Data Privacy

As outlined in our [data privacy statement](DATA_PRIVACY_STATEMENT) this app does not collect any user data.

## Third Party Libraries
The app is built using a collection of open source libraries including
 - [TypeScript](https://www.typescriptlang.org/)
 - [React Native](https://facebook.github.io/react-native/)
 - [Expo](https://docs.expo.io/)
 - [Redux](https://redux.js.org/)
 - [UI Kitten 4.0](https://akveo.github.io/react-native-ui-kitten/)

## Change Log

### 1.2.0
**2022-04-16**
 - add match export/import (via clipboard)
 - update expo and other dependencies
 - web version functional (not yet pretty, import works, export doesn't)

### 1.1.1
**2020-09-20**
 - make space after game position optional (i.e. allow '1.First Game' instead of '1. First Game')

### 1.1.0
**2020-09-16**
 - add possibility to set game position in advance
 - [internal] change game type from string to Game

### 1.0.0
**2020-03-14**
 - add unplayed games
 - add help info
 - minor bug fixes
 - remove unnecessary permissions on android
 - UI improvements

### 0.5.0
- add list of played games with winners
- add ability to change winner of a finished game
- add ability to remove games from match

### 0.4.0
- fix early finish bug [#18](https://github.com/iimog/x-game-master/issues/18)
- multiple matches are saved independently
- finished matches are kept

### 0.3.1
- game state persists restarts of the app

### 0.3.0
- simplified design and game play
- complete re-write from <=0.2.1
