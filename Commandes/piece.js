const Command = require('../Class/Command.js');

module.exports = class Piece extends Command {
	static id = 'piece';
	static devBoss = false;
	static home = false;
	static userPermissions = [];
	static botPermissions = [];
	static description = 'Lance une piece pour récolter pile ou face';
	static help = true;
	static howTo = 'PREFIXCMD';
    static test = [];
	static arguments = [];

	methode(args = {}) {
		return Math.random() < 0.5 ? 'Pile' : 'Face';
	}
};
