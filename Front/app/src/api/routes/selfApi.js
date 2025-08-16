import commands from '../mockData/commands.json';
import events from '../mockData/events.json';

// Simulate API latency
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default {
  async getCommands() {
    await sleep(500);
    return commands;
  },

  async getEvents() {
    await sleep(500);
    return events;
  },
};
