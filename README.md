# retropie-flyweb
Adds virtual gamepad support using FlyWeb to RetroPie. Controller designs change depending on the currently selected system and even vibrate!

## Setup
1. Ensure that you have a recent version of node and NPM installed on your Retropie enabled Pi.
`curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -`
`sudo apt-get install nodejs`
2. Install the following package for Avahi compatability.
`sudo apt-get install libavahi-compat-libdnssd-dev`
3. Install the required NPM packages in the root directory of the repo.
`npm install`
4. Copy the contents of the */scripts* directory to the */opt/retropie/configs/all* directory.

## Usage
1. Run the following command to start!
`npm run start`
